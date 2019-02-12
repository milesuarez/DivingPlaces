const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const diveSchema = new Schema({
  creatorId:    {type:Schema.Types.ObjectId, ref:"User"},
  comment:      [{type:Schema.Types.ObjectId, ref:"Comment"}],
  namePlace:    String,
  description:  String,
  depthMeters:  Number,
  dateDive:     Date,
  timeDiveMin:  Number,
  valuations:   {type:Number, enum:[1,2,3,4,5], default:3},
  lng:          Number,
  lat:          Number,
  picPath:      String,
  picName:      String
} );

const Dive = mongoose.model('Dive', diveSchema);
module.exports = Dive;

