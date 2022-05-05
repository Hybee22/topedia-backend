import projectService from "../services/project-service.js";

const appEmitter = global.appEmitter;

appEmitter.on("createInbox", async (data) => {
  await projectService.createProject(data);
});
