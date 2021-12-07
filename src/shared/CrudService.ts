import { Request } from "express";
import { FindOptions, Op } from "sequelize";

const db = require("../db/models");

class CrudService {
  body: Request["body"];
  params: Request["params"];
  credential: {
    id: number;
    userName: string;
  };
  tableName: any;
  constructor(req: Request, tableName: any) {
    this.credential = req.app.locals.credential;

    this.body = req.body;
    this.params = req.params;
    this.tableName = tableName;
  }
  getList = async (condition?: FindOptions) => {
    let findCondition: FindOptions = {
      where: { isActive: 1 },
    };

    if (condition) {
      if (condition.where && findCondition.where) {
        delete findCondition.where;
      }
      findCondition = {
        ...condition,
      };
    }

    const list = await db[this.tableName].findAll(findCondition);
    return list;
  };
  getById = async (condition: any) => {
    let ob = {
      ...condition,
      where: { id: this.body.id },
    }
    console.log(ob, this.tableName);
    const obj = await db[this.tableName].findOne(ob);
    console.log(obj);
    return obj;
  };
  create = async () => {
    // const { name, icon, color } = this.body;
    const createdItem = await db[this.tableName].create({
      ...this.body,
      isActive: 1,
      userId: this.credential.id,
      // vendorId: this.credential.id,
    });
    return createdItem;
  };
}
export default CrudService;
