import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers["authorization"];
    const token = authHeader?.split(" ")[0];
}