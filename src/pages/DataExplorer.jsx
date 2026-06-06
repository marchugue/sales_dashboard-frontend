import { useState, useCallback } from 'react';
import { Table2, Search, Download, Filter } from 'lucide-react';
import { DataTable } from '@/components/dashboard/DataTable';
import { FilterPanel, ActiveFilters } from '@/components/dashboard/FilterPanel';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  useRawData,
  useFilterOptions,
  useFilters,
  usePagination,
  useDebounce,
} from '@/hooks/useDashboard';
import { dashboardAPI } from '@/services/api';

export function DataExplorer() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Filters
  const { filters, updateFilter, clearFilters, removeFilter, setFilters } = useFilters({});

  // Pagination
  const {
    page,
    limit,
    setPage,
    setLimit,
    setTotal,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = usePagination(1, 25);

  // Data fetching
  const { data: filterOptions, loading: filterOptionsLoading } = useFilterOptions();
  const { data: rawDataResponse, loading: rawDataLoading } = useRawData(
    { ...filters, search: debouncedSearch },
    { page, limit }
  );

  // Handlers
  const handleExport = useCallback(async () => {
    try {
      await dashboardAPI.exportCSV(filters);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, [filters]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, [setPage]);

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1);
  }, [setLimit, setPage]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, [setFilters, setPage]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Data Explorer</h1>
          <p className="text-slate-500 mt-1">
            Browse, search, and filter all transaction data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeFilterCount > 0 ? 'default' : 'secondary'}
            size="sm"
            onClick={() => setFilterPanelOpen(true)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-white text-primary-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-lg border border-slate-200 p-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by product, order, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="text-sm text-slate-500">
          {rawDataResponse?.pagination?.total?.toLocaleString() || 0} total records
        </div>
      </div>

      {/* Active filters */}
      <ActiveFilters
        filters={filters}
        onRemove={removeFilter}
        onClearAll={clearFilters}
      />

      {/* Data table */}
      <DataTable
        data={rawDataResponse?.data || []}
        loading={rawDataLoading}
        pagination={{
          page,
          limit,
          total: rawDataResponse?.pagination?.total || 0,
          totalPages: Math.ceil((rawDataResponse?.pagination?.total || 0) / limit),
          hasNextPage: page < Math.ceil((rawDataResponse?.pagination?.total || 0) / limit),
          hasPrevPage: page > 1,
        }}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterPanelOpen}
        onClose={() => setFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        filterOptions={filterOptions}
        loading={filterOptionsLoading}
      />
    </div>
  );
}

export { DataExplorer as default };
