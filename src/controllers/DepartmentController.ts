import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { RDepartment } from "../entity/Department";


class DepartmentController{

  static listAll = async (req: Request, res: Response) => {
    //Get Department from database
    const departmentRepository = getRepository(RDepartment);
    const departments = await departmentRepository.find({ relations: ["workgroup"] });

    //Send the departments object
    res.send(departments);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the department from database
    const departmentRepository = getRepository(RDepartment);
    try {
      const department = await departmentRepository.findOneOrFail(id, { relations: ["workgroup"] });

      res.send(department);
    } catch (error) {
      res.status(404).send("department not found");
    }
  };



  static newDepartment = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { department, isActive, workgroup } = req.body;
    let r_dep = new RDepartment();
    r_dep.department = department;
    r_dep.isActive = isActive;
    r_dep.workgroup = workgroup;

    //Validade if the parameters are ok
    const errors = await validate(r_dep);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the department is already in use
    const departmentRepository = getRepository(RDepartment);
    try {
      await departmentRepository.save(r_dep);
    } catch (e) {
      res.status(409).send("department already in use");
      return;
    }

    //If all ok, send 201 response
    //res.status(201).send("department created");
    res.status(201).send({ status: 201, results: "department created" });
  };



  static editDepartment = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { department, isActive, workgroup  } = req.body;

    //Try to find user on database
    const departmentRepository = getRepository(RDepartment);
    let r_dep;
    try {
        r_dep = await departmentRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("department not found");
      return;
    }

    //Validate the new values on model
    r_dep.department = department;
    r_dep.workgroup = workgroup;
    r_dep.isActive = isActive;
    const errors = await validate(r_dep);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means department already in use
    try {
      await departmentRepository.save(r_dep);
    } catch (e) {
      res.status(409).send("department already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    //res.status(204).send();
    res.send({ status: 204});
  };



  static deleteDepartment = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const departmentRepository = getRepository(RDepartment);
    let r_dep: RDepartment;
    try {
        r_dep = await departmentRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("department not found");
      return;
    }
    departmentRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default DepartmentController;