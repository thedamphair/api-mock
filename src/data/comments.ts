import { Collection, MongoClient } from "mongodb";

import { Comment } from "../interfaces";

const collection = "comments"
let comments: Collection;

export class commentsData {

  public static async injectDB(connection: MongoClient): Promise<void> {
    if (comments) { return; }
    try {
      comments = await connection.db(process.env.DB_NAME).collection(collection);
    } catch (error) {
      throw new Error(`Unable to establish collection: ${error}`);
    }
  }

  public static async findComments(): Promise<Array<any>> {
    try {
      const data = comments.find().toArray();

      return data;
    } catch (error) {
      throw new Error(`Unable to find comments: ${error}`);
    }
  }

  public static async addComment(newComment: Comment): Promise<any> {
    try {
      return await comments.insertOne(newComment);
    } catch (error) {
      throw new Error(`Unable to save comments: ${error}`);
    }
  }
}
