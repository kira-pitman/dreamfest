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
export async function getEventsByDay(day: string): Promise<Location[]> {
  const result = await db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .select(
      'events.id',
      'events.day',
      'events.name as eventName',
      'events.time',
      'locations.name as locationName',
      'events.description'
    )
    .where('events.day', day)
  console.log('pumpkin', result)
  return result
}

export async function getLocationById(id: number): Promise<Location[]> {
  return db('locations').select().where({ id }).first()
}

export async function updateLocation(
  id: number,
  name: string,
  description: string
): Promise<Location[]> {
  const formattedLocationData = {
    id: id,
    name: name,
    description: description,
  }
  console.log(formattedLocationData)

  const result: unknown = await db('locations')
    .returning(['id', 'name', 'description'])
    .update({ ...formattedLocationData })
    .where('id', id)
  return result as Location[]
}

export async function addNewEvent(
  name: string,
  description: string,
  time: string,
  location_id: number
) {
  const result = await db('events')
    .returning(['location_id', 'day', 'time', 'name', 'description'])
    .insert(name, description, time, location_id)
  return result
}
