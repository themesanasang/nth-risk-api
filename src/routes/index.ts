import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import workgroup from "./workgroup";
import department from "./department";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/workgroup", workgroup);
routes.use("/department", department);

export default routes