import { Router } from "express";
import RiskLevelController from "../controllers/RiskLevelController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Get all risklevel
router.get("/", [checkJwt, checkRole(["ADMIN"])], RiskLevelController.listAll);


// Get one risklevel
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskLevelController.getOneById
);


//Create a new risklevel
router.post("/", [checkJwt, checkRole(["ADMIN"])], RiskLevelController.newRiskLevel);


//Edit one risklevel
router.put(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskLevelController.editRiskLevel
);


//Delete one risklevel
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskLevelController.deleteRiskLevel
);


export default router;