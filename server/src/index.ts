// PWD: mongodb+srv://melaagip1:lllXfewRVx5Wa9DM@biztrack.3nuxpqv.mongodb.net/
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Middleware to log all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming ${req.method} request to ${req.path}`);
    next();
  });
  

const mongoURI: string =
  "mongodb+srv://melaagip1:lllXfewRVx5Wa9DM@biztrack.3nuxpqv.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

  

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});



