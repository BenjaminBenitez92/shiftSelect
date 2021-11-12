const db = require('./connection');
const { User, Shift, Hospital } = require('../models');
db.once('open', async () => {
  await Hospital.deleteMany();
  const hospitals = await Hospital.insertMany([
    { name: 'Bethsholom' },
    { name: 'Henrico Health and Rehab' },
    { name: 'MCV Hospitial' },
    { name: 'BonView' },
    { name: 'Our Lady of Hope' }
  ]);
  console.log('hospitals seeded');
  await Shift.deleteMany();
  const shifts = await Shift.insertMany([
    {
      name: 'Evening 3p-11a',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '8.00',
      hospital: hospitals[0]._id,
      shiftDate: '11/15/2021',
      quantity: 4
    },
    {
      name: 'Night 7p-7a',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[0]._id,
      shiftDate: '04/12/2021',
      quantity: 4
    },
    {
      name: 'Morning 7a-3p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '8.00',
      hospital: hospitals[0]._id,
      shiftDate: '07/12/2021',
      quantity: 4
    },
    {
      name: 'Evening 3p-11p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '8.00',
      hospital: hospitals[1]._id,
      shiftDate: '10/31/2021',
      quantity: 1
    },
    {
      name: 'Morning 7a-3p',
      description:'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      hours: '8.00',
      hospital: hospitals[0]._id,
      shiftDate: '10/10/2021',
      quantity: 5
    },
    {
      name: 'Evening 3p-11p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '8.00',
      hospital: hospitals[2]._id,
      shiftDate: '10/12/2021',
      quantity: 4
    },
    {
      name: 'Da7 7a-7p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[2]._id,
      shiftDate: '10/01/2021',
      quantity: 4
    },
    {
      name: 'Night 7p-7a',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[3]._id,
      shiftDate: '10/12/2021',
      quantity: 3
    },
    {
      name: 'Day 7a-7p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[4]._id,
      shiftDate: '10/12/2021',
      quantity: 4
    },
    {
      name: 'Morning 7a-3p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '8.00',
      hospital: hospitals[4]._id,
      shiftDate: '08/11/2021',
      quantity: 4
    },
    {
      name: 'Night 7p-7a',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[4]._id,
      shiftDate: '01/12/2021',
      quantity: 4
    },
    {
      name: 'Day 7a-7p',
      description:'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      hours: '12.00',
      hospital: hospitals[0]._id,
      shiftDate: '12/6/2021',
      quantity: 4
    }
  ]);
  console.log('Shifts seeded');
  await User.deleteMany();
  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    schedules: [
      {
        shifts: [shifts[0]._id, shifts[0]._id, shifts[1]._id]
      }
    ]
  });
  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });
  console.log('users seeded');
  process.exit();
});
