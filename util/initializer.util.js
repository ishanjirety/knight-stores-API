const mongoose = require('mongoose')

// DB Connection
const initializeConnection = async (port) => {
  const URI = process.env.DB_CONNECTION_URI
  try{
    const Client =await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    console.clear()
    console.log("<======== CONNECTED TO DB ON PORT : ${port} ========>")
  }
 catch(e){
   console.log("ERROR : Could not initiate connection")
   console.log(`REASON : ${e.message}`)
 }
}

module.exports = initializeConnection