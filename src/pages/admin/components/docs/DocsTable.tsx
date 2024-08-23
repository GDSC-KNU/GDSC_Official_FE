import { useState, useEffect } from 'react';

import Pagination from '@gdsc/components/common/pagination/pagination';

import {
  StyledTable,
  TableHeader,
  TableHeaderRow,
  TableCell,
  TableHeaderCell,
  TableRow,
} from '@gdsc/pages/admin/components/MemberTable.style';

import { columns } from '@gdsc/constants/DocsTableColumns';

import {
  applyDocsInterface,
  useGetApplyDocs,
} from '@gdsc/apis/hooks/admin/docs/useGetApplyDocs';
import { useGetSearch } from '@gdsc/apis/hooks/admin/docs/useGetSearch';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const MemberTable = ({ searchName }: { searchName?: string | undefined }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [docsList, setDocsList] = useState<applyDocsInterface | null>(null);

  const { data: docsData } = useGetApplyDocs('', false, currentPage, 7);
  const { data: searchData } = useGetSearch(searchName, currentPage, 7);

  useEffect(() => {
    if (searchName) {
      setDocsList(searchData ?? null);
    } else {
      setDocsList(docsData ?? null);
    }
  }, [searchName, docsData, searchData]);

  const totalPages = docsList ? docsList.totalPage : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleNextGroup = () => {
    if (currentGroup < Math.ceil(totalPages / 5) - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const table = useReactTable({
    columns: columns(),
    data: docsList?.data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <StyledTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHeaderCell>
              ))}
            </TableHeaderRow>
          ))}
        </TableHeader>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentGroup={currentGroup}
        onPageChange={handlePageChange}
        onNextGroup={handleNextGroup}
        onPrevGroup={handlePrevGroup}
      />
    </>
  );
};

export default MemberTable;
