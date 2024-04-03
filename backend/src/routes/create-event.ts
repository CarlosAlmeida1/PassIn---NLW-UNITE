import z from 'zod'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../lib/prisma'
import { FastifyInstance } from 'fastify'
import { generateSlug } from '../utils/generateSlug'

export async function createEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
          409: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { details, maximumAttendees, title } = req.body
      const slug = generateSlug(title)

      const eventWithSameSlug = await prisma.event.findFirst({
        where: {
          slug,
        },
      })

      if (eventWithSameSlug) {
        reply.status(409).send({
          error: 'Event with same title already exists',
        })
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
      })

      reply.status(201).send({ eventId: event.id })
    },
  )
}
