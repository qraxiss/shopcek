import { Router } from 'express'
import { AuthController } from '../../controllers/user/auth'

export const authRouter = Router()

//Routes
authRouter.get('/check', AuthController.check)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.post('/register', AuthController.register)
