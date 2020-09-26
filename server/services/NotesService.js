import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class NoteService {
  async getById(id) {
    let data = await dbContext.Notes.findOne({ _id: id})
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Notes.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Can't let you do that" + userEmail);
    }
  }

}

export const noteservice = new NoteService()