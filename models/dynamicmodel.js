'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


  function dynamicModel(name) {
      var addressSchema = new Schema(
          {
               "day" : {type: String, default: '',trim: true},
               "amount" : {type: Number, default: '',trim: true},
               // "date" : {type: Date},
               
          }
  );

     return mongoose.model(name + 'collection', addressSchema);

  }

module.exports = dynamicModel;