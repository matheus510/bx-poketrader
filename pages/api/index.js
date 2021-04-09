import dbConnect from '../../utils/dbConnect'
import Trade from '../../models/Trade'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const trades = await Trade.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: trades })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const trade = await Trade.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: trade })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}