// Packages
import "reflect-metadata";
import * as Express from "express";
import "express-async-errors";
import {
  json as JSONBodyParser,
  urlencoded as UrlEncoded,
} from "body-parser";
import * as Cors from "cors";
import * as Colors from "colors";

// Utility
import config from "./config";

// Error Handlers
import { errorHandler } from "./middleware/error-handler";

// Routers
import { BlockRouter } from "./routes/block.router";
import { AddressRouter } from "./routes/address.router";
import { createServer } from "http";
import { connectWebsocket } from "./websocket";
import User from "./models/User";
import CronHelper from "./util/cron-helper";

console.log(
  Colors.yellow(`Environment: ${Colors.underline(config.environment)}`)
);

const app = Express();

app.use(Cors());
app.use(JSONBodyParser({ limit: "10mb" }));

app.use(UrlEncoded({ extended: false }));

app.use("/block", BlockRouter);
app.use("/address", AddressRouter);

app.use(errorHandler);

const httpServer = createServer(app);
const io = connectWebsocket(httpServer);

// Run Server
httpServer.listen(config.port, () =>
  console.log(Colors.cyan(`Server listening on port ${config.port}`))
);

//Cron
CronHelper.start;


//Users data like Memory Object
export const users : User[] = [];

export const SocketIO = io;
