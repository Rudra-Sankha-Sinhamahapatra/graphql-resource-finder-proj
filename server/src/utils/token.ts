import jwt from "jsonwebtoken";
import { config } from "../config/config";

const JWT_SECRET = config.jwtSecret;

const generateToken = async(userId:string) : Promise<string> => {
    return jwt.sign({ userId },JWT_SECRET,{ expiresIn: "1d" });
}

const verifyToken = async(token:string) : Promise<{ userId: string }> => {
    return jwt.verify(token,JWT_SECRET) as { userId: string };
}

export const token = {
    generate: generateToken,
    verify: verifyToken,
}