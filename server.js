const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Define the Schema
const schema = buildSchema(`
type About {
  message: String!
}

type Query {
  getAbout: About
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