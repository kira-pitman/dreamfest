import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const db = knex.default(config)

export async function getAllLocations(): Promise<Location[]> {
  // TODO: use knex to get the real location data from the database
  try {
    return db('locations').select()
  } catch (err: any) {
    return err.message
  }
}

// TODO: write some more database functions
