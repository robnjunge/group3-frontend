import { useState } from 'react';
import './home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(''); 

  const renderProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredProducts.map((product, index) => (
      <div key={index} className="product-card">
        <img src={product.imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    ));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="product-list">{renderProducts()}</div>
    </div>
  );
};

const products = [
  {
    title: 'mustang',
    imageUrl:
      'https://images.unsplash.com/photo-1602200059552-39ed78989991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTE1ODU0OXx8ZW58MHx8fHx8&dpr=1&auto=format&fit=crop&w=294&h=294&q=60',
  },
  {
    title: 'Porche',
    imageUrl:
      'https://images.unsplash.com/photo-1687166783902-45947281f59d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8OHBnYVh4SV9jcFV8fGVufDB8fHx8fA%3D%3D&dpr=1&auto=format&fit=crop&w=294&h=294&q=60',
  },
];

export default Home;
