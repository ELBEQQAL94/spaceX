const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = require("graphql");

// @axios
const axios = require('axios');

// lunch type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: {
      type: GraphQLInt
    },
    mission_name: {
      type: GraphQLString
    },
    launch_year: {
      type: GraphQLString
    },
    launch_date_local: {
      type: GraphQLString
    },
    launch_success: {
      type: GraphQLBoolean
    },
    rocket: {
      type: RocketType
    }
  })
});

// rocket type
const RocketType = new GraphQLObjectType({
    name: 'rocket',
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        }
    })
});

// root query
const query = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        // launches
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: (parent,args) => {
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data)
                .catch(err => console.error(err));
            }
        },

        // lunch
        launch: {
            type: LaunchType,
            args:{
                flight_number:{
                    type: GraphQLInt
                }
            },
            resolve: (parent,args) => {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data)
                .catch(err => console.error(err));
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query
});