import mongoose from 'mongoose'

/* TradeSchema will correspond to a collection in your MongoDB database. */
const TradeSchema = new mongoose.Schema({
    side_a: {
        type: Object,
    },
    side_b: {
        type: Object,
    },
    even: {
        type: Boolean,
    },
    benefited_side: {
        type: String,
    }
})

export default mongoose.models.Trade || mongoose.model('Trade', TradeSchema)