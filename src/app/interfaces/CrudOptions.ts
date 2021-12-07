import { FindOptions } from "sequelize/types";

export interface CrudOptions {
  tableName: String;
  list: FindOptions;
  detail?: FindOptions;
  keyName: String;
  message: String;
}
