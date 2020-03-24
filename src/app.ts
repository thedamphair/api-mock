import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { MongoClient } from "mongodb";

import comments from "./api/comments";
import { commentsData } from "./data/comments";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.configServer();
    this.connectDB();
  }

  private async configServer(): Promise<void> {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use("/", express.static("build"));
    this.app.use("/api", comments);
  }

  private async connectDB (): Promise<void> {
    try {
      const uri: string = "mongodb://localhost:27017";
      let client = await MongoClient.connect( uri, { useNewUrlParser: true });
      await commentsData.injectDB(client);
    } catch (error) {
     throw new Error(error);
    }
  }

}

export default new App().app;