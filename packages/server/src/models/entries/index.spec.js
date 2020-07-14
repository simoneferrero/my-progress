import EntriesModel from './'

describe('Given the `entries` model', () => {
  const id = '1'
  const values = {
    date: '14-01-1989',
    title: 'Test Title',
    summary: 'Test Summary',
    tags: 'tag1, tag2',
  }

  ;[
    {
      method: 'getAll',
      result: EntriesModel.getAll(),
      expectedResult: 'SELECT * FROM entries',
    },
    {
      method: 'get',
      result: EntriesModel.get(id),
      expectedResult: "SELECT * FROM entries WHERE id = '1'",
    },
    {
      method: 'post',
      result: EntriesModel.post(values),
      expectedResult:
        "INSERT INTO entries (date, title, summary, tags) VALUES ('14-01-1989', 'Test Title', 'Test Summary', 'tag1, tag2')",
    },
  ].forEach(({ method, result, expectedResult }) => {
    describe(`and the \`${method}\` method`, () => {
      it('should return the correct SQL', () => {
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
