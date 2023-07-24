import { Router } from "express";
import BlockController from "../controllers/block.controller";

export const BlockRouter = Router();

BlockRouter.get("/list/today",BlockController.getAll);

BlockRouter.get("/:hash/transactions",BlockController.getTransactions);