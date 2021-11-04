const {gql} = require('apollo-server-express')
const { typeDefs } = require('.')
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book] 
}
type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
}
type Auth{
    token: ID!
    user: User
}
input BookInput{
    bookId: String!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
}
type queary{
    me: User
}
type mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String!, title: String!, description: String!, authors: [String], image: String, link: String): User
    removeBook(bookId: String!): User
}

`
module.exports = typeDefs;