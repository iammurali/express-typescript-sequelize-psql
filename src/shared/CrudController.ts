import { Request, Response } from "express";
import { FindOptions } from "sequelize/types";
import { CrudOptions } from "../app/interfaces/CrudOptions";
import CategoryService from "../app/services/CategoryService";
import CrudService from "./CrudService";


abstract class CrudController {
  tableName: String;
  list: FindOptions;
  detail: FindOptions;
  keyName: any;
  message: String;
  constructor(crudOptions: CrudOptions) {
    this.tableName = crudOptions.tableName;
    this.list = crudOptions.list;
    this.keyName = crudOptions.keyName;
    this.message = crudOptions.message;
    this.detail = crudOptions.detail ? crudOptions.detail : {}
  }
  getList = async (req: Request, res: Response): Promise<Response> => {
    const service: CrudService = new CrudService(req, this.tableName);
    try {
      const categories = await service.getList(this.list);
      if (categories) {
        return res.status(200).send({
          [this.keyName]: categories,
        });
      } else {
        return res.status(400).send({ message: "Oops ! something went wrong"});
      }
    } catch (error) {
      return res.status(400).send({ message: "Oops! something went wrong", stack: error });
    }
  };
 
  getById = async (req: Request, res: Response): Promise<Response> => {
    const service: CrudService = new CrudService(req, this.tableName);
    try {
      const categories = await service.getById(this.detail);
      if (categories) {
        return res.status(200).send({
          [this.keyName]: categories,
        });
      } else {
        return res.status(400).send({ message: "Oops ! something went wrong"});
      }
    } catch (error) {
      return res.status(400).send({ message: "Oops! something went wrong", stack: error });
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const service: CrudService = new CrudService(req, this.tableName);
    try {
      const Category = await service.create();
      if (Category) {
        return res.status(200).send({
          [this.keyName]: Category,
          message: `${this.message} saved successfully !!`,
        });
      } else {
        return res.status(400).send({ message: "Oops! something went wrong" });
      }
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Oops! something went wrong" + error });
    }
  };

  // TODO: Delete method, getById, join queries
}

export default CrudController;
