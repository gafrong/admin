// import {faker} from '@faker-js/faker'
import fs from 'fs'
// korean version
import { fakerKO as faker } from '@faker-js/faker'

const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

const randomFormattedDate = () => {
  let dateObject = faker.date.anytime()

  let year = dateObject.getFullYear()
  let month = dateObject.getMonth()
  let day = dateObject.getDate()
  return [year, month, day].join('-')
}

const randomFormattedTime = () => {
  let dateObject = faker.date.anytime()
  let hours = dateObject.getHours()
  let minutes = dateObject.getMinutes()
  let seconds = dateObject.getSeconds()
  return [hours, minutes, seconds].join('.')
}

const getName = () => {
  let firstName = faker.person.firstName()
  let lastName = faker.person.lastName()
  let name = `${firstName} ${lastName}`
  return name
}

function generateProducts(max) {
  let products = []
  for (let id = 1; id <= max; id++) {
    let status = selectRandom([
      'Ordered',
      'Processing',
      'In Delivery',
      'Delivered',
      'Cancel',
      'Refunded',
    ])
    let memo = selectRandom(['info', 'none'])
    let date = randomFormattedDate()
    let time = randomFormattedTime()
    let orderNumber = faker.number.int({
      min: 1000000000000,
      max: 2000000000000,
    })
    let name = getName()
    let productImage = faker.image.urlLoremFlickr({ category: 'fashion' })
    // let productDescription = faker.commerce.productDescription(); // multi-line product name
    let productDescription = faker.commerce.productName()
    let productAdjective1 = faker.color.human()
    let productAdjective2 = faker.commerce.productMaterial()
    let productAdjective3 = faker.commerce.productAdjective()
    let email = faker.internet.email()
    let price = faker.commerce.price({ min: 10000, max: 30000 })
    let payment = price - 9345
    let quantity = faker.number.int({ min: 1, max: 30 })
    let amount = payment
    products.push({
      id,
      email,
      amount,
      status,
      dateGroup: { date, time },
      orderNumber,
      name,
      productImage,
      productDescription,
      productGroup: {
        productDescription,
        productAdjective1,
        productAdjective2,
        productAdjective3,
        productImage,
      },
      quantity,
      price,
      payment,
      memo,
    })
  }
  return products
}

const dataLength = 1000
let dataObj = generateProducts(dataLength)
fs.writeFileSync('src/mocks/data.json', JSON.stringify(dataObj, null, '\t'))
