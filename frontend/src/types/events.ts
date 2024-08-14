export type Event = {
  id: string
  name: string
  description: string
  cover_image: string
  venue: string
  city: string
  venue_map_link: string
  date_time: string
}

export type EventsResponse = Event[]
