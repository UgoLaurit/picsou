import { NextResponse } from 'next/server'
import { PrismaClient, TransactionType } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, type } = await request.json()

    const category = await prisma.category.create({
      data: {
        name,
        userId: '9c52d370-0851-4494-9f8b-63fdf67d3572', // TODO: Get from auth session
        type: type as TransactionType,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, type } = await request.json()

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        type: type as TransactionType,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}
