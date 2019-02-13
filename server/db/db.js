const knex = require('knex')
const config = require('../../knexfile').development

const db = knex(config)

module.exports = {
    getFood,
    getSingleFood,
    getFoodCat,
    addRating,
    averageRating
}

function getFood () {
    return db('food').select()
  }

function getSingleFood(id) {
    return db('food').where('id',id).select()
}

function getFoodCat(category) {
    return db('food').where('category', category).select()
}

function addRating(rating, foodId) {
    var newRating = {
        foodId:foodId,
        rate:rating
    };
    return db('ratings')
    .insert(newRating)
}

function averageRating(foodId) {
    return db('ratings').where('foodId',foodId).select('rate')
    .then(rateArr => {
        var ratingsArr = []

        rateArr.map(rate => {
            ratingsArr.push(rate.rate)
        })
        
        var sum = ratingsArr.reduce((acc,i) => {return acc + i}, 0)
        var average = sum/ratingsArr.length
        var roundedAve = Number(average.toFixed(1))
        return roundedAve
    })
}