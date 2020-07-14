import supertest from 'supertest'
import mysql from 'mysql2/promise'

import app from '../../app'

jest.mock('mysql2/promise')

describe('Given the `entries` endpoint', () => {
  const request = supertest(app)
  const id = '1'
  const values = {
    date: '14-01-1989',
    title: 'Test Title',
    summary: 'Test Summary',
    tags: 'tag1, tag2',
  }
  const execute = jest.fn()

  describe('and the `GET` route', () => {
    it('should listen to the route and return the correct response', async (done) => {
      const entries = [
        {
          id,
          ...values,
        },
      ]
      execute.mockResolvedValueOnce([entries])
      mysql.createPool.mockResolvedValueOnce({
        execute,
      })

      const response = await request.get('/entries')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(entries)

      done()
    })
  })

  describe('and the `POST` route', () => {
    it('should listen to the route and return the correct response', async (done) => {
      const entry = {
        id,
        ...values,
      }
      execute.mockResolvedValueOnce([{ insertId: id }])
      execute.mockResolvedValueOnce([[entry]])
      mysql.createPool.mockResolvedValueOnce({
        execute,
      })

      const response = await request.post('/entries').send(values)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(entry)

      done()
    })
  })
})
