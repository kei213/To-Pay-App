'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


  function dynamicModel(name) {
      var addressSchema = new Schema(
          {
               "name" : {type: String, default: '',trim: true},
               "phoneNumber" : {type: String, default: '',trim: true},
               // "date" : {type: Date},
               
          }
  );

     return mongoose.model(name + 'collection', addressSchema);

  }

module.exports = dynamicModel;