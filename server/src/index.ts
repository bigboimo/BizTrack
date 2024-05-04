import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Middleware to log all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming ${req.method} request to ${req.path}`);
    next();
});

// MongoDB connection URI
const mongoURI: string =
  "mongodb+srv://melaagip1:lllXfewRVx5Wa9DM@biztrack.3nuxpqv.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

// Routes
app.use("/financial-records", financialRecordRouter); // Use financial record routes

// Start the server
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
