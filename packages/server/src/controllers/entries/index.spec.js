import EntriesController from './'
import EntriesModel from '../../models/entries'

describe('Given the `entries` controller', () => {
  const id = '1'
  const values = {
    date: '1989-01-14',
    title: 'Test Title',
    summary: 'Test Summary',
    tags: 'tag1, tag2',
  }
  const execute = jest.fn()
  const send = jest.fn()
  const res = {
    locals: {
      pool: {
        execute,
      },
    },
    type: jest.fn(),
    status: jest.fn(() => ({
      send,
    })),
  }
  const next = jest.fn()

  describe('and the `getAll` method', () => {
    const req = {}

    it('should work correctly', async () => {
      const entries = [
        {
          ...values,
          id,
        },
      ]
      execute.mockResolvedValueOnce([entries])
      await EntriesController.getAll(req, res, next)

      expect(res.type).toHaveBeenCalledWith('application/json')
      expect(execute).toHaveBeenCalledWith(EntriesModel.getAll())
      expect(res.status).toHaveBeenCalledWith(200)
      expect(send).toHaveBeenCalledWith(JSON.stringify(entries))
    })

    describe('with an error', () => {
      it('should NOT break', async () => {
        execute.mockRejectedValue(new Error('Error message'))
        await EntriesController.getAll(req, res, next)

        const expectedErrorResponse = JSON.stringify({
          error: {
            message: 'Error message',
          },
        })

        expect(res.status).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expectedErrorResponse)
      })
    })
  })

  describe('and the `post` method', () => {
    const req = {
      body: values,
    }

    it('should work correctly', async () => {
      const entry = {
        ...values,
        id,
      }
      execute.mockResolvedValueOnce([{ insertId: id }])
      execute.mockResolvedValueOnce([[entry]])
      await EntriesController.post(req, res, next)

      expect(res.type).toHaveBeenCalledWith('application/json')
      expect(execute).toHaveBeenNthCalledWith(1, EntriesModel.post(values))
      expect(res.status).toHaveBeenCalledWith(200)
      expect(execute).toHaveBeenNthCalledWith(2, EntriesModel.get(id))
      expect(send).toHaveBeenCalledWith(JSON.stringify(entry))
    })

    describe('with an error', () => {
      it('should NOT break', async () => {
        execute.mockRejectedValue(new Error('Error message'))
        await EntriesController.post(req, res, next)

        const expectedErrorResponse = JSON.stringify({
          error: {
            message: 'Error message',
          },
        })

        expect(res.status).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(expectedErrorResponse)
      })
    })
  })
})
