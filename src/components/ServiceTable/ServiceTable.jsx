import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { useState } from 'react';
import { BadgePlus } from 'lucide-react';
import { AddServiceForm } from '../../components/AddServiceForm/AddServiceForm';

ServiceTable.propTypes = {
  columns: PropTypes.array,
  servicesData: PropTypes.array,
};

export function ServiceTable({ columns, servicesData }) {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: servicesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <div className="p-12">
      <h1 className="text-4xl font-semibold ">Services</h1>

      <div className="flex flex-row justify-between content-center">
        <div className="flex py-4 justify-self-start">
          <Input
            placeholder="Filter service names..."
            value={table.getColumn('service_name')?.getFilterValue() ?? ''}
            onChange={(event) => table.getColumn('service_name')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex content-center">
          <AddServiceForm>
            <div>
              <BadgePlus size={40} /> <h3 className="p-1 text-lg">Add service</h3>
            </div>
          </AddServiceForm>
        </div>
      </div>
      <div className="rounded-md border p-12">
        <Table className={''}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
