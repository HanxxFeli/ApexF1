// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  count?: number
}

// Database types based on actual schema

export interface Circuit {
  circuit_id: string
  name: string
  lat: number | null
  long: number | null
  locality: string | null
  country: string | null
}

export interface Constructor {
  constructor_id: string
  name: string
  nationality: string | null
}

export interface ConstructorStanding {
  season: number
  round: number
  constructor_id: string
  position: number | null
  points: number | null
  wins: number | null
}

export interface Driver {
  driver_id: string
  given_name: string
  family_name: string
  nationality: string | null
  dob: string | null
}

export interface DriverStanding {
  season: number
  round: number
  driver_id: string
  position: number | null
  points: number | null
  wins: number | null
}

export interface Qualifying {
  race_id: string
  driver_id: string
  constructor_id: string
  position: number | null
  q1: string | null
  q2: string | null
  q3: string | null
  season: number
  round: number
}

export interface Race {
  race_id: string
  season: number
  round: number
  race_name: string
  date: string
  circuit_id: string
}

export interface Result {
  race_id: string
  driver_id: string
  constructor_id: string
  grid: number | null
  position: string | null
  position_order: number | null
  points: number | null
  laps: number | null
  status: string | null
  season: number
  round: number
}

// Extended types with relations
export interface RaceWithCircuit extends Race {
  circuits?: Circuit
}

export interface ResultWithDetails extends Result {
  drivers?: Driver
  constructors?: Constructor
}

export interface QualifyingWithDetails extends Qualifying {
  drivers?: Driver
  constructors?: Constructor
}