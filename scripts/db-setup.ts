import {
  AccountType,
  GoalType,
  PrismaClient,
  TransactionType,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data if needed
  await prisma.$transaction([
    prisma.transaction.deleteMany(),
    prisma.recurringTransaction.deleteMany(),
    prisma.bucketGoal.deleteMany(),
    prisma.bucket.deleteMany(),
    prisma.category.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  })

  // Create default categories
  const incomeCategory = await prisma.category.create({
    data: {
      userId: user.id,
      name: 'Income',
      type: TransactionType.income,
    },
  })

  const expensesCategory = await prisma.category.create({
    data: {
      userId: user.id,
      name: 'Expenses',
      type: TransactionType.expense,
    },
  })

  // Create default accounts
  await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Main Checking',
      type: AccountType.checking,
      balance: 1000,
    },
  })

  await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Savings',
      type: AccountType.savings,
      balance: 5000,
    },
  })

  // Create default buckets
  await prisma.bucket.create({
    data: {
      userId: user.id,
      categoryId: incomeCategory.id,
      name: 'Salary',
    },
  })

  await prisma.bucket.create({
    data: {
      userId: user.id,
      categoryId: expensesCategory.id,
      name: 'Rent',
      goals: {
        create: {
          userId: user.id,
          amount: 1000,
          type: GoalType.required,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          isRecurring: true,
          recurrenceInterval: 'monthly',
        },
      },
    },
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })