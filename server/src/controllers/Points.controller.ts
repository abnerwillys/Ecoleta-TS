import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()))

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*")

    /* const serializedPoints = points.map((item) => {
      return {
        ...points,
        image_url: `http://192.168.1.70:3333/uploads/${item.image}`,
      }
    }) */

    return response.json(points)
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params 

      const point = await knex('points').where('id', id).first()

      if (!point) {
        return response.status(400).json({ message: 'Point not found' })
      }

      const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

      return response.json({ point, items })
    } catch (error) {
      console.error(error)
    }
  }

  async create (request: Request, response: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
      } = request.body
    
      const trx = await knex.transaction()
  
      const point = {
        image: 'https://images.unsplash.com/photo-1603807435612-a7913d23e774?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=60',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      }
    
      const insertedIds = await trx('points').insert(point)
    
      const point_id = insertedIds[0]
    
      const pointItems = items.map((item_id: number ) => ({
        item_id,
        point_id
      }))
    
      await trx('point_items').insert(pointItems)

      await trx.commit()
    
      return response.json({
        id: point_id,
        ...point,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default PointsController