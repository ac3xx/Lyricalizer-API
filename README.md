# Lyricalizer API
> Lyric-fetching API service for [Lyricalizer](https://github.com/ac3xx/Lyricalizer)

This is a HTTP API used by [Lyricalizer](https://github.com/ac3xx/Lyricalizer) to retrieve lyrics and song information from various websites.

Currently, the API supports the following services:

* MetroLyrics

## Installation

Make sure you have git, Node.js and npm installed.

* Clone this repository (`git clone https://github.com/ac3xx/Lyricalizer-API`).
* `cd Lyricalizer-API`
* `npm install`
* Edit the values in `config.json` for host/port and caching, according to <https://github.com/spumko/catbox#client>. Make sure to install the caching module, e.g. for redis, `npm install catbox-redis`.
* `npm start`
