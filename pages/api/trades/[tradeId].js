import dbConnect from '../../../utils/dbConnection'
import Trade from '../../../models/Trade'

export default async function handler(req, res) {
  const { method } = req
  const { tradeId } = req.query

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const trade = await Trade.findById(tradeId)
        res.status(200).json({ success: true, data: trade })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}