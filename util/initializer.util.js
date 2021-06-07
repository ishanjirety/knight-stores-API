const mongoose = require('mongoose')

// DB Connection
const initializeConnection = async (port) => {
  const URI = process.env.DB_CONNECTION_URI
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.clear()
    console.log(`<======== CONNECTED TO DB ON PORT : ${port} ========>`)
    console.log(`Live server: http://127.0.0.1:${port}`)
  }
  catch (e) {
    console.log("ERROR : Could not initiate connection")
    console.log(`REASON : ${e.message}`)
  }
}

module.exports = initializeConnection