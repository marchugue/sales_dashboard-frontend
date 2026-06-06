import { FileText, Download, Calendar, TrendingUp, PieChart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { format } from 'date-fns';

const reports = [
  {
    id: 'sales-summary',
    title: 'Sales Summary Report',
    description: 'Comprehensive overview of sales performance including revenue, orders, and trends.',
    icon: TrendingUp,
    lastGenerated: new Date(),
    format: 'PDF',
  },
  {
    id: 'category-analysis',
    title: 'Category Analysis Report',
    description: 'Detailed breakdown of sales and profit by product category.',
    icon: PieChart,
    lastGenerated: new Date(Date.now() - 24 * 60 * 60 * 1000),
    format: 'Excel',
  },
  {
    id: 'regional-performance',
    title: 'Regional Performance Report',
    description: 'Geographic analysis of sales, orders, and customer distribution.',
    icon: Globe,
    lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    format: 'PDF',
  },
];

export function Reports() {
  const [generating, setGenerating] = useState(null);

  const handleGenerate = (reportId) => {
    setGenerating(reportId);
    // Simulate generation
    setTimeout(() => {
      setGenerating(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-500 mt-1">
          Generate and download detailed analytics reports
        </p>
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <report.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900">{report.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{report.description}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  Last generated: {format(report.lastGenerated, 'MMM d, yyyy')}
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded">
                  {report.format}
                </span>
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => handleGenerate(report.id)}
                isLoading={generating === report.id}
              >
                <Download className="w-4 h-4" />
                {generating === report.id ? 'Generating...' : 'Download Report'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">Scheduled Reports</h3>
            <p className="text-sm text-slate-500 mt-1">
              Set up automated report generation and delivery to your email.
            </p>
            <Button variant="secondary" className="mt-4">
              Configure Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Reports as default };
