const express = require("express");
const Controllers = require("../../controllers/upload/index.js");
const upload = require("../../helpers/uploader.js");

const usersRouter = express.Router();

usersRouter.get("/", upload.any(), Controllers.getUsers);
usersRouter.post("/upload", upload.any(), Controllers.uploadCsv);
usersRouter
  .route("/:id")
  .get(Controllers.getUser)
  .post(Controllers.createUser)
  .patch(Controllers.updateUser)
  .delete(Controllers.deleteUser);

module.exports = usersRouter;
