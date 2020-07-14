import EntriesModel from '../../models/entries'

class EntriesController {
  static async getAll(req, res, next) {
    try {
      res.type('application/json')

      const getAllEntries = EntriesModel.getAll()
      const [entries] = await res.locals.pool.execute(getAllEntries)

      res.status(200).send(JSON.stringify(entries))
    } catch ({ message }) {
      const response = {
        error: {
          message,
        },
      }
      next(JSON.stringify(response))
    }
  }

  static async post(req, res, next) {
    try {
      res.type('application/json')

      const { date, title, summary, tags } = req.body

      const postEntry = EntriesModel.post({ date, title, summary, tags })
      const [{ insertId }] = await res.locals.pool.execute(postEntry)

      const getEntry = EntriesModel.get(insertId)
      const [[newEntry]] = await res.locals.pool.execute(getEntry)

      res.status(200).send(JSON.stringify(newEntry))
    } catch ({ message }) {
      const response = {
        error: {
          message,
        },
      }
      next(JSON.stringify(response))
    }
  }
}

export default EntriesController
