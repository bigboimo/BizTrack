import { useMemo, useState } from "react";
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/financial-record-context";
import { useTable, Column, CellProps, Row } from "react-table";

// Define props for the EditableCell component
interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void; // Function to update a record
  editable: boolean; // Indicates whether the cell is editable
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);  // State to track editing mode
  const [value, setValue] = useState(initialValue); // State to store cell value

  const onBlur = () => {
    setIsEditing(false); // Exit editing mode
    updateRecord(row.index, column.id, value); // Update the record with the new value
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)} // Allow editing on click if editable
      style={{ cursor: editable ? "pointer" : "default" }} // Change cursor based on editability
    >
      {isEditing ? ( // Render input field if editing, otherwise render cell value
        <input
          value={value} // Auto-focus input field when editin
          onChange={(e) => setValue(e.target.value)} // Call onBlur when input field loses focus
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? ( // Render cell value if not editing
        value
      ) : (
        value.toString() // Render cell value as string if not a string
      )}
    </div>
  );
};

// FinancialRecordList component renders a list of financial records in a table
export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords(); // Get financial records and functions to manipulate records
  // Function to update a specific cell of a record
  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]?._id; // Get record ID
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value }); // Update the record with the new value
  };

   // Define columns for the table
  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      // Define columns with headers, accessors, and cell renderers
      // The Cell renderer is the EditableCell component for editable cells
      // The "Delete" column renders a button to delete the record
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="button"
          >
            Delete
          </button>
        ),
      },
    ],
    [records] // Recreate columns when records change
  );

  // Use react-table hook to get table props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: records,
    });

  // Render the table
  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};