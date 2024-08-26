export interface Event {
  id: string
  name: string
  description: string
  cover_image: string
  venue: string
  city: string
  venue_map_link: string
  event_start_date: string
  event_end_date: string
  registration_end_date: string
  event_mode: string
}

export type EventsResponse = Event[]
