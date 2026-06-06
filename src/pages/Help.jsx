import { useState } from 'react';
import { HelpCircle, Search, ChevronDown, Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I filter data by date range?',
    answer: 'Use the date picker in the top bar or open the filter panel to select a custom date range. You can choose from preset ranges or enter specific start and end dates.',
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes! Click the Export button in the top bar to download your data as a CSV file. You can export filtered data or the complete dataset depending on your current view.',
  },
  {
    question: 'How are the AI insights generated?',
    answer: 'Our AI analyzes your sales data to identify trends, anomalies, and opportunities. Insights are updated automatically as new data becomes available.',
  },
  {
    question: 'What currencies are supported?',
    answer: 'The dashboard currently supports USD, EUR, GBP, and JPY. You can change your preferred currency in the Settings page.',
  },
  {
    question: 'How often is the data refreshed?',
    answer: 'Dashboard data is refreshed in real-time. Charts and tables automatically update to reflect the latest available information.',
  },
];

const resources = [
  {
    title: 'Documentation',
    description: 'Complete guide to using the dashboard',
    icon: Book,
    href: '#',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users and share tips',
    icon: MessageCircle,
    href: '#',
  },
  {
    title: 'Email Support',
    description: 'Get help from our support team',
    icon: Mail,
    href: 'mailto:support@company.com',
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-slate-900">{faq.question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export function Help() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
        <p className="text-slate-500 mt-1">
          Find answers and get support for the dashboard
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="search"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 text-lg"
        />
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.href}
            className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
              <resource.icon className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-medium text-slate-900">{resource.title}</h3>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{resource.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-slate-400 mt-1">
                Try a different search term or contact support
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact card */}
      <div className="bg-primary-50 rounded-lg border border-primary-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-primary-900">Still need help?</h3>
            <p className="text-sm text-primary-700 mt-1">
              Our support team is available to assist you with any questions
            </p>
          </div>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
}

export { Help as default };
