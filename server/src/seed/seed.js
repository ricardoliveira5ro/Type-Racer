const path = require('path')
const jsonfile = require('jsonfile')

const Quote = require('../models/quote')

const seedData = async () => {
    const quotesCount = await Quote.countDocuments({}, { hint: "_id_" })
    
    if (quotesCount == 0) {
        jsonfile.readFile(path.join(__dirname, 'quotes.json'))
            .then(quotes => { Quote.insertMany(quotes) })
            .catch(error => { console.log(error) })
    }
}

module.exports = seedData