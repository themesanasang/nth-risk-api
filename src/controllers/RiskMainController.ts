import { Request, Response } from "express";
import { getRepository, AdvancedConsoleLogger } from "typeorm";
import { validate } from "class-validator";
import { RRiskMain } from "../entity/RiskMain";


class RiskMainController{

  static listAll = async (req: Request, res: Response) => {
    //Get RiskMain from database
    const riskMainRepository = getRepository(RRiskMain);
    const riskmain = await riskMainRepository.find();

    //Send the RiskMain object
    res.send(riskmain);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the riskmain from database
    const riskMainRepository = getRepository(RRiskMain);
    try {
      const riskmain = await riskMainRepository.findOneOrFail(id);

      res.send(riskmain);
    } catch (error) {
      res.status(404).send("riskmain not found");
    }
  };



  static newRiskMain = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, detail, isActive } = req.body;
    let r_riskmain = new RRiskMain();
    r_riskmain.name = name;
    r_riskmain.detail = detail;
    r_riskmain.isActive = isActive;

    //Validade if the parameters are ok
    const errors = await validate(r_riskmain);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the riskmain is already in use
    const riskMainRepository = getRepository(RRiskMain);
    try {
      await riskMainRepository.save(r_riskmain);
    } catch (e) {
      res.status(409).send("riskmain already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("riskmain created");
  };



  static editRiskMain = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { name, detail, isActive } = req.body;

    //Try to find riskmain on database
    const riskMainRepository = getRepository(RRiskMain);
    let r_riskmain;
    try {
        r_riskmain = await riskMainRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("riskmain not found");
      return;
    }

    //Validate the new values on model
    r_riskmain.name = name;
    r_riskmain.detail = detail;
    r_riskmain.isActive = isActive;
    const errors = await validate(r_riskmain);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means riskmain already in use
    try {
      await riskMainRepository.save(r_riskmain);
    } catch (e) {
      res.status(409).send("riskmain already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



  static deleteRiskMain = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const riskMainRepository = getRepository(RRiskMain);
    let r_riskmain: RRiskMain;
    try {
        r_riskmain = await riskMainRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("risklevel not found");
      return;
    }
    riskMainRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default RiskMainController;