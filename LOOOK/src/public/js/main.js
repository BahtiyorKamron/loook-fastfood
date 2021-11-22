const [foodsSelect,
  customersList,
  ordersList,
  clientId,
  userAdd,
  username,
  contact
]=getElement('#foodsSelect','.customers-list','.orders-list','#clientId','#userAdd','#usernameInput','#telephoneInput')
const userIdHeader = document.querySelector('#clientId')
const foodsCount = document.querySelector('#foodsCount')

async function renderUsers(){
   let {users} =  await request(USERS)
   for(let user of users){
     let [li,span,a] = createElement('li','span','a')
     li.classList.add('customer-item')
     span.classList.add('customer-name')
     a.classList.add('customer-phone')
     span.textContent=user.username
     a.textContent= '+' + user.contact
     a.setAttribute('href','tel:+'+user.contact)
     li.append(span)
     li.append(a)
     customersList.append(li)

     li.onclick = ()=>{
       clientId.textContent=user.userId
       userHeader.textContent=user.username
       renderOrders(user.userId)
     }

   }
}
renderUsers()

async function renderFoods(){
   let {foods} =  await request(FOODS)
   for(let food of foods){
     let [option] = createElement('option')
     option.value = food.foodId
     option.textContent = food.foodName
     foodsSelect.append(option)
   }
}
renderFoods()

async function renderOrders(userId){
  let {orders} = await request(ORDERS,{"userId":userId})
  ordersList.innerHTML = null
  for(let order of orders){
      let [li,img,foodname,foodcount,div]=createElement('li','img','span','span','div')
      li.classList.add('order-item')
      img.setAttribute('src',order.food.foodImg)
      img.setAttribute('alt',order.food.foodName)
      foodname.classList.add('order-name')
      foodcount.classList.add('order-count')
      foodname.textContent=order.food.foodName
      foodcount.textContent=order.count
      div.append(foodname)
      div.append(foodcount)
      li.append(img)
      li.append(div)
      ordersList.append(div)
      ordersList.append(li)

  }
}
userAdd.onsubmit = (event)=>{
  event.preventDefault()
  console.log((typeof username.value),typeof contact.value);
  addUser(username.value,contact.value)
  username.value=null
  contact.value=null
}

;async function addUser(username,contact) {
  let res = await request(AddUser,{

  "addUserUsername": username,
  "addUserContact": contact
})
  console.log(res);
}


foodsForm.onsubmit = (event) => {
	event.preventDefault()
	if(userIdHeader.textContent) {

    addOrders()
		renderOrders(userIdHeader.textContent)
	}
}
;async function addOrders(){
  let res = await request(AddOrder,{
  "ClientId": +userIdHeader.textContent,
  "OrderId": +foodsSelect.value,
  "FoodsCount": +foodsCount.value
})
}
// user_id: userIdHeader.textContent,
// food_id: foodsSelect.value,
// count: foodsCount.value
