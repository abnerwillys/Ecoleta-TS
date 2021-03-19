import express from 'express'
import ItemsController from './controllers/Items.controller'
import PointsController from './controllers/Points.controller'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController  = new ItemsController()

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes