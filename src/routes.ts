import { Router } from "express";
import UsersController from "./controllers/UsersController";
import checksExistsUser from "./middleware/checksExistsUser";

const routes = Router();

const usersController = new UsersController();    

routes.post("/users", usersController.create);

routes.get("/users", checksExistsUser,usersController.search);

routes.get("/age", usersController.find);

routes.get("/order", usersController.order);

routes.post("/regAdd", usersController.regAdd);

routes.post("/todo", usersController.todo);

export {routes};