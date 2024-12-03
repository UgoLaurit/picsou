'use client'

import { PageTitle } from '@/components/ui/page-title'
import CategoriesSettings from './categories-settings'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageTitle>Settings</PageTitle>
      <CategoriesSettings />
    </div>
  )
}
