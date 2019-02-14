const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  creatorId:    {type:Schema.Types.ObjectId, ref:"User"},
  diveId:       {type:Schema.Types.ObjectId, ref:"Dive"},
  valuation:    {type:Number, enum:[1,2,3,4,5], default:3},
  description:  String
} );

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

