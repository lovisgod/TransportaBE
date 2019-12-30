const rp = require('request-promise');
const dotEnv = require('dotenv');

dotEnv.config();

const getRoute = async (pickup, destination) => {
  try {
    const apiUrl = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json';
    const mode = 'fastest;car;traffic:disabled';
    const options = {
      method: 'GET',
      uri: `${apiUrl}`,
      qs: {
        apiKey: `${process.env.HERE_API_KEY}`,
        waypoint0: `geo!${pickup}`,
        waypoint1: `geo!${destination}`,
        mode,
      },
      json: true,
    };
    const data = await rp(options);
    console.log(data);
    if (data) return data.response.route[0].leg[0].maneuver;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

module.exports = {
  getRoute,
};
