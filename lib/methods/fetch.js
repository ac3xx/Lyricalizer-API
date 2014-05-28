module.exports.services = {};

services["MetroLyrics"] = new (require("../services/metrolyrics"));

module.exports.method = function (service, artist, song, callback) {
    if (!services[service])
        return callback(null);

    services[service].fetch(artist, song, function (err, lyrics) {
        if (err)
            return callback(null);

        return callback(lyrics);
    });
};
