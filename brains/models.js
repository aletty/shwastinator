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
    _liquids: [{_liquid:{ type: Schema.Types.ObjectId, ref: 'Liquid' }, units: Number}],
    name: String,
    cost: Number,
    price: Number,
    image: String
});

var Drink = mongoose.model('Drink', drinkSchema);

var liquidSchema = new Schema({
    name: String,
    alcoholic: Boolean,
    pump: {type: Number, default: 0} 
});

var Liquid = mongoose.model('Liquid', liquidSchema);

var shwasteSchema = new Schema({
    pump1: String,
    pump2: String,
    pump3: String,
    pump4: String,
    pump5: String,
    pump6: String,
    pump7: String,
    pump8: String,
    pump9: String,
    pump10: String,
    pump11: String,
    pump12: String,
    pump13: String,
});

var Shwastinator = mongoose.model('Shwastinator', shwasteSchema);

exports.Shwastinator = Shwastinator;
exports.User = User;
exports.Drink = Drink;
exports.Liquid = Liquid;

