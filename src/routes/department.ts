import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Get all department
router.get("/", [checkJwt, checkRole(["ADMIN"])], DepartmentController.listAll);


// Get one department
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
DepartmentController.getOneById
);


//Create a new department
router.post("/", [checkJwt, checkRole(["ADMIN"])], DepartmentController.newDepartment);


//Edit one department
router.patch(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
DepartmentController.editDepartment
);


//Delete one department
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
DepartmentController.deleteDepartment
);


export default router;