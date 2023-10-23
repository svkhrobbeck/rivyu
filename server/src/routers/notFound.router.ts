import { Request, Response } from "express";

const notFoundController = (req: Request, res: Response) =>
  res.status(401).json({ messages: ["invalid endpoint"] });

export default notFoundController;
