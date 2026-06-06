import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SkeletonChart } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-lg">
        <p className="text-sm font-medium text-slate-900 mb-1">{data.category}</p>
        <p className="text-sm text-slate-600">
          Sales: {formatCurrency(data.sales)}
        </p>
        <p className="text-sm text-slate-600">
          Profit: {formatCurrency(data.profit)}
        </p>
        <p className="text-sm text-slate-600">
          Units: {data.unitsSold?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function CategoryChart({ data, loading }) {
  if (loading) {
    return <SkeletonChart />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3 className="dashboard-card-title">Sales by Category</h3>
        </div>
        <div className="dashboard-card-content h-80 flex items-center justify-center">
          <p className="text-slate-500">No data available</p>
        </div>
      </div>
    );
  }

  // Sort by sales descending
  const sortedData = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h3 className="dashboard-card-title">Sales by Category</h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Revenue distribution across product categories
          </p>
        </div>
      </div>
      <div className="dashboard-card-content">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              layout="vertical"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                radius={[0, 4, 4, 0]}
                maxBarSize={40}
              >
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
