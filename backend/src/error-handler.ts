import { FastifyInstance } from 'fastify'
import { BadRequest } from './_error/bad-request'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'error during validation',
      error: error.format(),
    })
  }

  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message })
  }
}
