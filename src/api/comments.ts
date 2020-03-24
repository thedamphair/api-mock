import { Router } from "express";
import { commentsController } from "../controllers/comments";

const commentRouter: Router = Router();
const route = "/comments";

commentRouter.route(route)
  .post(commentsController.postComments)
  .get(commentsController.getComments);

export default commentRouter;
