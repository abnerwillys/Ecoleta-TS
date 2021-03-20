import express from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import ItemsController from './controllers/Items.controller'
import PointsController from './controllers/Points.controller'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsController = new PointsController()
const itemsController  = new ItemsController()

routes.get('/items', itemsController.index)

routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post('/points', upload.single('image'), pointsController.create)

export default routes