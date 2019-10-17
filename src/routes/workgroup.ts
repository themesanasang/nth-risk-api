import { Router } from "express";
import WorkgroupController from "../controllers/WorkgroupController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Get all workgroup
router.get("/", [checkJwt, checkRole(["ADMIN"])], WorkgroupController.listAll);


// Get one workgroup
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
WorkgroupController.getOneById
);


//Create a new workgroup
router.post("/", [checkJwt, checkRole(["ADMIN"])], WorkgroupController.newWorkgroup);


//Edit one workgroup
router.patch(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
WorkgroupController.editWorkgroup
);


//Delete one workgroup
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
WorkgroupController.deleteWorkgroup
);


export default router;