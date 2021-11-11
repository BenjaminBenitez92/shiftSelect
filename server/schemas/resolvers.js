const { AuthenticationError } = require('apollo-server-express');
const { User, Shift, Schedule, Hospital } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    hospitals: async () => {
      return await Hospital.find();
    },
    shifts: async (parent, { hospital, name }) => {
      const params = {};

      if (hospital) {
        params.hospital = hospital;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Shift.find(params).populate('hospital');
    },
    shift: async (parent, { _id }) => {
      return await Shift.findById(_id).populate('hospital');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'schedules.shift',
          populate: 'hospital'
        });

        user.schedules.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    schedule: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'schedules.shifts',
          populate: 'hospital'
        });

        return user.schedules.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ shifts: args.shifts });
    //   const line_items = [];

    //   const { shifts } = await order.populate('shifts').execPopulate();

    //   for (let i = 0; i < shifts.length; i++) {
    //     const shift = await stripe.shifts.create({
    //       name: shifts[i].name,
    //       description: shifts[i].description,
    //       images: [`${url}/images/${shifts[i].image}`]
    //     });

    //     const price = await stripe.prices.create({
    //       shift: shift.id,
    //       unit_amount: shift[i].price * 100,
    //       currency: 'usd',
    //     });

    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}/`
    //   });

    //   return { session: session.id };
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSchedule: async (parent, { shifts }, context) => {
      console.log(context);
      if (context.user) {
        const schedule = new Schedule({ shifts });

        await User.findByIdAndUpdate(context.user._id, { $push: { schedules: schedule } });

        return schedule;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateShift: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Shift.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
