import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import workgroup from "./workgroup";
import department from "./department";
import manager from "./manager";
import risklevel from "./risklevel";


const routes = Router();


routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/workgroup", workgroup);
routes.use("/department", department);
routes.use("/manager", manager);
routes.use("/risklevel", risklevel);


export default routes