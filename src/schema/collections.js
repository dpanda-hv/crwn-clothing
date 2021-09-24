const graphql = require('graphql');
const {
  getCollections,
  getCollectionById,
  getCollectionByTitle,
} = require('../api/collections');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Item = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
  }),
});

const Collection = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    items: { type: new GraphQLList(Item) },
  }),
});

const RootSchema = new GraphQLObjectType({
  name: 'RootSchema',
  fields: {
    collection: {
      type: Collection,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const data = await getCollectionById(args.id);
        return { id: args.id, ...data };
      },
    },
    getCollectionsByTitle: {
      type: Collection,
      args: { title: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const data = await getCollectionByTitle(args.title);
        return data;
      },
    },
    collections: {
      type: new GraphQLList(Collection),
      resolve: async () => {
        const data = await getCollections();
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootSchema,
});
