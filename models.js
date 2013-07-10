var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    _orders: [{ type: Schema.Types.ObjectId, ref: 'Drink', time: Date.now }],
    tab: Number,
    image: String,
    guest: [{Schema.Types.ObjectId, ref: 'User'}],
    admin: Boolean
});

mongoose.model('User', userSchema);

var drinkSchema = new Schema({
    _liquids: [{ type: Schema.Types.ObjectId, ref: 'Liquid' }],
    Name: String,
    Cost: Number,
    Price: Number,
    image: String
});

mongoose.model('Drink', drinkSchema);

var liquidSchema = new Schema({
    name: String,
    Alcohol: Boolean 
});

mongoose.model('Activity', activitySchema);
