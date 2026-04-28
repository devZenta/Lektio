import { Hono } from 'hono'
import authRouter from './routes/authRoutes.js';
import healthRouter from './routes/healthRoutes.js';
import extractRouter from './routes/extractRoutes.js';
import { type AppVariables } from './types/context.types.js';
import withPrisma from './middlewares/prismaMiddleware.js';

const app = new Hono<{ Variables: AppVariables }>()

app.use('*', withPrisma)

app.route('/auth', authRouter)
app.route('/health', healthRouter)
app.route('/extract', extractRouter)

export default app