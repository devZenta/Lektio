import { Hono } from 'hono'
import auth from '../lib/auth.js';

const router = new Hono({
    strict: false,
})

router.on(['POST', 'GET'], '/*', async (c) => {
    return auth.handler(c.req.raw)
})

export default router