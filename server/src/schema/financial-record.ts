import mongoose from "mongoose";

// Define the structure of a financial record
interface FinancialRecord {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define a mongoose schema for the FinancialRecord interface
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true }, // User ID of the financial record owner
  date: { type: Date, required: true }, // Date of the financial record
  description: { type: String, required: true }, // Description of the financial record
  amount: { type: Number, required: true }, // Amount of the financial record
  category: { type: String, required: true }, // Category of the financial record
  paymentMethod: { type: String, required: true }, // Payment method used for the financial record
});

// Create a mongoose model based on the financial record schema
const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord", // Name of the collection in the database
  financialRecordSchema // Schema for financial records
);

// Export the mongoose model for use in other parts of the application
export default FinancialRecordModel;
