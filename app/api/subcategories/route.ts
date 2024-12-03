import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async () => {
  const subcategories = await prisma.subcategory.findMany({
    include: {
      category: true,
      goals: true,
    },
  })
  return NextResponse.json(subcategories)
}

export const POST = async (req: Request) => {
  const { name, categoryId } = await req.json()

  try {
    const subcategory = await prisma.subcategory.create({
      data: {
        name,
        userId: '9c52d370-0851-4494-9f8b-63fdf67d3572', // TODO: Get from auth session
        categoryId,
      },
      include: {
        category: true,
        goals: true,
      },
    })
    return NextResponse.json(subcategory)
  } catch (error) {
    console.error('Failed to create subcategory:', error)
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    )
  }
}
