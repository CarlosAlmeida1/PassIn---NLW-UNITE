import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {},
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
        throw new Error('Attendee not found')
      }

      return reply.send({ attendee })
    },
  )
}