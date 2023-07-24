import { CronJob } from "cron";
import BlockService from "../services/block.service";
import { SocketIO } from "..";
import UserSubscriptionHelper from "./user-subscription-helper";

class CronHelper {
  cronJob: CronJob;

   start() {
    this.cronJob = new CronJob("* * * * * *", async () => {
      const blocks = await BlockService.getBlocksOfToday();
      SocketIO.emit("blocks", blocks);

      UserSubscriptionHelper.handle(blocks);
    });

    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }
}

export default new CronHelper();