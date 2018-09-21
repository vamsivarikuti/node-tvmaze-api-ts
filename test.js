"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Mymaze extends _1.Tvmaze {
}
_1.tvmaze.scrape.episodeTrailer('https://www.tvmaze.com/episodes/1445227/silicon-valley-5x08-fifty-one-percent').then(console.log);
_1.tvmaze.search.shows('girls').then(result => {
    if (result[0].show) {
        console.log('👍 API::search::shows');
    }
    else {
        console.log('👎 API::search::shows');
        debugger;
    }
});
_1.tvmaze.search.people('lauren').then(result => {
    if (result[0].person) {
        console.log('👍 API::search::people');
    }
    else {
        console.log('👎 API::search::people');
        debugger;
    }
});
_1.tvmaze.singleSearch.shows('girls').then(result => {
    if (result.id) {
        console.log('👍 API::singleSearch::shows');
    }
    else {
        console.log('👎 API::singleSearch::shows');
        debugger;
    }
});
_1.tvmaze.lookup.imdb('tt0944947').then(result => {
    if (result.id) {
        console.log('👍 API::lookup::shows');
    }
    else {
        console.log('👎 API::lookup::shows');
        debugger;
    }
});
_1.tvmaze.fullSchedule().then(result => {
    if (result[0].id) {
        console.log('👍 API::fullSchedule');
    }
    else {
        console.log('👎 API::fullSchedule');
        debugger;
    }
});
_1.tvmaze.schedule('US', '2014-12-01').then(result => {
    if (result[0].id) {
        console.log('👍 API::schedule');
    }
    else {
        console.log('👎 API::schedule');
        debugger;
    }
});
_1.tvmaze.people.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::people');
    }
    else {
        console.log('👎 API::people');
        debugger;
    }
});
_1.tvmaze.shows.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::shows');
    }
    else {
        console.log('👎 API::shows');
        debugger;
    }
});
