const { apiResponse } = require("../helpers");
const Subscriber = require("../models/Subscriber");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return apiResponse(res, 400, false, "Email is required");
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return apiResponse(res, 400, false, "Email already subscribed");
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return apiResponse(res, 201, true, "Subscribed successfully", newSubscriber);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, false, "Subscription error");
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, "Subscribers fetched successfully", subscribers);
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, false, "Error fetching subscribers");
  }
};

module.exports = {
  subscribe,
  getAllSubscribers,
};
