type data = {
    meta: meta,
    results: results
  }

  type meta = {
    found: number,
    license: string,
    limit: number,
    name: string,
    page: number,
    website: URL,  
  }

  type results = [{
    city: null,
    coordinates: coordinates,
    country: string,
    date: date,
    entity: string,
    isAnalysis: boolean,
    isMobile: boolean,
    location: string,
    locationId: number,
    parameter: string,
    sensorType: string,
    unit: string,
    value: number
  }]

  type coordinates = {
    latitude: number,
    longitute: number
  }

  type date = {
    utc: date,
    local: date
  }

  type countries = {
    cities: number,
    code: string,
    count: number,
    firstUpdated: date,
    localUpdated: date,
    locations: number,
    name: string,
    parameters: parameters,
    sources: number
  }

  type parameters = [
   string
  ]