import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { cn, formatDate } from '@/lib/utils';

export function FilterPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  filterOptions,
  loading,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
    onClose();
  };

  const updateFilter = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-140px)]">
          {/* Date Range */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar className="w-4 h-4" />
              Date Range
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">From</label>
                <Input
                  type="date"
                  value={localFilters.startDate || ''}
                  onChange={(e) => updateFilter('startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">To</label>
                <Input
                  type="date"
                  value={localFilters.endDate || ''}
                  onChange={(e) => updateFilter('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          {filterOptions?.categories && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <Select
                value={localFilters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {/* Region */}
          {filterOptions?.regions && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Region</label>
              <Select
                value={localFilters.region || ''}
                onChange={(e) => updateFilter('region', e.target.value)}
              >
                <option value="">All Regions</option>
                {filterOptions.regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {/* Product */}
          {filterOptions?.products && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Product</label>
              <Select
                value={localFilters.product || ''}
                onChange={(e) => updateFilter('product', e.target.value)}
              >
                <option value="">All Products</option>
                {filterOptions.products.slice(0, 50).map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </Select>
              {filterOptions.products.length > 50 && (
                <p className="text-xs text-slate-500">
                  Showing first 50 products. Use search for more.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              className="flex-1"
              onClick={handleApply}
              isLoading={loading}
            >
              Apply
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

// Active filter badges
export function ActiveFilters({ filters, onRemove, onClearAll }) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  if (activeFilters.length === 0) return null;

  const formatLabel = (key, value) => {
    switch (key) {
      case 'startDate':
        return `From: ${formatDate(value, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'endDate':
        return `To: ${formatDate(value, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'category':
        return `Category: ${value}`;
      case 'region':
        return `Region: ${value}`;
      case 'product':
        return `Product: ${value}`;
      case 'search':
        return `Search: "${value}"`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {activeFilters.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700"
        >
          {formatLabel(key, value)}
          <button
            onClick={() => onRemove(key)}
            className="hover:text-primary-800"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-slate-500 hover:text-slate-700 underline"
      >
        Clear all
      </button>
    </div>
  );
}
