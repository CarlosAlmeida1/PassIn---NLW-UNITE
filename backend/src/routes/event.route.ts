import z from 'zod'
import { prisma } from '../db'
import { FastifyInstance } from 'fastify'

export async function eventRoute(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const createEventSchema = z.object({
      title: z.string().min(4),
      details: z.string().nullable(),
      maximumAtendees: z.number().int().positive().nullable(),
    })

    const data = createEventSchema.parse(req.body)

    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAtendees,
        slug: new Date().toISOString(),
      },
    })

    reply.status(201).send({ eventId: event.id })
  })
}
