import { Router } from "express";
import ManagerController from "../controllers/ManagerController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Get all manager
router.get("/", [checkJwt, checkRole(["ADMIN"])], ManagerController.listAll);


// Get one manager
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
ManagerController.getOneById
);


//Create a new manager
router.post("/", [checkJwt, checkRole(["ADMIN"])], ManagerController.newManager);


//Edit one manager
router.patch(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
ManagerController.editManager
);


//Delete one manager
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
ManagerController.deleteManager
);


export default router;