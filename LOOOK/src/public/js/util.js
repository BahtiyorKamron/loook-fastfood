async function request(query,variables){
 let response = await  fetch('/graphql',{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify({
    query,
    variables
    })
  })
  response = await response.json()
  console.log(response);
  return response.data
}
request()
function createElement(...elements){
  let res = []
  for(let i of elements){
    res.push(document.createElement(i))
  }
  return res
}
function getElement(...elements){
  let res = []
  for(let i of elements){
    res.push(document.querySelector(i))
  }
  return res
}
