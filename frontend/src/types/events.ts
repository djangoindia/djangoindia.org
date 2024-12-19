export type SponsorDetails = {
  name: string;
  type: string;
  logo: string;
  url: string;
  description: string;
};

export type Sponsor = {
  sponsor_details: SponsorDetails;
  tier: string;
};

export type Partner = {
  name: string;
  logo: string;
  website: string;
  description: string;
};

export type Volunteer = {
  photo: string;
  name: string;
  about: string | null;
  email: string;
  twitter: string | null;
  linkedin: string | null;
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  description: string;
  cover_image: string;
  venue: string;
  city: string;
  venue_map_link: string;
  start_date: string;
  end_date: string;
  registration_end_date: string;
  event_mode: string;
  seats_left: number;
  sponsors: Sponsor[];
  partners: Partner[];
  volunteers: Volunteer[];
};

export type EventsResponse = Event[];
