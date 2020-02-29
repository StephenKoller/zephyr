// important note: 'center' tuple is [longitude, latitude], NOT [latitude, longitude]!
export type MapboxFeature = {
  bbox: number[]
  center: [number, number]
  context: [{}]
  geometry: { type: string; coordinates: number[] }
  id: string
  place_name: string
  place_type: string[]
  properties: { wikidata: string }
  relevance: number
  text: string
  type: 'MapboxFeature'
}

export type MapboxData = {
  features: MapboxFeature[]
}