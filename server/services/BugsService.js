import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugService {
  async getAll(query={}) {
    let data = await dbContext.Bugs.find(query);
    return data
    
  }

  async getById(id) {
    let data = await dbContext.Bugs.findOne({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }
  async getNotes(id) {
    return await dbContext.Notes.find({ bug: id }).populate("creator", "name picture")
  }

  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    update.closedDate = Date.now()
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async delete(id, userEmail, update){
    let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, {closed: true, closedDate: Date.now() }, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data
  }

}

export const bugService = new BugService()