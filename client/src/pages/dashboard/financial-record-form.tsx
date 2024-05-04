import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
  // State variables to store form input values
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Access the addRecord function from the financial record context
  const { addRecord } = useFinancialRecords();

  // Access the current user information using Clerk's useUser hook
  const { user } = useUser();

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a new financial record object using form input values and user ID
    const newRecord = {
      userId: user?.id ?? "", // User ID
      date: new Date(), // Current date
      description: description, // Description from form input
      amount: parseFloat(amount), // Amount from form input (parsed to float)
      category: category, // Category from form input
      paymentMethod: paymentMethod, // Payment method from form input
    };

    // Call the addRecord function to add the new record to the financial records
    addRecord(newRecord);

    // Clear form input values after submission
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        {/* Description input field */}
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
          />
        </div>
        {/* Amount input field */}
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update amount state on input change
          />
        </div>
        {/* Category select field */}
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Update category state on select change
          >
            {/* Options for different categories */}
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Payment method select field */}
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)} // Update payment method state on select change
          >
            {/* Options for different payment methods */}
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        {/* Submit button */}
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};
