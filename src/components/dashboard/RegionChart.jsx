import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SkeletonChart } from '@/components/ui/Skeleton';
import { formatCurrency, formatNumber } from '@/lib/utils';

const COLORS = [
  '#2563eb',
  '#3b82f6',
  '#60a5fa',
  '#93c5fd',
  '#bfdbfe',
  '#1d4ed8',
  '#1e40af',
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-lg">
        <p className="text-sm font-medium text-slate-900 mb-1">
          {data.region} {data.country && `(${data.country})`}
        </p>
        <p className="text-sm text-slate-600">
          Sales: {formatCurrency(data.sales)}
        </p>
        <p className="text-sm text-slate-600">
          Orders: {formatNumber(data.orders)}
        </p>
        <p className="text-sm text-slate-600">
          Customers: {formatNumber(data.customers)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <li key={`legend-${index}`} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-600">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export function RegionChart({ data, loading }) {
  if (loading) {
    return <SkeletonChart />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3 className="dashboard-card-title">Sales by Region</h3>
        </div>
        <div className="dashboard-card-content h-80 flex items-center justify-center">
          <p className="text-slate-500">No data available</p>
        </div>
      </div>
    );
  }

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.sales, 0);
  const chartData = data.map((item) => ({
    ...item,
    percentage: ((item.sales / total) * 100).toFixed(1),
  }));

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h3 className="dashboard-card-title">Sales by Region</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Geographic distribution of revenue
          </p>
        </div>
      </div>
      <div className="dashboard-card-content">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="sales"
                nameKey="region"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CustomLegend />}
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
