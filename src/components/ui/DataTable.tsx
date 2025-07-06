import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title: string;
  emptyMessage?: string;
}

export function DataTable({ data, columns, title, emptyMessage = 'No data available' }: DataTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const defaultRender = (value: any, key: string) => {
    if (key === 'timestamp') {
      return formatDate(value);
    }
    if (typeof value === 'string' && value.length > 50) {
      return (
        <span title={value} className="cursor-help">
          {truncateText(value)}
        </span>
      );
    }
    return value || '-';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{data.length} records</p>
      </div>
      
      {data.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : defaultRender(row[column.key], column.key)
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 