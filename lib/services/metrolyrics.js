var cheerio = require("cheerio");
var request = require("request");

module.exports = function MetroLyrics () {
    var utilities = {};

    utilities.generateUrl = function (artist, song) {
        var result = "";
        var part = song + " lyrics " + artist;

        result += "http://metrolyrics.com/";
        result += part.toLowerCase().replace(/\s/g, "-").replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, "");
        result += ".html";

        return result;
    };

    utilities.toJson = function (artist, song, $) {
        var result = {};

        result.artist = artist;
        result.song = song;

        var lyricsBody = $("#lyrics-body-text");
        if (lyricsBody.length === 0)
            return null;

        result.lyrics = $(".verse").text().split("\n");

        return result;
    };

    this.fetch = function (artist, song, callback) {
        var url = utilities.generateUrl(artist, song);

        request.get(url, function (err, res, body) {
            if (!err) {
                var dom = cheerio.load(body);
                var json = utilities.toJson(artist, song, dom);
                return callback(null, json);
            }
            return callback(err);
        });
    };
}
