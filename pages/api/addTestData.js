// /pages/api/addTestData.js

import connectMongo from '../../lib/db';
import Task from '../../models/Task';

export default async function handler(req, res) {
    await connectMongo();


  if (req.method === 'POST') {
    try {
        await connectMongo();

      const { name, description, category, price, rating, createdAt } = req.body ;
      
      // Create a new document in the collection with parsed date
      const newItem = new Task({
        name,
        description,
        category,
        price: Number(price),
        rating: Number(rating),
        createdAt: new Date(createdAt) // Ensure date is correctly formatted
      });

      console.log('newItem',newItem);

      await newItem.save();
      res.status(200).json({ message: 'Data inserted successfully!' });
    } 

    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error inserting data' });
      
    }

  } 
  
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }

}
