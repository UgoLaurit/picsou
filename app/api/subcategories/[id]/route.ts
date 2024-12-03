import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

interface RouteParams {
  params: {
    id: string
  }
}

export const PUT = auth(async (req, { params: { id } }: RouteParams) => {
  const data = await req.json()
  const subcategory = await prisma.subcategory.update({
    where: {
      id,
      userId: req.auth.userId,
    },
    data,
    include: {
      category: true,
      goals: true,
    },
  })
  return NextResponse.json(subcategory)
})

export const DELETE = auth(async (req, { params: { id } }: RouteParams) => {
  await prisma.subcategory.delete({
    where: {
      id,
      userId: req.auth.userId,
    },
  })
  return new NextResponse(null, { status: 204 })
})
