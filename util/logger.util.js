const logger = (...rest) => {
  rest.forEach((args) => console.log(`> ${args}`))
}
module.exports = logger