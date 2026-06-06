import { useState } from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RegionChart } from '@/components/dashboard/RegionChart';
import { useSalesTrend, useCategoryBreakdown, useRegionAnalysis, useFilters } from '@/hooks/useDashboard';
import { subDays, format } from 'date-fns';

const defaultDateRange = {
  startDate: format(subDays(new Date(), 90), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
};

export function Analytics() {
  const [period, setPeriod] = useState('monthly');
  const { filters } = useFilters({ ...defaultDateRange });

  const { data: trendData, loading: trendLoading } = useSalesTrend(period, filters);
  const { data: categoryData, loading: categoryLoading } = useCategoryBreakdown(filters);
  const { data: regionData, loading: regionLoading } = useRegionAnalysis(filters);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">
            Detailed analysis of your sales performance
          </p>
        </div>

        <div className="flex items-center gap-2">
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

          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Analysis Period</p>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4 text-slate-400" />
            <p className="font-semibold text-slate-900">Last 90 Days</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Data Points</p>
          <p className="font-semibold text-slate-900 mt-1">
            {trendData?.length || 0} {period === 'daily' ? 'Days' : 'Months'}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Categories</p>
          <p className="font-semibold text-slate-900 mt-1">
            {categoryData?.length || 0} Categories
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Regions</p>
          <p className="font-semibold text-slate-900 mt-1">
            {regionData?.length || 0} Regions
          </p>
        </div>
      </div>

      {/* Main chart */}
      <SalesTrendChart data={trendData} loading={trendLoading} period={period} />

      {/* Secondary charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={categoryData} loading={categoryLoading} />
        <RegionChart data={regionData} loading={regionLoading} />
      </div>
    </div>
  );
}

export { Analytics as default };
