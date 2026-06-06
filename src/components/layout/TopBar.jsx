import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Menu,
  Search,
  Bell,
  Calendar,
  Download,
  Filter,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';

export function TopBar({
  onMenuClick,
  onSearch,
  searchValue,
  onExport,
  onFilterClick,
  dateRange,
  onDateRangeChange,
  filterCount = 0,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-slate-100 text-slate-500"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search data..."
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Date Range Picker (simplified) */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">
                {dateRange?.start && dateRange?.end
                  ? `${formatDate(dateRange.start, { month: 'short', day: 'numeric' })} - ${formatDate(dateRange.end, { month: 'short', day: 'numeric' })}`
                  : 'Last 30 days'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Filter button */}
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                filterCount > 0
                  ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <Filter className="w-4 h-4" />
              {filterCount > 0 && (
                <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {filterCount}
                </span>
              )}
              <span className="hidden lg:inline">Filters</span>
            </button>
          )}

          {/* Export button */}
          {onExport && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onExport}
              className="hidden sm:flex"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Export</span>
            </Button>
          )}

          {/* Notifications */}
          <button className="relative p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search data..."
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </div>
    </header>
  );
}
