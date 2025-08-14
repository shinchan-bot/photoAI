import express from "express"
import { TrainModel, GenerateImage, GenerateImagesFromPack } from "common/types"
import { prismaClient } from "db/prisma";
import { S3Client } from "bun";
import { FalAIModel } from "./models/FalAIModel";
import cors from "cors"
import { authMiddleware } from "./middleware";

const PORT = 8080;
const falAiModel = new FalAIModel();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Online")
})

app.get("/pre-signed-url", authMiddleware, async (req, res) => {
    const key = `models/${Date.now()}_${Math.random()}.zip`;
    const url = await S3Client.presign(key, {
        method:"PUT",
        bucket: process.env.BUCKET_NAME,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_KEY,
        endpoint:process.env.ENDPOINT,
        expiresIn: 60 * 5,
        type: "application/zip"
    })

    res.json({
        url,
        key
    })
})

app.post("/ai/training",authMiddleware, async (req, res) => {
    console.log("user ID: ",req.userId);
    const parsedBody = TrainModel.safeParse(req.body);
    // const parsedBody = req.body;
    const images = req.body.images;
    console.log(parsedBody.data)

    if (!parsedBody.success) {
        res.status(411).json({
            message: "Input Incorrect"
        })
        return
    }

    const { request_id, response_url } = await falAiModel.trainModel(parsedBody.data.zipUrl, parsedBody.data.name);
    console.log("Zip url: ", parsedBody.data.zipUrl)
    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethnicity: parsedBody.data.ethnicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: req.userId!,
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id
        }
    })

    res.json({
        modelId: data.id
    })
})

app.post("/ai/generate", authMiddleware, async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(411).json({
            message: "Invalid input"
        })
    }

    const model = await prismaClient.model.findUnique({
        where: {
            id: parsedBody.data?.modelId
        }
    })

    if (!model || !model.tensorPath) {
        res.status(411).json({
            message: "Model not found"
        })
        return;
    }
    const request_id = await falAiModel.generateImage(parsedBody.data?.prompt!, model?.tensorPath)

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data!.prompt!,
            userId: req.userId!,
            modelId: parsedBody.data!.modelId,
            imageUrl: ""
        }
    })

    res.json({
        imageId: data.id
    })
})

app.post("/pack/generate", authMiddleware, async (req, res) => {
    const parsedBody = GenerateImagesFromPack.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(411).json({
            message: "Invalid input"
        })
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data!.packId
        }
    })

    let requestIds = await Promise.all(prompts.map(async (prompt) => falAiModel.generateImage(prompt.prompt, parsedBody.data?.modelId!)))


    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt) => ({
            prompt: prompt.prompt,
            userId: req.userId!,
            modelId: parsedBody.data?.modelId,
            imageUrl: "",
        }))
    })

    res.json({
        images: images.map((image) => image.id)
    })
})

app.get("/pack/bulk", async (req, res) => {

    const packs = await prismaClient.packs.findMany({});

    res.json({
        packs
    })

})

app.get("/image/bulk", authMiddleware, async (req, res) => {
    const ids = req.query.images as string[]
    const limit = req.query.limit as string ?? 10;
    const offset = req.query.offset as string ?? 0;

    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: { in: ids },
            userId: req.userId
        },
        skip: parseInt(offset),
        take: parseInt(limit)
    })

    res.json({
        images: imagesData
    })
})

app.post("/fai-ai/webhook/train", async (req, res) => {
    console.log(req.body)

    const request_id = req.body.request_id;

    await prismaClient.model.updateMany({
        where: {
            falAiRequestId: request_id
        },
        data: {
            trainingStatus: "Generated",
            tensorPath: req.body.tensor_path
        }
    })
    res.json({
        message: "Webhook received"
    })
})

app.post("/fai-ai/webhook/image", async (req, res) => {
    console.log(req.body)

    const requestId = req.body.request_id;

    await prismaClient.outputImages.updateMany({
        where: {
            falAiRequestId: requestId
        },
        data: {
            status: "Generated",
            imageUrl: req.body.image_url
        }
    })
    res.json({
        message: "Webhook received"
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port 8080")
})