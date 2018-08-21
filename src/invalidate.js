require('dotenv').config()

/* currently assumes cdn json api and basic auth */
const uri = process.env.CDN_URI
const user = process.env.CDN_USER
const password = process.env.CDN_PASSWORD
const json = process.env.CDN_POST_DATA
const urlProp = process.env.CDN_URL_PROP_NAME
const headers = {'Content-Type': 'application/json'}

const Client = require('node-rest-client').Client

module.exports = (urls, response) => {
  const client = new Client({user: user, password: password})
  const data = JSON.parse(json)
  data[urlProp] = urls
  client.post(uri, {headers: headers, data: data}, (cdnData, cdnResponse) => {
    const status = cdnResponse.statusCode
    if (status === 201) {
      response.json(cdnData)
    } else if (status === 400) {
      response.status(status).json(cdnData)
    } else {
      response.status(status).json({message: cdnResponse.statusMessage})
    }
  })  
}