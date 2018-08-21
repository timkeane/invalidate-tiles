jest.setTimeout(1000 * 60 *  5)

const $ = require('jquery')
const server = require('../index')

const request = {
  minz: 17,
  maxz: 17,
  extent: [-8236292.332456007, 4967101.816542972, -8235814.601029224, 4967310.82404219], 
  templates: {
    tms: ['https://maps.nyc.gov/tms/1.0.0/carto/basemap/${0}/${1}/${2}.png8'],
    wmts: ['https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A${0}&TileCol=${1}&TileRow=${2}'],
    xyz: ['https://maps.nyc.gov/xyz/1.0.0/carto/basemap/${0}/${1}/${2}.png8']
  }
}

test('integration test', done => {
  expect.assertions(0)

  $.ajax({
    url: 'http://localhost:3000/',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(request),
    success: response => {
      /* expectations here */
      server.close(done)
    },
    error: (xhr, status, error) => {
      console.error(xhr, status, error)
      server.close(done)
    }
  })
})