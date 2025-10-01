import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality will be connected to backend later!');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4" style={{ color: '#8b4513' }}>Login</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  style={{ backgroundColor: '#d4a574', border: 'none' }}
                >
                  Login
                </Button>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account? <Link to="/signup" style={{ color: '#d4a574' }}>Sign up</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
