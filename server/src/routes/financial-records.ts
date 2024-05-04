import express, { Request, Response } from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// Route to get all financial records by user ID
router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    // Extract userId from request parameters
    const userId = req.params.userId;

    // Find all financial records associated with the given userId
    const records = await FinancialRecordModel.find({ userId: userId });

    // If no records found, return 404 status code with a message
    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }

    // If records found, return 200 status code with the records
    res.status(200).send(records);
  } catch (err) {
    // If an error occurs, return 500 status code with the error message
    res.status(500).send(err);
  }
});

// Route to create a new financial record
router.post("/", async (req: Request, res: Response) => {
  try {
    // Extract new record data from request body
    const newRecordBody = req.body;

    // Create a new FinancialRecordModel instance with the provided data
    const newRecord = new FinancialRecordModel(newRecordBody);

    // Save the new record to the database
    const savedRecord = await newRecord.save();

    // Return 200 status code with the saved record
    res.status(200).send(savedRecord);
  } catch (err) {
    // If an error occurs, return 500 status code with the error message
    res.status(500).send(err);
  }
});

// Route to update an existing financial record by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    // Extract record ID from request parameters
    const id = req.params.id;

    // Extract updated record data from request body
    const newRecordBody = req.body;

    // Find and update the record by ID, returning the updated record
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true }
    );

    // If no record found, return 404 status code
    if (!record) return res.status(404).send();

    // If record found and updated, return 200 status code with the updated record
    res.status(200).send(record);
  } catch (err) {
    // If an error occurs, return 500 status code with the error message
    res.status(500).send(err);
  }
});

// Route to delete a financial record by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // Extract record ID from request parameters
    const id = req.params.id;

    // Find and delete the record by ID, returning the deleted record
    const record = await FinancialRecordModel.findByIdAndDelete(id);

    // If no record found, return 404 status code
    if (!record) return res.status(404).send();

    // If record found and deleted, return 200 status code with the deleted record
    res.status(200).send(record);
  } catch (err) {
    // If an error occurs, return 500 status code with the error message
    res.status(500).send(err);
  }
});

export default router;
