'use client';

// Imports:
import { Card, CardContent } from '@/components/ui/card';
import { TTableComponent } from '@/types/table';
import {
  DocumentIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import Typography from '../typography';

export default function GenericTable({
  tableHeaders = [],
  tableRows = [],
  rowClass = '',
  onRowSelect = (_row: object, _index: number) => {},
  showActions = false,
  documentHandler = () => {},
  fileHandler = () => {},
  deleteHandler = () => {},
}: TTableComponent) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  function handleSelect(row: object, index: number) {
    console.log('Selected Row:', row);
    console.log('Selected Index:', index);

    setSelectedRowIndex(index);
    onRowSelect(row, index);
  }

  return (
    <Card className="w-full text-center shadow-none rounded-sm bg-transparent px-10 border border-red-500">
      <CardContent className="overflow-scroll px-0 py-5">
        {tableRows?.length > 0 ? (
          <table className="w-full min-w-max table-auto text-left border border-red-500">
            {tableHeaders.length > 0 && (
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className="p-3 text-sm font-normal text-gray-500"
                    >
                      {header.label}
                    </th>
                  ))}
                  {showActions && (
                    <th className="p-3 text-sm font-normal text-gray-500">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
            )}
            <tbody>
              {tableRows.map((row, index) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? `p-3 ${rowClass}`
                  : `p-3 border-b border-light dark:border-dark ${rowClass}`;

                return (
                  <tr
                    key={index}
                    className={`hover:bg-primary/5 dark:hover:bg-dark rounded-sm cursor-pointer ${selectedRowIndex === index ? 'bg-primary/5' : ''}`}
                    onClick={() => handleSelect(row, index)}
                  >
                    {Object.keys(row).map((key) =>
                      key !== 'id' ? (
                        <td key={key} className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-base text-light"
                          >
                            {row[key as keyof typeof row]}
                          </Typography>
                        </td>
                      ) : null
                    )}

                    {showActions && (
                      <>
                        <td className={classes} onClick={documentHandler}>
                          <DocumentIcon className="h-5 w-5 text-black cursor-pointer" />
                        </td>
                        <td className={classes} onClick={fileHandler}>
                          <PencilSquareIcon className="h-5 w-5 text-primary cursor-pointer" />
                        </td>
                        <td className={classes} onClick={deleteHandler}>
                          <TrashIcon className="h-5 w-5 text-red-400 cursor-pointer" />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Typography
            variant="small"
            className="font-normal text-light text-base"
          >
            No records found.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
