import { Request, Response } from "express";
import { createUserLoader } from "../utilities/usersLoader";

export interface MyContext {
   req: Request;
   res: Response;
   userLoader: ReturnType<typeof createUserLoader>;
}
