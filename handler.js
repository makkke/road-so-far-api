// const graphql = require('graphql')
// const tablesFactory = require('./dynamodb/tables')
// const MoistureService = require('./services/moisture')
//
// const tables = tablesFactory()
// const moistureService = MoistureService({ moistureTable: tables.Moisture })
//
// const FuelPurchaseType = new graphql.GraphQLObjectType({
//   name: 'FuelPurchaseType',
//   fields: {
//     region: { type: graphql.GraphQLString },
//     volume: { type: graphql.GraphQLFloat },
//     amount: { type: graphql.GraphQLFloat },
//     createdAt: { type: graphql.GraphQLString },
//   }
// })
//
// const schema = new graphql.GraphQLSchema({
//   query: new graphql.GraphQLObjectType({
//     name: 'Root',
//     description: 'Root of the Schema',
//     fields: {
//       fuelPurchase:
//         name: 'FuelPurchaseQuery',
//         description: 'Retrieve fuel purchases',
//         type: new graphql.GraphQLList(FuelPurchaseType),
//         // args: {
//         //   clientId: {
//         //     type: graphql.GraphQLString,
//         //   },
//         //   hours: {
//         //     type: graphql.GraphQLInt,
//         //     defaultValue: 1
//         //   },
//         // },
//         resolve: (_, args, ast) => {
//           const hours = args.hours > 0 ? args.hours : 1
//           return moistureService.getLastHours(args.clientId, hours)
//         }
//       }
//     }
//   })
// })

// var graphql = require('graphql')
//
// var schema = graphql.buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// var schema = buildSchema(`
//   type Query {
//     quoteOfTheDay: String
//     random: Float!
//     rollThreeDice: [Int]
//   }
// `)

// var root = {
//   hello: () => {
//     return 'Hello world!'
//   },
// }

// var root = {
//   quoteOfTheDay: () => {
//     return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'
//   },
//   random: () => {
//     return Math.random()
//   },
//   rollThreeDice: () => {
//     return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
//   },
// }

module.exports.graphql = function(event, context, callback) {
  console.log('Received event', event)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  }

  callback(null, response)

  // graphql(schema, '{ hello }', root).then((response) => {
  //   console.log(response);
  // })

  // const query = event.body.query

  // return graphql(schema, '{ random }', root)
  //   .then((response) => {
  //     console.log(response)
  //     callback(null, response)
  //   })
  //   .catch((error) => {
  //     callback(error)
  //   })
}
