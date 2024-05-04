import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

// Dashboard component to display financial records and total monthly amount
export const Dashboard = () => {
  // Get the current user using Clerk's useUser hook
  const { user } = useUser();

  // Get financial records and functions to manipulate records from context
  const { records } = useFinancialRecords();

  // Calculate total monthly amount using useMemo to prevent unnecessary recalculations
  const totalMonthly = useMemo(() => {
    let totalAmount = 0;

    // Iterate through each record and sum up the amount
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]); // Recalculate when records change

  return (
    <div className="dashboard-container">
      {/* Display welcome message with user's first name */}
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>

      {/* Render the financial record form component */}
      <FinancialRecordForm />

      {/* Display total monthly amount */}
      <div>Total Monthly: ${totalMonthly}</div>

      {/* Render the financial record list component */}
      <FinancialRecordList />
    </div>
  );
};
