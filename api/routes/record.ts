import { Router } from 'express'
import { RecordController } from '../controllers/record'

export const recordRouter = Router()

//Routes
recordRouter.post('/', RecordController.createRecord)
recordRouter.get('/', RecordController.getRecord)
recordRouter.put('/', RecordController.updateRecord)
recordRouter.delete('/', RecordController.deleteRecord)
