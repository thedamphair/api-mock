import { Response } from "express";

import { commentsData } from "../data/comments";
import { commentMessages, requestStatus } from "../enums";
import { Comment } from "../interfaces";

export class commentsController {
  public static async postComments(req: any, res: Response): Promise<void> {
    try {
      const newComment: Comment = {
        title: req.body.title,
        comment: req.body.comment,
        author: req.body.author,
        timestamp: Date.now()
      };

      const result = await commentsData.addComment(newComment);
      const response = {
        message: commentMessages.success,
        result
      };
      res.status(requestStatus.CREATED).json(response);
    } catch (error) {
      res.status(requestStatus.ERROR).json(error);
    }
  }

  public static async getComments(req: any, res: Response): Promise<void> {
    try {
      const manyComms = 10;
      const comments = await commentsData.findComments();
      let soManyComments = comments.length > manyComms ? true : false;
      const data = {
        comments,
        soManyComments
      };

      res.status(requestStatus.OK).json(data);
    } catch (error) {
      res.status(requestStatus.ERROR).json(error);
    }
  }

}