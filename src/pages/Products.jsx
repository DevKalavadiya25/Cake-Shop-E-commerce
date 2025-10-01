import { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';

function Products({ products, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" style={{ color: '#8b4513' }}>Our Delicious Cakes</h1>

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search for cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(cake => (
            <Col key={cake.id} md={4} lg={3} className="mb-4">
              <ProductCard product={cake} onAddToCart={onAddToCart} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No cakes found matching your criteria.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Products;
