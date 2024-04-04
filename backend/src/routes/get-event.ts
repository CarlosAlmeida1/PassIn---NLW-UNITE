import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'
import { BadRequest } from '../_error/bad-request'

export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:eventId',
    {
      schema: {
        summary: 'Get an event',
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              details: z.string().nullable(),
              slug: z.string(),
              maximumAttendees: z.number().int().nullable(),
              attendees: z.number().int(),
              attendesAmount: z.number().int(),
            }),
          }),
          404: z.string(),
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params

      const event = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
        where: { id: eventId },
      })

      if (!event) {
        throw new BadRequest('Event not found')
      }

      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          details: event.details,
          slug: event.slug,
          maximumAttendees: event.maximumAttendees,
          attendees: event._count.attendees,
          attendesAmount: event._count.attendees,
        },
      })
    },
  )
}
