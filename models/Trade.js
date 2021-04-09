import mongoose from 'mongoose'

/* TradeSchema will correspond to a collection in your MongoDB database. */
const TradeSchema = new mongoose.Schema({
  side_a: {
    type: Array,
  },
  side_b: {
    type: Array,
  },
  even: {
    type: Boolean,
  },
})

export default mongoose.models.Pet || mongoose.model('Pet', TradeSchema)