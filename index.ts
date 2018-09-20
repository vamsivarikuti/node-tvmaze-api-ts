import * as request from 'request'
import { IlookupShows } from 'index.d'

const apiEndpoint = 'https://api.tvmaze.com'

class Common {
  public static apiQuery (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      request.get(`${apiEndpoint}${url}`, { json: true }, (err, response) => {
        if (err) return reject(err)
        resolve(response.body)
      })
    })
  }
}

class Search {
  public shows (query: string) {
    return Common.apiQuery(`/search/shows?q=${query}`)
  }
  public people (query: string) {
    return Common.apiQuery(`/search/people?q=${query}`)
  }
}

class SingleSearch {
  public shows (query: string) {
    return Common.apiQuery(`/singlesearch/shows?q=${query}`)
  }
}

class Lookup {
  public shows: IlookupShows = class {
    public static imdb (imdbId: string) {
      return Common.apiQuery(`/lookup/shows?imdb=${imdbId}`)
    }
    public static thetvdb (thetvdbId: string) {
      return Common.apiQuery(`/lookup/shows?thetvdb=${thetvdbId}`)
    }
    public static tvrage (tvrageId: string) {
      return Common.apiQuery(`/lookup/shows?tvrage=${tvrageId}`)
    }
    public static tvmaze (tvmazeId: string) {
      return Common.apiQuery(`/shows/${tvmazeId}`)
    }
  }
}

class Shows {
  public get (id: string, embeded?: string | string[]) {
    let queryString = `/shows/${id}`
    if (embeded) {
      if (typeof embeded === typeof []) {
        queryString += '?'
        embeded = embeded as string[]
        embeded.forEach(embed => {
          queryString += `embed[]=${embed}&`
        })
      } else {
        queryString += `?embed=${embeded}`
      }
    }
    return Common.apiQuery(queryString)
  }

  public episodes (id: string, specials?: boolean) {
    let queryString = `shows/${id}/episodes`
    if (specials) queryString += '?specials=1'
    return Common.apiQuery(queryString)
  }

  public episodebynumber (id: string, season: string, episode: string) {
    return Common.apiQuery(`/shows/${id}/episodebynumber?season=${season}&number=${episode}`)
  }

  public episodesbydate (id: string, date: string) {
    return Common.apiQuery(`/shows/${id}/episodesbydate?date=${date}`)
  }

  public seasons (id: string) {
    return Common.apiQuery(`/shows/${id}/seasons`)
  }

  public seasonEpisodes (seasonId: string) {
    return Common.apiQuery(`/seasons/${seasonId}/episodes`)
  }

  public cast (id: string) {
    return Common.apiQuery(`/shows/${id}/cast`)
  }

  public crew (id: string) {
    return Common.apiQuery(`/shows/${id}/crew`)
  }

  public akas (id: string) {
    return Common.apiQuery(`/shows/${id}/akas`)
  }

  public page (page?: string) {
    return Common.apiQuery(`/shows?page=${page || ''}`)
  }

  public updates () {
    return Common.apiQuery(`/updates/shows`)
  }
}

class People {
  public get (id: string) {
    return Common.apiQuery(`/people/${id}`)
  }

  public castCredits (id: string) {
    return Common.apiQuery(`/people/${id}/castcredits`)
  }

  public crewCredits (id: string) {
    return Common.apiQuery(`/people/${id}/crewcredits`)
  }
}

class TvMaze {
  public search = new Search()
  public singleSearch = new SingleSearch()
  public lookup = new Lookup()
  public shows = new Shows()
  public people = new People()

  public schedule (country?: string, date?: string) {
    let queryString = '/schedule?'
    if (country) queryString += `country=${country}&`
    if (country) queryString += `date=${date}`
    return Common.apiQuery(queryString)
  }

  public fullSchedule () {
    return Common.apiQuery('/schedule/full')
  }
}

const tvmaze = new TvMaze()
export = tvmaze
