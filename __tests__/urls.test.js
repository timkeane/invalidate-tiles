const $ = require('jquery')
const getUrls = require('../src/urls')
const invalidate = require('../src/invalidate')

jest.mock('../src/invalidate')

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

test('get urls', () => {
  expect.assertions(21)
  
  const mockResponse = {}

  getUrls({body: request}, mockResponse)
  
  expect(invalidate).toHaveBeenCalledTimes(1)
  expect(invalidate.mock.calls[0][1]).toBe(mockResponse)
  
  const urls = invalidate.mock.calls[0][0]
  
  expect(urls.length).toBe(18)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38598/81782.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38597/81782.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38597/81781.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38598/81781.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38599/81781.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/tms/1.0.0/carto/basemap/17/38599/81782.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38598&TileRow=49289', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38598&TileRow=49290', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38599&TileRow=49289', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38599&TileRow=49290', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38597&TileRow=49289', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/wmts/1.0.0/?layer=basemap&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng8&TileMatrix=EPSG%3A900913%3A17&TileCol=38597&TileRow=49290', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38599/49289.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38599/49290.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38598/49289.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38598/49290.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38597/49289.png8', urls) > -1).toBe(true)
  expect($.inArray('https://maps.nyc.gov/xyz/1.0.0/carto/basemap/17/38597/49290.png8', urls) > -1).toBe(true)
})
