import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    scalar Any
    type Mutation{
      addUser(username:String! contact:String!):MutationResponsee!
      addOrder(foodId:Int! userId:Int! count:Int!):MutationResponsee!
    }
    type MutationResponsee{
      status:String!
      message:String!
      data:Any
    }
    type Query{
       users:[User!]!
       orders(userId:ID):[Order!]!
       foods:[Food!]!
     }
    type User {
      userId:ID!
      username:String!
      contact:String!
      orders:[Order!]
    }
    type Order {
      orderId:ID!
      userId:ID!
      food:Food!
      user:User!
      count:Int!
    }
    type Food {
      foodId:ID!
      foodName:String!
      foodImg:String!
    }
`
