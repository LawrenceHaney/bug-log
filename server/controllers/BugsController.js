import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor(){
    super("api/bugs")
    this.router
    .use(auth0provider.getAuthorizedUserInfo)
    .get('', this.getAll)
    .get('/:id', this.getOne)
    .get('/:id/notes', this.getNotes)
    .post('', this.create)
    .put('/:id', this.edit)
    .delete('/:id', this.delete)
  }
  async getNotes(req, res, next) {
    let data = await bugService.getNotes(req.params.id)
      return res.send(data)
  }
  async getOne(req, res, next) {
    try {
      let data = await bugService.getById(req.params.id)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll()
      return res.send(data)
    }
    catch (err) { next(err) }
  }

async create(req, res, next) {
    try {
        req.body.creatorEmail = req.userInfo.email
        let data = await bugService.create(req.body)
        return res.status(201).send(data)
    } catch (error) { next(error) }
}

async edit(req, res, next) {
    try {
        let data = await bugService.edit(req.params.id, req.userInfo.email, req.body)
        return res.send(data)
    } catch (error) { next(error) }
}

async delete(req, res, next) {
    try {
        await bugService.delete(req.params.id, req.userInfo.email)
        return res.send("Successfully deleted")
    } catch (error) { next(error) }
}

}