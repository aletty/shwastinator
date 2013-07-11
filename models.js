var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    approved: Boolean,
    _orders: [{ type: Schema.Types.ObjectId, ref: 'Drink', time: Date.now }],
    tab: Number,
    image: String,
    guest: [{type: Schema.Types.ObjectId, ref: 'User'}],
    admin: Boolean
});

var User = mongoose.model('User', userSchema);

var drinkSchema = new Schema({
    _liquids: [{ type: Schema.Types.ObjectId, ref: 'Liquid' }],
    Name: String,
    Cost: Number,
    Price: Number,
    image: String
});

var Drink = mongoose.model('Drink', drinkSchema);

var liquidSchema = new Schema({
    name: String,
    Alcohol: Boolean 
});

var Liquid = mongoose.model('Liquid', liquidSchema);

exports.User = User;
exports.Drink = Drink;
exports.Liquid = Liquid;