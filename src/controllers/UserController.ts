import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import {getConnection} from "typeorm";
import { RUser } from "../entity/User";


class UserController{

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    //const userRepository = getRepository(RUser);
    //const users = await userRepository.find({ relations: ["department"] });
    let r_user = new RUser();
    let users = await r_user.getUserAll();

    //Send the users object
    res.send(users);
  };



  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the user from database
    const userRepository = getRepository(RUser);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //We dont want to send the password on response
      });

      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };



  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password, fullname, email, department, role, isActive } = req.body;
    let user = new RUser();
    user.username = username;
    user.password = password;
    user.fullname = fullname;
    user.email = email;
    user.department = department;
    user.role = role;
    user.isActive = isActive;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(RUser);
    try {
      await userRepository.save(user);
    } catch (e) {
      console.log(e);
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };



  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(RUser);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(RUser);
    let user: RUser;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default UserController;