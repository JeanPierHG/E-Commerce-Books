const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  status: {
    type: Enumerator('Created', 'processing', 'cancelled', 'complete'),
  },
  payment_id: {
    type: Number,
  },
  payment_status: {
    type: String,
    default: '',
  },
  payment_order_id: {
    type: Number,
    default: 0,
  },
})
