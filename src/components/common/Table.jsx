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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
        <thead className="bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider transition-colors duration-200"
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
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={`${
                onRowClick
                  ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  : ""
              } transition-colors duration-200`}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200 transition-colors duration-200"
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
