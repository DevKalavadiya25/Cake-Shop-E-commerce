import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h2 style={{ color: '#8b4513' }}>Your Cart is Empty</h2>
        <p className="text-muted mb-4">Add some delicious cakes to get started!</p>
        <Button
          as={Link}
          to="/products"
          style={{ backgroundColor: '#d4a574', border: 'none' }}
        >
          Browse Cakes
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4" style={{ color: '#8b4513' }}>Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                            className="rounded"
                          />
                          <div>
                            <div className="fw-bold">{item.name}</div>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">${item.price}</td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="align-middle fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="align-middle">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onRemoveFromCart(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h4 className="mb-3" style={{ color: '#8b4513' }}>Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong style={{ color: '#d4a574' }}>${calculateTotal()}</strong>
              </div>
              <Button
                className="w-100 mb-2"
                size="lg"
                style={{ backgroundColor: '#d4a574', border: 'none' }}
              >
                Proceed to Checkout
              </Button>
              <Button
                as={Link}
                to="/products"
                variant="outline-secondary"
                className="w-100"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
