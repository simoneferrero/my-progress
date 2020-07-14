import sql from 'sql-bricks'

const ENTRIES = 'entries'

class EntriesModel {
  static getAll() {
    return sql.select().from(ENTRIES).toString()
  }

  static get(id) {
    return sql.select().from(ENTRIES).where({ id }).toString()
  }

  static post(values) {
    return sql.insert(ENTRIES, values).toString()
  }
}

export default EntriesModel
