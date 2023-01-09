const express = require('express')

var price = 69000.0

setInterval( () => {
  price = price / 2.0
  if (price < 0.001) {
    price = 69000.0
  }
}, 10000)

const mockResponse = (symbol, response) => {
  if (symbol && symbol.length > 1) {
    response.send({
      'symbol': symbol,
      'priceChange': 0.0,
      'priceChangePercent': 0.0,
      'weightedAvgPrice': 0.0,
      'openPrice': 0.0,
      'highPrice': 0.0,
      'lowPrice': 0.0,
      'lastPrice': price,
      'volume': 0.0,
      'quoteVolume': 0.0,
      'openTime': 0,
      'closeTime': 0,
      'firstId': 0,
      'lastId': 0,
      'count': 0
    })
  } else {
    response.status(500).send({
      'code': -1121,
      'msg': 'Invalid symbol.'
    })
  }
}

express()
  .use(express.json())
  .get("/api/v3/ticker", (request, response) => {
    console.log('Got GET', request)
    mockResponse(request.query.symbol, response)
  })
  .post("/api/v3/ticker", (request, response) => {
    console.log('Got POST', request)
    mockResponse(request.body.symbol, response)
  })
  .listen(80)
