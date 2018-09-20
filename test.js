"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.default.search.shows('girls').then(result => {
    if (result[0].show) {
        console.log('👍 API::search::shows');
    }
    else {
        console.log('👎 API::search::shows');
        debugger;
    }
});
index_1.default.search.people('lauren').then(result => {
    if (result[0].person) {
        console.log('👍 API::search::people');
    }
    else {
        console.log('👎 API::search::people');
        debugger;
    }
});
index_1.default.singleSearch.shows('girls').then(result => {
    if (result.id) {
        console.log('👍 API::singleSearch::shows');
    }
    else {
        console.log('👎 API::singleSearch::shows');
        debugger;
    }
});
index_1.default.lookup.shows.imdb('tt0944947').then(result => {
    if (result.id) {
        console.log('👍 API::lookup::shows');
    }
    else {
        console.log('👎 API::lookup::shows');
        debugger;
    }
});
index_1.default.fullSchedule().then(result => {
    if (result[0].id) {
        console.log('👍 API::fullSchedule');
    }
    else {
        console.log('👎 API::fullSchedule');
        debugger;
    }
});
index_1.default.schedule('US', '2014-12-01').then(result => {
    if (result[0].id) {
        console.log('👍 API::schedule');
    }
    else {
        console.log('👎 API::schedule');
        debugger;
    }
});
index_1.default.people.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::people');
    }
    else {
        console.log('👎 API::people');
        debugger;
    }
});
index_1.default.shows.get('1').then(result => {
    if (result.id) {
        console.log('👍 API::shows');
    }
    else {
        console.log('👎 API::shows');
        debugger;
    }
});
