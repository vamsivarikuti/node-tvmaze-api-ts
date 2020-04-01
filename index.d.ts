export interface Ischedule {
    time: string;
    days: string[];
}
export interface Iratring {
    average: number;
}
export interface Icountry {
    name: string;
    code: string;
    timezone: string;
}
export interface Inetwork {
    id: number;
    names: string;
    country: Icountry;
}
export interface Iexternals {
    tvrage: number;
    thetvdb: number;
    imdb: string;
}
export interface Iimage {
    medium: string;
    original: string;
}
export interface Iself {
    href: string;
}
export interface Ipreviousepisode extends Iself {
}
export interface IshowLink extends Iself {
}
export interface IcharacterLink extends Iself {
}
export interface I_links {
    self?: Iself;
    previousepisode?: Ipreviousepisode;
    show?: IshowLink;
    character?: IcharacterLink;
}
export interface I_embedded {
    show?: Ishow;
    seasons?: Iseason[];
    episodes?: Iepisode[];
    cast?: Icast[];
    castcredits?: Icastcredits[];
    crew?: Icrew[];
    crewcredits?: Icrewcredits[];
    akas?: Iaka[];
}
export interface Iaka {
    name: string;
    country: Icountry;
}
export interface Icrewcredits {
    type: string;
    _links: I_links;
}
export interface Icastcredits {
    _links: I_links;
}
export interface Iepisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: Iimage;
    summary: string;
    _links: I_links;
}
export interface Iseason {
    id: number;
    url: string;
    number: number;
    name: string;
    episodeOrder: number;
    premiereDate: string;
    endDate: string;
    network: Inetwork;
    webChannel: string | null;
    image: Iimage;
    summary: string;
    _links: I_links;
}
export interface Iupdates {
    [key: number]: number;
}
export interface Iperson {
    id: number;
    url: string;
    country: Icountry;
    birtday: string;
    deathday: string | null;
    image: Iimage;
    _links: I_links;
}
export interface Icharacter {
    id: number;
    url: string;
    name: string;
    image: Iimage;
    _links: I_links;
}
export interface Icast {
    person: Iperson;
    character: Icharacter;
    self: boolean;
    voice: boolean;
}
export interface Icrew {
    type: string;
    person: Iperson;
}
export interface Ishow {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    premiered: string;
    officialSite: string;
    schedule: Ischedule;
    ratring: Iratring;
    weight: number;
    netwoek: Inetwork;
    webChannel: string | null;
    externals: Iexternals;
    image: Iimage;
    summary: string;
    updated: number;
    _links: I_links;
    _embedded: I_embedded;
}
export interface IshowSearch {
    score: number;
    show: Ishow;
}
declare class Search {
    shows(query: string): Promise<IshowSearch[]>;
    people(query: string): Promise<{}>;
}
declare class SingleSearch {
    shows(query: string): Promise<Ishow>;
}
declare class Lookup {
    imdb(imdbId: string): Promise<Ishow>;
    thetvdb(thetvdbId: string): Promise<Ishow>;
    tvrage(tvrageId: string): Promise<Ishow>;
    tvmaze(tvmazeId: string): Promise<Ishow>;
}
declare class Shows {
    get(id: string, embeded?: string | string[]): Promise<Ishow>;
    episodes(id: string, specials?: boolean): Promise<Iepisode[]>;
    episodebynumber(id: string, season: string, episode: string): Promise<Iepisode>;
    episodesbydate(id: string, date: string): Promise<Iepisode>;
    seasons(id: string): Promise<Iseason[]>;
    seasonEpisodes(seasonId: string): Promise<Iepisode[]>;
    cast(id: string): Promise<Icast[]>;
    crew(id: string): Promise<Icrew[]>;
    akas(id: string): Promise<Iaka[]>;
    page(page?: string): Promise<Ishow[]>;
    updates(): Promise<Iupdates>;
}
declare class People {
    get(id: string, embeded?: string | string[]): Promise<Iperson>;
    castCredits(id: string, embeded?: string | string[]): Promise<Icastcredits[]>;
    crewCredits(id: string, embeded?: string | string[]): Promise<Icrewcredits[]>;
}
declare class Scrape {
    episodeTrailer(episodeUrl: string): Promise<string>;
}
export declare class Tvmaze {
    search: Search;
    singleSearch: SingleSearch;
    lookup: Lookup;
    shows: Shows;
    people: People;
    scrape: Scrape;
    schedule(country?: string, date?: string): Promise<{}>;
    fullSchedule(): Promise<{}>;
}
export declare const tvmaze: Tvmaze;
export {};
