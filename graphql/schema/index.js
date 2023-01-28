const {buildSchema} = require('graphql')

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type Event {
    _id:ID!
    score:String!
    date: String!
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String!
    code:String!
    lastName: String!
    firstName: String!
    role: [String!]!
    creatEvents:[Event!]
}

input EventInput {
    title: String!
    description: String!
    score: String!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input UserInput {
    email: String!
    password: String!
    lastName: String!
    firstName: String!
    role: [String!]!
}

type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings : [Booking!]
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createEvent(eventIput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!) : Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)