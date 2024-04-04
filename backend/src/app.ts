import fastify from 'fastify'
import { createEventRoute } from './routes/create-event'
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import { registerForEventRoute } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { checkInRoute } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEventRoute, { prefix: '/events' })
app.register(registerForEventRoute, { prefix: '/events' })
app.register(getEvent, { prefix: '/events' })
app.register(getEventAttendees, { prefix: '/events' })
app.register(getAttendeeBadge, { prefix: '/attendees' })
app.register(checkInRoute, { prefix: '/attendees' })
