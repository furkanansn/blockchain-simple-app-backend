//packages
import { Request, Response } from "express";

//services
import BlockService from "../services/block.service";

class BlockController {
  async getAll(req: Request, res: Response) {
    const blocks = await BlockService.getBlocksOfToday();
    res.json(blocks);
  }

  async getTransactions(req: Request, res: Response) {
    const blockHash = req.params.hash;
    const transactions = await BlockService.getBlockTransactions(blockHash);
    res.json(transactions);
  }
}

export default new BlockController();
