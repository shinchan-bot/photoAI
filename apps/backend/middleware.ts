import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    try {
        console.log(token);
        console.log(authHeader);
        console.log(req.headers)
        const decoded = jwt.decode(token, process.env.AUTH_JWT_KEY, {
            algorithm: ['RS256']
        })
        console.log(decoded)
        if(decoded?.sub){
            req.userId = decoded.sub
            next();
        }

    }
    catch (e) {
        res.status(403).json({
            message: "Error while decoding"
        })
    }

}