const sequelize = require("./db/Connection");
const app = require("./app");
const insertData = require("./insertData");
const {Features,Features_values,orders,products,users,orderDetail} = require('./db/associations')
const PORT = process.env['NODE_PORT']
function RunApp() {
  const server = app.listen(PORT, () => {
    console.log(`it's running on the PORT ${PORT}`);
  });
  server.on('error',(err)=>{
    console.log(`error in the server : ${err}`)
  })
}

async function connect() {
  try{
    await sequelize.authenticate();
    console.log("Connection opened successfully.");
    await sequelize.sync({ alter : true });
    console.log("All models were synchronized successfully.");
    await insertData();
    RunApp();
  }catch(err){
    console.log("Unable to connect to the database : " + err);
  }
}

connect();
