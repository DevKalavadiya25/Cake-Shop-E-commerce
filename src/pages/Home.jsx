import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Home({ products, onAddToCart }) {
  const featuredCakes = products.slice(0, 3);

  return (
    <div>
      <div
        className="hero-section text-white text-center py-5"
        style={{
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#8b4513' }}>
            Welcome to Sweet Delights
          </h1>
          <p className="lead mb-4" style={{ color: '#654321' }}>
            Handcrafted cakes made with love, fresh ingredients, and a touch of magic
          </p>
          <Button
            as={Link}
            to="/products"
            size="lg"
            style={{ backgroundColor: '#d4a574', border: 'none' }}
          >
            Shop Our Cakes
          </Button>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4" style={{ color: '#8b4513' }}>Featured Cakes</h2>
        <Row>
          {featuredCakes.map(cake => (
            <Col key={cake.id} md={4} className="mb-4">
              <ProductCard product={cake} onAddToCart={onAddToCart} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button
            as={Link}
            to="/products"
            variant="outline-primary"
            style={{ borderColor: '#d4a574', color: '#d4a574' }}
          >
            View All Cakes
          </Button>
        </div>
      </Container>

      <div className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-3">
              <h3 style={{ color: '#d4a574' }}>🎂 Fresh Daily</h3>
              <p>All our cakes are baked fresh every morning</p>
            </Col>
            <Col md={4} className="mb-3">
              <h3 style={{ color: '#d4a574' }}>🚚 Fast Delivery</h3>
              <p>Same day delivery available in your area</p>
            </Col>
            <Col md={4} className="mb-3">
              <h3 style={{ color: '#d4a574' }}>✨ Custom Orders</h3>
              <p>We can customize any cake for your special occasion</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
