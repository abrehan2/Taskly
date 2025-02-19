// Imports:
import { Card, CardContent } from '@/components/ui/card';
import { TTableComponent, TTableRowProps } from '@/types/table';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Typography from '../typography';

export default function GenericTable({
  tableHeaders = [],
  tableRows = [],
  rowClass = '',
  onRowSelect = (_row: TTableRowProps, _index: number) => {},
  showActions = false,
  editHandler = (_row: TTableRowProps) => {},
  deleteHandler = (_row: TTableRowProps) => {},
}: TTableComponent) {
  function handleSelect(row: TTableRowProps, index: number) {
    onRowSelect(row, index);
  }

  return (
    <Card className="w-full border-none text-center shadow-none rounded-sm bg-transparent px-10">
      <CardContent className="overflow-scroll px-0 py-5">
        {tableRows?.length > 0 ? (
          <table className="w-full min-w-max table-auto text-left">
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
                    className={`hover:bg-black/5 dark:hover:bg-dark rounded-sm cursor-pointer`}
                    onClick={() => handleSelect(row, index)}
                  >
                    {Object.keys(row).map((key) =>
                      key !== 'id' && key !== 'description' ? (
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
                        <td
                          className={classes}
                          onClick={() => editHandler(row)}
                        >
                          <PencilSquareIcon className="h-5 w-5 dark:text-white cursor-pointer" />
                        </td>
                        <td
                          className={classes}
                          onClick={() => deleteHandler(row)}
                        >
                          <TrashIcon className="h-5 w-5 dark:text-white cursor-pointer" />
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
