import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items = await knex('items').select('*')
  
      const serializedItems = items.map(({id, title, image}) => ({
        id,
        title,
        image_url: `http://192.168.1.70:3333/uploads/${image}` 
      }))
      
      return response.json(serializedItems)
    } catch (error) {
      console.error(error)
    }
  }
}

export default ItemsController
