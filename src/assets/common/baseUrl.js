// const isDevelopment = process.env.NODE_ENV === 'development'

const url = {
  development: 'http://localhost:3001/api/v1/',
  production: 'https://boutiq-shop-server.herokuapp.com/api/v1/',
}

// uncomment when admin is hosted
// const baseURL = isDevelopment ? url.development : url.production
// const baseURL = url.production
const baseURL = url.development

// console.log({ isDevelopment, baseURL })

export default baseURL
