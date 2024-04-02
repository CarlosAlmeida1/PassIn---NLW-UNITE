import fastify from 'fastify'
import { eventRoute } from './routes/event.route'

export const app = fastify()

app.register(eventRoute, { prefix: '/events' })
