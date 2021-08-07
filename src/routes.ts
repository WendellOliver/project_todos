import { Router } from "express";
import UsersController from "./controllers/UsersController";

const routes = Router();

const usersController = new UsersController();    

routes.post("/users", usersController.create);

routes.get("/users", usersController.search);

routes.get("/age", usersController.find);

routes.get("/order", usersController.order);

routes.post("/regAdd", usersController.regAdd);

export {routes};