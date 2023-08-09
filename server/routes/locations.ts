import express from 'express'

import * as db from '../db/index.ts'
import { getNodeText } from '@testing-library/dom'

const router = express.Router()

// GET /locations
router.get('/', async (req, res, next) => {
  // TODO: Replace this with all of the locations in the database
  try {
    const locationsarr = await db.getAllLocations()
    const viewData = {
      groupName: 'Locations',
      locations: locationsarr,
    }
    res.render('showLocations', viewData)
  } catch (err) {
    next(err)
  }

  // const locations = [
  //   {
  //     id: 1,
  //     name: 'TangleStage',
  //     description:
  //       'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Yella Yurt',
  //     description:
  //       "It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here! It's a freakin' yurt! Get in here!",
  //   },
  // ]
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)
  const location = await db.getLocationById(id)
  const viewData = { ...location }
  res.render('editLocation', viewData)
})
  // TODO: Get the location based on its id and replace this viewData
  // const viewData = {
  //   id: id,
  //   name: 'TangleStage',
  //   description:
  //     'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
  // }

 

// POST /locations/edit
router.post('/edit', async (req, res, next) => {
  // ASSISTANCE: So you know what's being posted ;)
   const { id, name, description } = req.body

  // TODO: Update the location in the database based on its id

  try {
    await db.updateLocation(id, name, description)
    res.redirect('/locations')
  }
catch (err) {
  next(err)
}
  
})

export default router
