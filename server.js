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
  allSongs: [Song!]!
  getSong(songId: Int!): Song
  firstSong: Song!
  lastSong: Song!
  getTime: Time
  getRandom(range: Int!): Int!
  getRoll(sides: Int!, rolls: Int!): Roll!
}

type Roll {
  total: Int!
  sides: Int!
  rolls: [Int]!
}

enum Album {
  Time
  Secret Messages
  Discovery
  Out of the Blue
}

type Time {
  hour: String!
  minute: String!
  second: String!
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
  },
  allSongs: () => {
    return SongList
  },
  getSong: ({ songId }) => {
    return SongList[songId]
  },
  firstSong: () => {
    return SongList[0]
  },
  lastSong: () => {
    return SongList[SongList.length - 1]
  },
  getTime: () => {
    const time = new Date()
    return { hour: time.getHours(), minute: time.getMinutes(), second: time.getSeconds() }
  },
  getRandom: ({ range }) => {
    return parseInt(Math.round(Math.random() * range))
  },
  getRoll: ({ sides, rolls }) => {
    const rollArr = []
    let total = 0

    for (i in [...Array(rolls).keys()]) {
      const rollAmnt = Math.ceil(Math.random() * sides)
      rollArr.push(rollAmnt)
      total += rollAmnt
    }

    return { total, sides, rolls: rollArr }
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