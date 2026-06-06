import { useState, useCallback } from 'react';
import { KPICardsGrid } from '@/components/dashboard/KPICard';
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RegionChart } from '@/components/dashboard/RegionChart';
import { DataTable } from '@/components/dashboard/DataTable';
import { FilterPanel, ActiveFilters } from '@/components/dashboard/FilterPanel';
import { InsightsPanel, TopProductsPanel } from '@/components/dashboard/InsightsPanel';
import {
  useKPISummary,
  useSalesTrend,
  useCategoryBreakdown,
  useRegionAnalysis,
  useTopProducts,
  useRawData,
  useInsights,
  useFilterOptions,
  useFilters,
  usePagination,
  useDebounce,
} from '@/hooks/useDashboard';
import { dashboardAPI } from '@/services/api';
import { subDays, format } from 'date-fns';

// Default date range: last 30 days
const defaultDateRange = {
  startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
};

export function Dashboard() {
  const [period, setPeriod] = useState('daily');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Filters
  const { filters, updateFilter, clearFilters, removeFilter, setFilters } = useFilters({
    ...defaultDateRange,
  });

  // Pagination
  const {
    page,
    limit,
    setPage,
    setLimit,
    setTotal,
    hasNextPage,
    hasPrevPage,
    totalPages,
  } = usePagination(1, 10);

  // Data fetching
  const { data: kpiData, loading: kpiLoading } = useKPISummary(filters);
  const { data: trendData, loading: trendLoading } = useSalesTrend(period, filters);
  const { data: categoryData, loading: categoryLoading } = useCategoryBreakdown(filters);
  const { data: regionData, loading: regionLoading } = useRegionAnalysis(filters);
  const { data: topProductsData, loading: topProductsLoading } = useTopProducts(10, filters);
  const { data: insightsData, loading: insightsLoading } = useInsights(filters);
  const { data: filterOptions, loading: filterOptionsLoading } = useFilterOptions();
  
  const { data: rawDataResponse, loading: rawDataLoading, refetch: refetchRawData } = useRawData(
    { ...filters, search: debouncedSearch },
    { page, limit }
  );

  // Update total when raw data changes
  if (rawDataResponse?.pagination?.total && rawDataResponse.pagination.total !== totalPages * limit / limit * limit) {
    setTotal(rawDataResponse.pagination.total);
  }

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

  const activeFilterCount = Object.values(filters).filter(Boolean).length - 2; // Exclude default dates

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Overview of your sales performance and key metrics
          </p>
        </div>
        
        {/* Period selector */}
        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-1">
          <button
            onClick={() => setPeriod('daily')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              period === 'daily'
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              period === 'monthly'
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Active filters */}
      <ActiveFilters
        filters={filters}
        onRemove={removeFilter}
        onClearAll={clearFilters}
      />

      {/* KPI Cards */}
      <KPICardsGrid data={kpiData} loading={kpiLoading} />

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesTrendChart data={trendData} loading={trendLoading} period={period} />
        </div>
        <div>
          <RegionChart data={regionData} loading={regionLoading} />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryChart data={categoryData} loading={categoryLoading} />
        </div>
        <div className="space-y-6">
          <TopProductsPanel data={topProductsData} loading={topProductsLoading} />
          <InsightsPanel data={insightsData} loading={insightsLoading} />
        </div>
      </div>

      {/* Data Table */}
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

export { Dashboard as default };
