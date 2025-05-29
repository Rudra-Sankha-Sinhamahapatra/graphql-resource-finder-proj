import type { Request,Response } from "express";
import type { User } from "./user";

export interface Context {
    user: User;
    token?:string;
    req: Request;
    res: Response;
}