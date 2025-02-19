// Imports:
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { TTablePagination } from '@/types/table';

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TTablePagination) {
  function next() {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }

  function previous() {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={previous}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={next}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
