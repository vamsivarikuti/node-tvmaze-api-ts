import * as request from 'request'
import { Ishow, IshowSearch, Iepisode, Iseason, Icast, Icrew, Iaka, Iupdates, Iperson, Icastcredits, Icrewcredits } from 'index.d'

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
  public shows (query: string): Promise<IshowSearch[]> {
    return Common.apiQuery(`/search/shows?q=${query}`)
  }
  public people (query: string) {
    return Common.apiQuery(`/search/people?q=${query}`)
  }
}

class SingleSearch {
  public shows (query: string): Promise<Ishow> {
    return Common.apiQuery(`/singlesearch/shows?q=${query}`)
  }
}

class Lookup {
  public imdb (imdbId: string): Promise<Ishow> {
    return Common.apiQuery(`/lookup/shows?imdb=${imdbId}`)
  }
  public thetvdb (thetvdbId: string): Promise<Ishow> {
    return Common.apiQuery(`/lookup/shows?thetvdb=${thetvdbId}`)
  }
  public tvrage (tvrageId: string): Promise<Ishow> {
    return Common.apiQuery(`/lookup/shows?tvrage=${tvrageId}`)
  }
  public tvmaze (tvmazeId: string): Promise<Ishow> {
    return Common.apiQuery(`/shows/${tvmazeId}`)
  }
}

class Shows {
  public get (id: string, embeded?: string | string[]): Promise<Ishow> {
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

  public episodes (id: string, specials?: boolean): Promise<Iepisode[]> {
    let queryString = `shows/${id}/episodes`
    if (specials) queryString += '?specials=1'
    return Common.apiQuery(queryString)
  }

  public episodebynumber (id: string, season: string, episode: string): Promise<Iepisode> {
    return Common.apiQuery(`/shows/${id}/episodebynumber?season=${season}&number=${episode}`)
  }

  public episodesbydate (id: string, date: string): Promise<Iepisode> {
    return Common.apiQuery(`/shows/${id}/episodesbydate?date=${date}`)
  }

  public seasons (id: string): Promise<Iseason[]> {
    return Common.apiQuery(`/shows/${id}/seasons`)
  }

  public seasonEpisodes (seasonId: string): Promise<Iepisode[]> {
    return Common.apiQuery(`/seasons/${seasonId}/episodes`)
  }

  public cast (id: string): Promise<Icast[]> {
    return Common.apiQuery(`/shows/${id}/cast`)
  }

  public crew (id: string): Promise<Icrew[]> {
    return Common.apiQuery(`/shows/${id}/crew`)
  }

  public akas (id: string): Promise<Iaka[]> {
    return Common.apiQuery(`/shows/${id}/akas`)
  }

  public page (page?: string): Promise<Ishow[]> {
    return Common.apiQuery(`/shows?page=${page || ''}`)
  }

  public updates (): Promise<Iupdates> {
    return Common.apiQuery(`/updates/shows`)
  }
}

class People {
  public get (id: string, embeded?: string | string[]): Promise<Iperson> {
    let queryString = `/people/${id}`
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

  public castCredits (id: string, embeded?: string | string[]): Promise<Icastcredits[]> {
    let queryString = `/people/${id}/castcredits`
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

  public crewCredits (id: string, embeded?: string | string[]): Promise<Icrewcredits[]> {
    let queryString = `/people/${id}/crewcredits`
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
}

export class Tvmaze {
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

export const tvmaze = new Tvmaze()
