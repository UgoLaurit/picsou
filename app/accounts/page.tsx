import PageTitle from '@/components/ui/page-title'
import { AccountsList } from './accounts-list'

export default function AccountsPage() {
  return (
    <div className="container mx-auto">
      <PageTitle title="Accounts" />
      <AccountsList />
    </div>
  )
}
