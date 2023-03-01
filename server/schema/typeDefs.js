const typeDefs = 
'#graphql

//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" ty
//     pe is the root of all GraphQL queries.
//     # (A "Mutation" type will be covered later on.)
//     type Query {}

// `;

type Author {
    id: ID!
    name: String!
  }
  
  type Book {
    bookId: ID!
    title: String!
    description: String
    image: String
    link: String
    authors: [Author!]!
  }
  
  type Query {
    books: [Book!]!
    book(bookId: ID!): Book
  }
  
  input AuthorInput {
    name: String!
  }
  
  input BookInput {
    title: String!
    description: String
    image: String
    link: String
    authors: [AuthorInput!]!
  }
  
  type Mutation {
    createBook(book: BookInput!): Book!
    updateBook(bookId: ID!, book: BookInput!): Book!
    deleteBook(bookId: ID!): Boolean!
  }'


module.exports = typeDefs;