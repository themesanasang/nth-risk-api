import { Request, Response } from "express";
import { getRepository, AdvancedConsoleLogger } from "typeorm";
import { validate } from "class-validator";
import { RWorkgroup } from "../entity/Workgroup";


class WorkgroupController{

  static listAll = async (req: Request, res: Response) => {
    //Get workgroup from database
    const workgroupRepository = getRepository(RWorkgroup);
    const workgroups = await workgroupRepository.find();

    //Send the workgroups object
    res.send(workgroups);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the workgroup from database
    const workgroupRepository = getRepository(RWorkgroup);
    try {
      const workgroup = await workgroupRepository.findOneOrFail(id);

      res.send(workgroup);
    } catch (error) {
      res.status(404).send("workgroup not found");
    }
  };



  static newWorkgroup = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { workgroup, isActive } = req.body;
    let r_workgroup = new RWorkgroup();
    r_workgroup.workgroup = workgroup;
    r_workgroup.isActive = isActive;

    //Validade if the parameters are ok
    const errors = await validate(r_workgroup);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the workgroup is already in use
    const workgroupRepository = getRepository(RWorkgroup);
    try {
      await workgroupRepository.save(r_workgroup);
    } catch (e) {
      res.status(409).send("workgroup already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("workgroup created");
  };



  static editWorkgroup = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { workgroup, isActive } = req.body;

    //Try to find workgroup on database
    const workgroupRepository = getRepository(RWorkgroup);
    let r_workgroup;
    try {
        r_workgroup = await workgroupRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("workgroup not found");
      return;
    }

    //Validate the new values on model
    r_workgroup.workgroup = workgroup;
    r_workgroup.isActive = isActive;
    const errors = await validate(r_workgroup);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means workgroup already in use
    try {
      await workgroupRepository.save(r_workgroup);
    } catch (e) {
      res.status(409).send("workgroup already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



  static deleteWorkgroup = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const workgroupRepository = getRepository(RWorkgroup);
    let r_workgroup: RWorkgroup;
    try {
        r_workgroup = await workgroupRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("workgroup not found");
      return;
    }
    workgroupRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default WorkgroupController;