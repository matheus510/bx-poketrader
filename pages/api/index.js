import dbConnect from '../../utils/dbConnection'
import Trade from '../../models/Trade'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const trades = await Trade.find({})
        res.status(200).json({ success: true, data: trades })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const trade = await Trade.create(JSON.parse(req.body))
        res.status(201).json({ success: true, data: trade })
      } catch (error) {
        debugger
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}