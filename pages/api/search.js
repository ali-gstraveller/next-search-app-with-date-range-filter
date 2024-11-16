import connectMongo from '../../lib/db';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await connectMongo();

  const { query, category, minPrice, maxPrice ,startDate, endDate} = req.query;

  // Build the MongoDB query object
  const searchCriteria = {};

  if (query) {
    searchCriteria.name = { $regex: query, $options: 'i' };
  }

  if (category) {
    searchCriteria.category = category;
  }

  if (minPrice) {
    searchCriteria.price = { ...searchCriteria.price, $gte: Number(minPrice) };
  }

  if (maxPrice) {
    searchCriteria.price = { ...searchCriteria.price, $lte: Number(maxPrice) };
  }

  if (startDate || endDate) {
    searchCriteria.createdAt = {};
    if (startDate) {
      searchCriteria.createdAt.$gte = new Date(startDate); // Start date
    }
    if (endDate) {
      searchCriteria.createdAt.$lte = new Date(endDate); // End date
    }
  }

  try {
    const items = await Task.find(searchCriteria);
    res.status(200).json({ success: true, data: items });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
}
