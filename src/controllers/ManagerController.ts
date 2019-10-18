import { Request, Response } from "express";
import { getRepository, AdvancedConsoleLogger } from "typeorm";
import { validate } from "class-validator";
import { RManager } from "../entity/Manager";


class ManagerController{

  static listAll = async (req: Request, res: Response) => {
    //Get manager from database
    const managerRepository = getRepository(RManager);
    const managers = await managerRepository.find();

    //Send the managers object
    res.send(managers);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the manager from database
    const managerRepository = getRepository(RManager);
    try {
      const manager = await managerRepository.findOneOrFail(id);

      res.send(manager);
    } catch (error) {
      res.status(404).send("manager not found");
    }
  };



  static newManager = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, isActive } = req.body;
    let r_manager = new RManager();
    r_manager.username = username;
    r_manager.isActive = isActive;

    //Validade if the parameters are ok
    const errors = await validate(r_manager);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the manager is already in use
    const managerRepository = getRepository(RManager);
    try {
      await managerRepository.save(r_manager);
    } catch (e) {
      res.status(409).send("manager already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("manager created");
  };



  static editManager = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, isActive } = req.body;

    //Try to find manager on database
    const managerRepository = getRepository(RManager);
    let r_manager;
    try {
        r_manager = await managerRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("manager not found");
      return;
    }

    //Validate the new values on model
    r_manager.username = username;
    r_manager.isActive = isActive;
    const errors = await validate(r_manager);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means manager already in use
    try {
      await managerRepository.save(r_manager);
    } catch (e) {
      res.status(409).send("manager already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



  static deleteManager = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const managerRepository = getRepository(RManager);
    let r_manager: RManager;
    try {
        r_manager = await managerRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("workgroup not found");
      return;
    }
    managerRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default ManagerController;