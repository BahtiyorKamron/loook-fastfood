import { read, write } from '../lib/orm.js'
export const resolvers = {
  Mutation:{
    addUser:(_,args)=>{
       let user = read('users')
       args.user_id=user.length?+user[user.length-1].user_id+1:1,
       user.push(args)
       if(write('users',user)) {
         return {
           status:"200",
           message:"User has succesfuly added",
           data:args
         }
       }
    },
    addOrder:(_,args)=>{
      let orders = read('orders')
      let food = orders.find(order => order.food_id==args.foodId && order.user_id==args.userId)
      if(food){
        food.count = +food.count + +args.count
      }else{
        food = {
          user_id:args.userId,
          food_id:args.foodId,
          order_id:orders.length?orders[orders.length-1].order_id+1:1,
          count:args.count
        }
        orders.push(food)
      }
      if(write('orders',orders)){
        return {
          status:201,
          message:"Order joinde",
          data:food
        }
      }}
  },
  Query:{
    users:()=> read('users'),
    orders:(_,{userId})=> !userId ? read('orders') : read('orders').filter(order => order.user_id==userId),
    foods:()=>read('foods')
  },
  User:{
    userId:(global)=>global.user_id,
    orders:(global)=>{
       let orders = read('orders')
       return orders.filter(order => order.user_id==global.user_id)
    }
  },
  Order:{
    orderId:(global)=>global.order_id,
    userId:(global)=>global.user_id,
    food:(global)=> read('foods').find(food => food.food_id==global.food_id),
    user:(global)=> read('users').find(user => user.user_id==global.user_id)
  },
  Food:{
    foodName:(global)=>global.food_name,
    foodId:(global)=>global.food_id,
    foodImg:(global)=>global.food_img
  }
}
