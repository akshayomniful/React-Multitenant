import React from "react";

const Table = ({
  columns,
  data,
  actions,
  onRowClick,
  className = "",
  emptyMessage = "No data available",
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {actions.map((action, i) => (
                      <React.Fragment key={i}>
                        {action.render(row)}
                      </React.Fragment>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
