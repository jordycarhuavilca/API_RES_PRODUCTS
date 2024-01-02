
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
    addTotal
}
