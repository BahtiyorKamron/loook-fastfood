const FOODS =
  `
   query{
     foods{
       foodName
       foodId
     }
   }
  `
const USERS = `
  query{
    users{
      username
      userId
      contact
    }
  }
`
const ORDERS = `
  query($userId:ID){
    orders(userId:$userId){
      food{
        foodName
        foodImg
      }
      count
    }
  }
`
const AddUser = `
    mutation Mutation($addUserUsername: String!  $addUserContact: String!) {
        addUser(username: $addUserUsername, contact: $addUserContact) {
        data
        message
        status
        }
    }
`
const AddOrder = `
   mutation Mutation($OrderId: Int!, $ClientId: Int!, $FoodsCount: Int!) {
       addOrder(foodId: $OrderId, userId: $ClientId, count: $FoodsCount) {
       message
       status
       data
       }
   }
`
