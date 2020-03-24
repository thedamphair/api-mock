import { ObjectId } from "mongodb";

export interface Comment {
  _id?: string | ObjectId;
  title: string;
  comment: string;
  author: string;
  timestamp: Date | number;
}