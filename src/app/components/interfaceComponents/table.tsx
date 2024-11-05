import React from 'react';

interface TableProps {
  columns: string[];
  data: any[];
  renderRow: (row: any, index: number) => React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, renderRow, className = '' }) => {
  return (
    <table className={`min-w-full bg-white ${className}`}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-700">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b border-gray-200">
            {renderRow(row, index)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;