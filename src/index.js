const sequelize = require("./db/associations");
const app = require("./app");
const { PORT } = require("./config");
const insertData = require("./insertData");
function RunApp() {
  console.log(PORT);
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
  
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    await insertData();
    console.log("data inserted in all tables");
    RunApp();
  }catch(err){
    console.log("Unable to connect to the database : " + err);
  }
}

connect();
