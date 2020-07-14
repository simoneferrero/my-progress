import express from 'express'

import EntriesController from '../../controllers/entries'

const router = express.Router()

/* GET all entries */
router.get('/', EntriesController.getAll)

/* POST new entry */
router.post('/', EntriesController.post)

export default router
