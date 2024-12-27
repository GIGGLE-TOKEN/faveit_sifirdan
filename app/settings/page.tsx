import { AccountSettings } from './components/account-settings'

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold mb-6 text-white dark:text-[#E7E9EA]">Settings</h1>
      <AccountSettings />
    </div>
  )
}

