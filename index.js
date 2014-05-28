var bristol = require("bristol");
var Hapi = require("hapi");
var Boom = require("boom");
var config = require("./config.json");
var Joi = require("joi");
var ml = require("./lib/services/metrolyrics");

// set up logging

bristol.addTarget("console").withFormatter("human");

// set up server

var server = new Hapi.Server((config.host || "0.0.0.0"), (config.port || 0), {
    cache: config.cache
});

// methods

server.method("fetch", require("./lib/methods/fetch").method);

// routes

server.route({
    path: "/metrolyrics/{artist}/{song}",
    method: "GET",
    handler: function (request, reply) {
        var artist = request.params.artist;
        var song = request.params.song;

        server.methods.fetch("MetroLyrics", artist, song, function (lyrics) {
            if (lyrics === null)
                return reply(Boom.notFound());

            return reply(lyrics);
        });
    }
});

// server-related logging

server.ext("onRequest", function (request, next) {
    if (request.path !== "/favicon.ico")
        bristol.info("New request received", {
            method: request.method.toUpperCase(),
            path: request.path
        });

    next();
});

server.start(function () {
    bristol.info("Server started", {uri: server.info.uri});
});
