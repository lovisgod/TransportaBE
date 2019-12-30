import { Op } from 'sequelize';
import model from '../models';
import { SendRideMail } from '../services/emailsender';
import {
  generateErrorMessage, generateSuccessMessage, generateSuccessData, generateErrorData,
} from '../utils/messages';
import { getRoute } from '../utils/routing';

const { User, Ride } = model;

const RideController = {
  async createRide(req, res) {
    try {
      const {
        pickup, destination, price, distance, payment_method, trip_rounds, time,
      } = req.body;
      const {
        uuid, email, phone, name,
      } = req.userData;
      const ride = await Ride.create({
        user_uuid: uuid,
        pickup,
        destination,
        price,
        distance,
        payment_method,
        trip_rounds,
        time,
      });
      await SendRideMail(name, {
        email, price, phone, pickup, destination, payment_method, trip_rounds, time,
      });
      if (!ride) return res.status(500).send(generateErrorMessage('Error', 'Ride request was not successfully created'));
      return res.status(200).send(generateSuccessMessage('Success', 'Ride request successfully created'));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorMessage('Error', 'An error occured while creating the request'));
    }
  },
  async getRideDetails(req, res) {
    try {
      const { ride_id } = req.query;
      const { uuid } = req.userData;
      const { dataValues } = await Ride.findOne({
        where: { uuid: ride_id },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      if (!dataValues) return res.status(404).send(generateErrorData('Error', 'Ride details not found'));
      const driver = await User.findOne({
        where: { uuid: dataValues.driver_uuid },
        attributes: {
          exclude: ['uuid', 'password', 'createdAt', 'updatedAt'],
        },
      });
      const details = {
        ride: dataValues,
        user: req.userData,
        driver: driver ? driver.dataValues : {
          uuid: '',
          name: '',
          username: '',
          email: '',
          phone: '',
          facebook_id: '',
          google_id: '',
          verified: '',
          location: '',
          role: '',
          status: '',
        },
      };
      return res.status(200).send(generateSuccessData('Success', details));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorData('Error', 'Error fetching ride details'));
    }
  },
  async getUserRideList(req, res) {
    try {
      const { uuid } = req.userData;
      const rides = await Ride.findAll({
        where: {
          [Op.or]: [{ user_uuid: uuid }, { driver_uuid: uuid }],
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      return res.status(200).send(generateSuccessData('Success', rides));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorData('Error', 'Error while fetching ride requests'));
    }
  },

  // get routing between destinations
  async getRouting(req, res) {
    try {
      const {
        pickLng, pickLat, destLng, destLat,
      } = req.body;
      if (pickLat === '' || pickLng === '' || destLng === '' || destLat === '') {
        return res.status(500).send(generateErrorData('Error', 'Error while getting route between locations please check your input'));
      }
      const pickup = `${pickLat},${pickLng}`;
      const destination = `${destLat},${destLng}`;
      const points = await getRoute(pickup, destination);
      const coordinateArray = await points.map((data) => ({
        lat: data.position.latitude,
        lng: data.position.longitude,
      }));
      return res.status(200).send(generateSuccessData('Success', coordinateArray));
    } catch (e) {
      console.log(e);
      return res.status(500).send(generateErrorData('Error', 'Error while getting route between locations'));
    }
  },
};

export default RideController;
