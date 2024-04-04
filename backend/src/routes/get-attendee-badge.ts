import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'
import { BadRequest } from '../_error/bad-request'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:attendeeId/badge',
    {
      schema: {
        summary: 'Get an attendee badge',
        tags: ['attendee'],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkinUrl: z.string().url(),
            }),
          }),
        },
      },
    },
    async (req, reply) => {
      const { attendeeId } = req.params

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
        where: { id: attendeeId },
      })

      if (!attendee) {
        throw new BadRequest('Attendee not found')
      }

      const baseUrl = `${req.protocol}://${req.hostname}`

      const checkinUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

      return reply.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkinUrl: checkinUrl.toString(),
        },
      })
    },
  )
}
