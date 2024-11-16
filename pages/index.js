import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: '',
    createdAt: ''
  });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState(''); // Start date state
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  const handleSearch = async () => {
    console.log("start data",startDate);
    try {
      const res = await axios.get(`/api/search`, {
        params: { 
          query: query, 
          category: category, 
          minPrice: minPrice, 
          maxPrice: maxPrice,
          startDate:startDate,
          endDate: endDate, // Pass start and end date as parameters
        }
      });
      setResults(res.data.data);
      console.log("data=>",res.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/addTestData', formData);
      if (res.status === 200) {
        alert('Data inserted successfully!');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };




  useEffect(() => {

  }, []);

  return (
    <>
      <h1>search app</h1>

      <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="createdAt" type="date" onChange={handleChange} />
      <button type="submit">Add Data</button>
    </form>







      <h1>  Search area </h1>
      <input  type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..." />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
      />

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />
        <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
      />

      <button onClick={handleSearch}> search </button>
      <ul>
        {results.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
