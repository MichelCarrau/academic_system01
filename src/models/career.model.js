const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
  name: String,
  email: String,
  office: String,
  phone: String
});

const careerSchema = new mongoose.Schema({
  career_code: { type: String, required: true },
  career_name: { type: String, required: true },
  description: String,
  four_quarter_duration: Number,
  modality: String,
  creation_date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  coordinator: coordinatorSchema
});

module.exports = mongoose.model('Career', careerSchema);
