import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { cn, formatCurrency, formatNumber } from '@/lib/utils';

const icons = {
  TrendingUp,
  TrendingDown,
  Minus,
};

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  format = 'currency',
  loading = false,
  className,
}) {
  if (loading) {
    return <SkeletonCard className={className} />;
  }

  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const trendColor = isPositive
    ? 'text-emerald-600 bg-emerald-50'
    : isNegative
    ? 'text-rose-600 bg-rose-50'
    : 'text-slate-500 bg-slate-100';

  const formattedValue =
    format === 'currency'
      ? formatCurrency(value)
      : format === 'number'
      ? formatNumber(value)
      : value;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-slate-200 p-6 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{formattedValue}</p>
          
          {change !== undefined && change !== null && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full',
                  trendColor
                )}
              >
                <TrendIcon className="w-3 h-3" />
                {isPositive ? '+' : ''}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-slate-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export function KPICardsGrid({ data, loading }) {
  const cards = [
    {
      title: 'Total Sales',
      value: data?.totalSales ?? 0,
      change: 12.5,
      changeLabel: 'vs last month',
      icon: icons.TrendingUp,
      format: 'currency',
    },
    {
      title: 'Total Profit',
      value: data?.totalProfit ?? 0,
      change: 8.2,
      changeLabel: 'vs last month',
      icon: icons.TrendingUp,
      format: 'currency',
    },
    {
      title: 'Total Orders',
      value: data?.totalOrders ?? 0,
      change: -3.1,
      changeLabel: 'vs last month',
      icon: icons.TrendingDown,
      format: 'number',
    },
    {
      title: 'Average Order Value',
      value: data?.averageOrderValue ?? 0,
      change: 5.7,
      changeLabel: 'vs last month',
      icon: icons.TrendingUp,
      format: 'currency',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KPICard
          key={card.title}
          {...card}
          loading={loading}
        />
      ))}
    </div>
  );
}
