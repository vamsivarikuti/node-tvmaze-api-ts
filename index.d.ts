export interface IlookupShows {
  imdb: (imdbId: string) => Promise<any>
  thetvdb: (thetvdbId: string) => Promise<any>
  tvrage: (tvrageId: string) => Promise<any>
  tvmaze: (tvmazeId: string) => Promise<any>
}