import authRouter from "./auth/index.js";
import projectRouter from "./projects/index.js";
import sharedProjectRouter from "./shared-projects/index.js";
import taskRouter from "./tasks/index.js";
import subTaskRouter from "./sub-tasks/index.js";
import commentRouter from "./comments/index.js";

import checkToken from "../middlewares/check-token.js";

export default (app) => {
  app.use("/v1/auth", authRouter);
  app.use("/v1/projects", checkToken, projectRouter);
  app.use("/v1/shared-projects", checkToken, sharedProjectRouter);
  app.use("/v1/tasks", checkToken, taskRouter);
  app.use("/v1/sub-tasks", checkToken, subTaskRouter);
  app.use("/v1/comments", checkToken, commentRouter);
};
