import { Request, Response } from "express";
import { getRepository, AdvancedConsoleLogger } from "typeorm";
import { validate } from "class-validator";
import { RRiskLevel } from "../entity/RiskLevel";


class RiskLevelController{

  static listAll = async (req: Request, res: Response) => {
    //Get RiskLevel from database
    const riskLevelRepository = getRepository(RRiskLevel);
    const risklevels = await riskLevelRepository.find();

    //Send the RiskLevel object
    res.send(risklevels);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the risklevel from database
    const riskLevelRepository = getRepository(RRiskLevel);
    try {
      const risklevel = await riskLevelRepository.findOneOrFail(id);

      res.send(risklevel);
    } catch (error) {
      res.status(404).send("risklevel not found");
    }
  };



  static newRiskLevel = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { level, detail, isActive } = req.body;
    let r_risklevel = new RRiskLevel();
    r_risklevel.level = level;
    r_risklevel.detail = detail;
    r_risklevel.isActive = isActive;

    //Validade if the parameters are ok
    const errors = await validate(r_risklevel);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the risklevel is already in use
    const riskLevelRepository = getRepository(RRiskLevel);
    try {
      await riskLevelRepository.save(r_risklevel);
    } catch (e) {
      res.status(409).send("risklevel already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("risklevel created");
  };



  static editRiskLevel = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { level, detail, isActive } = req.body;

    //Try to find risklevel on database
    const riskLevelRepository = getRepository(RRiskLevel);
    let r_risklevel;
    try {
        r_risklevel = await riskLevelRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("risklevel not found");
      return;
    }

    //Validate the new values on model
    r_risklevel.level = level;
    r_risklevel.detail = detail;
    r_risklevel.isActive = isActive;
    const errors = await validate(r_risklevel);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means risklevel already in use
    try {
      await riskLevelRepository.save(r_risklevel);
    } catch (e) {
      res.status(409).send("risklevel already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



  static deleteRiskLevel = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const riskLevelRepository = getRepository(RRiskLevel);
    let r_risklevel: RRiskLevel;
    try {
        r_risklevel = await riskLevelRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("risklevel not found");
      return;
    }
    riskLevelRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default RiskLevelController;