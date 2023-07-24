//packages
import AxiosHelper, { AxiosMethods } from "../util/axios-helper";

//models
import Block from "../models/Block";

class BlockService {
  async getBlocksOfToday() : Promise<Block[]> {
    return new AxiosHelper<Block>().call(AxiosMethods.GET, "block/date/20230719");
  }
  async getBlockTransactions(blockHash: string) : Promise<unknown> {
    return new AxiosHelper().call(AxiosMethods.GET, `block/${blockHash}/tx`);
  }
}

export default new BlockService();
