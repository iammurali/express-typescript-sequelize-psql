import express, { Application, Request, Response } from "express";
const path = require("path");
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import fileUpload from "express-fileupload";
import { config as dotenv } from "dotenv";

// Routers

import AuthRoutes from "./app/routers/AuthRoutes";


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv({ path: path.resolve(__dirname, "../.env") });
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      fileUpload({
        useTempFiles: true,
      })
    );
    // this.app.set('views', './views')
    this.app.set('view engine', 'ejs');
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.render('index');
    });
    this.app.route("/api").get((req: Request, res: Response) => {
      res.send("Welcome to Jazy");
    });

    this.app.use("/api/v1", AuthRoutes);
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log("Database user :: ", process.env.DB_USER);
  console.log("Environment :: ", process.env.NODE_ENV);

  console.log("Server started successfully at port :: " + port);
});
