require('dotenv').config()
module.exports = {
  env: {
    MAPBOX_KEY: process.env.MAPBOX_KEY,
    NASA_KEY: process.env.NASA_KEY,
    DARKSKY_KEY: process.env.DARKSKY_KEY,
  },
}
