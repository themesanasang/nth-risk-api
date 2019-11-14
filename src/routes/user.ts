import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//game test save user 
//router.post("/game", UserController.newUser);
//router.get("/gameAll", UserController.listAll);

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
UserController.getOneById
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
router.put(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
UserController.editUser
);

//Delete one user
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
UserController.deleteUser
);

export default router;