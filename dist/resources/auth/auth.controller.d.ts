import { Request, Response } from "express";
export declare class AuthController {
    loginPage(req: Request, query: any, res: Response): void;
    login(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
}
