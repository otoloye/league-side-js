const League = require('../model/league.schema');

const normalizedLeagues = (totalBudget, arr) => {
  return arr.reduce((acc, next) => {
    if (!('leagues' in acc) && next.price < totalBudget) {
      acc['leagues'] = [next];
      acc['totalPrice'] = next.price;
    } else if (
      'leagues' in acc &&
      next.price + acc['totalPrice'] <= totalBudget
    ) {
      acc['leagues'] = acc['leagues'].concat([next]);
      acc['totalPrice'] = acc['totalPrice'] + next.price;
    }
    return acc;
  }, {});
};

module.exports = {
  addLeague(req, res) {
    let newLeague = new League(req.body);
    newLeague
      .save()
      .then(() =>
        res.send({
          message: 'League Added',
          newLeague
        })
      )
      .catch(err => {
        res.send({ message: 'Error occured', err });
      });
  },

  findLeague(req, res) {
    const { lng, lat, totalBudget, radius } = req.query;

    League.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: 'dist.calculated',
          maxDistance: Number(radius / 0.000621371),
          query: {},
          includeLocs: 'dist.location',
          spherical: true
        }
      },
      {
        $sort: {
          price: 1
        }
      }
    ]).then(sortedLeagues => {
      const { leagues } = normalizedLeagues(Number(totalBudget), sortedLeagues);

      return res.send({ message: 'Leagues Retrieved', leagues });
    });
  }
};
