import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Moon, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Moon },
  { id: 'language', label: 'Language & Region', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account preferences and dashboard settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1 bg-white rounded-lg border border-slate-200 p-2">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-slate-200">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
                  <p className="text-sm text-slate-500">
                    Update your personal information and profile details
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input type="email" defaultValue="john@company.com" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Job Title</label>
                    <Input defaultValue="Sales Manager" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={saving}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
                  <p className="text-sm text-slate-500">
                    Choose how you want to be notified
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Email notifications', checked: true },
                    { label: 'Daily summary reports', checked: true },
                    { label: 'Weekly analytics digest', checked: false },
                    { label: 'Push notifications', checked: true },
                    { label: 'Sales threshold alerts', checked: true },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={saving}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Appearance</h3>
                  <p className="text-sm text-slate-500">
                    Customize the look and feel of your dashboard
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Theme</label>
                    <Select defaultValue="light">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Dashboard Density</label>
                    <Select defaultValue="comfortable">
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={saving}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Language */}
            {activeTab === 'language' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Language & Region</h3>
                  <p className="text-sm text-slate-500">
                    Set your preferred language and regional format
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Language</label>
                    <Select defaultValue="en">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Currency</label>
                    <Select defaultValue="usd">
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Date Format</label>
                    <Select defaultValue="mdy">
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY/MM/DD</option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={saving}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Security</h3>
                  <p className="text-sm text-slate-500">
                    Manage your security settings and passwords
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Current Password</label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={saving}>
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Settings as default };
