"use client"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModel } from "@/components/ui/upload";
import { useState } from "react";
import { TrainModelInput } from "common/inferred-types"
import { BACKEND_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs"
import { Token } from "@clerk/nextjs/server";



export function Train() {
    const { getToken } = useAuth();
    const [zipUrl, setZipUrl] = useState("");
    const [type, setType] = useState("Man");
    const [age, setAge] = useState<number>(0);
    const [ethnicity, setEthnicity] = useState<string>();
    const [eyeColor, setEyecolor] = useState<string>();
    const [bald, setBald] = useState(false);
    const [name, setName] = useState<string>()
    const router = useRouter();



    async function trainModal() {
        const input = {
            name,
            type,
            age,
            ethnicity,
            eyeColor,
            zipUrl,
            bald
        }
        const token = await getToken();
        const response = await axios.post(`${BACKEND_URL}/ai/training`, input, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentLength: ""
            }
        });
        router.push("/");
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Card className="w-[600px] px-4">
                <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>
                        Deploy your new project in one-click.
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex gap-4">
                                <div className="flex flex-col space-y-1.5 flex-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Name of the Model"
                                        required
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 flex-1">
                                    <Label htmlFor="name">Age</Label>
                                    <Input
                                        id="name"
                                        placeholder="Age of the Model"
                                        required
                                        onChange={(e) => { setAge(Number(e.target.value)) }}

                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col space-y-1.5 flex-1">
                                    <Label htmlFor="name">Type</Label>
                                    <Select
                                        onValueChange={(value) => { setType(value) }}
                                    >
                                        <SelectTrigger id="name" className="w-full">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Man">Man</SelectItem>
                                            <SelectItem value="Woman">Woman</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5 flex-1">
                                    <Label htmlFor="name">Ethnicity</Label>
                                    <Select
                                        onValueChange={(value) => { setEthnicity(value) }}

                                    >
                                        <SelectTrigger className="w-full" id="name">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="White">White</SelectItem>
                                            <SelectItem value="Black">Black</SelectItem>
                                            <SelectItem value="AsianAmerican">Asian American</SelectItem>
                                            <SelectItem value="EastAsian">EastAsian</SelectItem>
                                            <SelectItem value="SouthEastAsian">South East Asian</SelectItem>
                                            <SelectItem value="SouthAsian">South Asian</SelectItem>
                                            <SelectItem value="MiddleEastern">Middle Eastern</SelectItem>
                                            <SelectItem value="Pacific">Pacific</SelectItem>
                                            <SelectItem value="Hispanic">Hispanic</SelectItem>

                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Eye Color</Label>
                                <Select
                                    onValueChange={(value) => { setEyecolor(value) }}
                                >
                                    <SelectTrigger className="w-full" id="name">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Brown">Brown</SelectItem>
                                        <SelectItem value="Blue">Blue</SelectItem>
                                        <SelectItem value="Hazel">Hazel</SelectItem>
                                        <SelectItem value="Gray">Gray</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Bald</Label>
                                <Switch onClick={(e) => setBald(!bald)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <UploadModel setZipUrl={setZipUrl} />
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={trainModal}
                        disabled={!zipUrl || !type || !age || !ethnicity}
                    >
                        Create Model
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            router.push("/")
                        }}
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}