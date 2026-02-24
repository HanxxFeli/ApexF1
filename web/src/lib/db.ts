import { supabase } from './supabase'

//drivers
export async function getDrivers() {
  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .order('surname')
  
  if (error) {
    console.error('Error fetching drivers:', error)
    return []
  }
  return data
}

export async function getDriver(id: number) {
  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .eq('driver_id', id)
    .single()
  
  if (error) {
    console.error('Error fetching driver:', error)
    return null
  }
  return data
}

//constructors
export async function getConstructors() {
  const { data, error } = await supabase
    .from('constructors')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching constructors:', error)
    return []
  }
  return data
}

export async function getConstructor(id: number) {
  const { data, error } = await supabase
    .from('constructors')
    .select('*')
    .eq('constructor_id', id)
    .single()
  
  if (error) {
    console.error('Error fetching constructor:', error)
    return null
  }
  return data
}

//races
export async function getRaces(year?: number) {
  let query = supabase
    .from('races')
    .select(`
      *,
      circuits (
        name,
        country
      )
    `)
    .order('date', { ascending: false })
  
  if (year) {
    query = query.eq('year', year)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching races:', error)
    return []
  }
  return data
}

export async function getRace(id: number) {
  const { data, error } = await supabase
    .from('races')
    .select(`
      *,
      circuits (
        name,
        location,
        country
      )
    `)
    .eq('race_id', id)
    .single()
  
  if (error) {
    console.error('Error fetching race:', error)
    return null
  }
  return data
}

//results
export async function getRaceResults(raceId: number) {
  const { data, error } = await supabase
    .from('results')
    .select(`
      *,
      drivers (
        forename,
        surname,
        code
      ),
      constructors (
        name
      )
    `)
    .eq('race_id', raceId)
    .order('position_order')
  
  if (error) {
    console.error('Error fetching race results:', error)
    return []
  }
  return data
}


// test connection
export async function testConnection() {
  try {
    const { error } = await supabase
      .from('circuits')
      .select('count')
      .limit(1)
    
    if (error) throw error
    return { success: true, message: 'connected!' }
  } catch (error: any) {
    return { success: false, message: `connection failed: ${error.message}` }
  }
}