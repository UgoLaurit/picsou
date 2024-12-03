import {
  AccountType,
  GoalType,
  PrismaClient,
  TransactionType,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Clean up existing data if needed
    await prisma.$transaction([
      prisma.transaction.deleteMany(),
      prisma.recurringTransaction.deleteMany(),
      prisma.subcategoryGoal.deleteMany(),
      prisma.subcategory.deleteMany(),
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

    // Create default subcategories
    await prisma.subcategory.create({
      data: {
        userId: user.id,
        categoryId: incomeCategory.id,
        name: 'Salary',
      },
    })

    await prisma.subcategory.create({
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
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
