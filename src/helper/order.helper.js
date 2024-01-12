function isOkayTotal(listProducts){
  for (let i = 0; i < listProducts.length; i++) {
    let quantity = listProducts[i].quantity
    let price = listProducts[i].price
    let total = price * quantity
    if (total != listProducts[i].total) return true
  }
 return 
}
function addNextId(list,nextId,key) {
  for (let i = 0; i < list.length; i++) {
    list[i][key] = nextId;
  }
  return list;
}


const addTotal = (list) => {
    for (let i = 0; i < list.length; i++) {
      list[i].total = list[i].price * list[i].quantity
    }
    return list;
};

module.exports = {
  addNextId,
  addTotal,
  isOkayTotal
}
