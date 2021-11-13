const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Hospital {
    _id: ID
    name: String
  }

  type Shift {
    _id: ID
    name: String
    description: String
    hours: Float
    shiftDate: String
    quantity: Int
    hospital: Hospital
  }

  type Schedule {
    _id: ID
    shifts: [Shift]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    schedules: [Schedule]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    hospitals: [Hospital]
    shifts(hospital: ID, name: String): [Shift]
    shift(_id: ID!): Shift
    user: User
    schedule(_id: ID!): Schedule
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSchedule(shifts: [ID]!): Schedule
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateShift(_id: ID!, quantity: Int!): Shift
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
