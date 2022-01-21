const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Challenge List:
// https://github.com/Tech-at-DU/ACS-4390-Query-Languages/blob/master/Lessons/Lesson-2.md

const SongList = [
  { name: 'Rain is Falling', artist: 'ELO', album: 'Time', songId: 1 },
  { name: 'Buildings Have Eyes', artist: 'ELO', ablum: 'Secret Messages', songId: 2 },
  { name: 'Dont Bring Me Down', artist: 'ELO', ablum: 'Discovery', songId: 3 },
  { name: 'Turn to Stone', artist: 'ELO', ablum: 'Out of the Blue', songId: 4 },
]

// Define the Schema
const schema = buildSchema(`
type About {
  message: String!
}

type Query {
  getAbout: About
}

enum Album {
  Time
  Secret Messages
  Discovery
  Out of the Blue
}

type Song {
  name: String!
  artist: String!
  album: Album!
  songId: Int!
}
`)

// Define a Resolver
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
  }
}

// Create express app
const app = express()

// Define the route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start the app
const port = 3001
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})