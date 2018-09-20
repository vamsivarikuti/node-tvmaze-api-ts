"use strict";
const request = require("request");
const apiEndpoint = 'https://api.tvmaze.com';
class Common {
    static apiQuery(url) {
        return new Promise((resolve, reject) => {
            request.get(`${apiEndpoint}${url}`, { json: true }, (err, response) => {
                if (err)
                    return reject(err);
                resolve(response.body);
            });
        });
    }
}
class Search {
    shows(query) {
        return Common.apiQuery(`/search/shows?q=${query}`);
    }
    people(query) {
        return Common.apiQuery(`/search/people?q=${query}`);
    }
}
class SingleSearch {
    shows(query) {
        return Common.apiQuery(`/singlesearch/shows?q=${query}`);
    }
}
class Lookup {
    constructor() {
        this.shows = class {
            static imdb(imdbId) {
                return Common.apiQuery(`/lookup/shows?imdb=${imdbId}`);
            }
            static thetvdb(thetvdbId) {
                return Common.apiQuery(`/lookup/shows?thetvdb=${thetvdbId}`);
            }
            static tvrage(tvrageId) {
                return Common.apiQuery(`/lookup/shows?tvrage=${tvrageId}`);
            }
            static tvmaze(tvmazeId) {
                return Common.apiQuery(`/shows/${tvmazeId}`);
            }
        };
    }
}
class Shows {
    get(id, embeded) {
        let queryString = `/shows/${id}`;
        if (embeded) {
            if (typeof embeded === typeof []) {
                queryString += '?';
                embeded = embeded;
                embeded.forEach(embed => {
                    queryString += `embed[]=${embed}&`;
                });
            }
            else {
                queryString += `?embed=${embeded}`;
            }
        }
        return Common.apiQuery(queryString);
    }
    episodes(id, specials) {
        let queryString = `shows/${id}/episodes`;
        if (specials)
            queryString += '?specials=1';
        return Common.apiQuery(queryString);
    }
    episodebynumber(id, season, episode) {
        return Common.apiQuery(`/shows/${id}/episodebynumber?season=${season}&number=${episode}`);
    }
    episodesbydate(id, date) {
        return Common.apiQuery(`/shows/${id}/episodesbydate?date=${date}`);
    }
    seasons(id) {
        return Common.apiQuery(`/shows/${id}/seasons`);
    }
    seasonEpisodes(seasonId) {
        return Common.apiQuery(`/seasons/${seasonId}/episodes`);
    }
    cast(id) {
        return Common.apiQuery(`/shows/${id}/cast`);
    }
    crew(id) {
        return Common.apiQuery(`/shows/${id}/crew`);
    }
    akas(id) {
        return Common.apiQuery(`/shows/${id}/akas`);
    }
    page(page) {
        return Common.apiQuery(`/shows?page=${page || ''}`);
    }
    updates() {
        return Common.apiQuery(`/updates/shows`);
    }
}
class People {
    get(id) {
        return Common.apiQuery(`/people/${id}`);
    }
    castCredits(id) {
        return Common.apiQuery(`/people/${id}/castcredits`);
    }
    crewCredits(id) {
        return Common.apiQuery(`/people/${id}/crewcredits`);
    }
}
class TvMaze {
    constructor() {
        this.search = new Search();
        this.singleSearch = new SingleSearch();
        this.lookup = new Lookup();
        this.shows = new Shows();
        this.people = new People();
    }
    schedule(country, date) {
        let queryString = '/schedule?';
        if (country)
            queryString += `country=${country}&`;
        if (country)
            queryString += `date=${date}`;
        return Common.apiQuery(queryString);
    }
    fullSchedule() {
        return Common.apiQuery('/schedule/full');
    }
}
module.exports = new TvMaze();
