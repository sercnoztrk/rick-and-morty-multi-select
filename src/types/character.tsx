interface Info {
    count: number,
    pages: number,
    next: string,
    prev: string | null
}

interface Origin {
    name: string,
    url: string
}

interface Location {
    name: string,
    url: string
}

interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: Origin,
    location: Location,
    image: string,
    episode: string[],
    url: string,
    created: string
}

interface Data {
    info: Info,
    results: Character[]
}