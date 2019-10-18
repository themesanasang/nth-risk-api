import { Router } from "express";
import RiskMainController from "../controllers/RiskMainController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();


//Get all riskmain
router.get("/", [checkJwt, checkRole(["ADMIN"])], RiskMainController.listAll);


// Get one riskmain
router.get(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskMainController.getOneById
);


//Create a new riskmain
router.post("/", [checkJwt, checkRole(["ADMIN"])], RiskMainController.newRiskMain);


//Edit one riskmain
router.patch(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskMainController.editRiskMain
);


//Delete one riskmain
router.delete(
"/:id([0-9]+)",
[checkJwt, checkRole(["ADMIN"])],
RiskMainController.deleteRiskMain
);


export default router;