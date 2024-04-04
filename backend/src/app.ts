import fastify from 'fastify'
import { createEventRoute } from './routes/create-event'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { registerForEventRoute } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { checkInRoute } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { errorHandler } from './error-handler'

export const app = fastify()

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Pass In',
      description: 'API para gerenciamento de eventos',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEventRoute, { prefix: '/events' })
app.register(registerForEventRoute, { prefix: '/events' })
app.register(getEvent, { prefix: '/events' })
app.register(getEventAttendees, { prefix: '/events' })
app.register(getAttendeeBadge, { prefix: '/attendees' })
app.register(checkInRoute, { prefix: '/attendees' })

app.setErrorHandler(errorHandler)
