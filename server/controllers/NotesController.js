import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { noteservice } from '../services/NotesService.js'

export class NotesController extends BaseController {
  constructor(){
    super("api/notes")
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
    .get('/:id', this.getOne)
    .post('', this.create)
    .put('/:id', this.edit)
    .delete('/:id', this.delete)
  }
  async getOne(req, res, next) {
    try {
      let data = await noteservice.getById(req.params.id)
      return res.send(data)
    } catch (error) { next(error) }
  }

async create(req, res, next) {
    try {
        req.body.creatorEmail = req.userInfo.email
        let data = await noteservice.create(req.body)
        return res.status(201).send(data)
    } catch (error) { next(error) }
}

async edit(req, res, next) {
    try {
        let data = await noteservice.edit(req.params.id, req.userInfo.email, req.body)
        return res.send(data)
    } catch (error) { next(error) }
}

async delete(req, res, next) {
    try {
        await noteservice.delete(req.params.id, req.userInfo.email)
        return res.send("Successfully deleted")
    } catch (error) { next(error) }
}

}