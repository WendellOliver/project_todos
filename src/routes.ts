import { Router } from "express";
import UsersController from "./controllers/UsersController";
import checksExistsUser from "./middleware/checksExistsUser";
import checksUserValidator from "./middleware/checksUserValidator";
import checksUserValidate from "./middleware/checksUserValidate";

const routes = Router();

const usersController = new UsersController();    

routes.post("/users", checksUserValidate(checksUserValidator), usersController.create);

routes.get("/users", checksExistsUser,usersController.search);

routes.get("/age", usersController.find);

routes.get("/order", usersController.order);

routes.post("/regAdd", usersController.regAdd);

routes.post("/todo", usersController.todo);

export {routes};