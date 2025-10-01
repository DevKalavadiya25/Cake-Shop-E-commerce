import { Card, Button } from 'react-bootstrap';

function ProductCard({ product, onAddToCart, showDelete, onDelete }) {
  return (
    <Card className="h-100 shadow-sm hover-card">
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description}
        </Card.Text>
        <Card.Text>
          <span className="badge bg-secondary">{product.category}</span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0" style={{ color: '#d4a574' }}>${product.price}</h5>
          {!showDelete ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAddToCart(product)}
              style={{ backgroundColor: '#d4a574', border: 'none' }}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
    
  );
}

export default ProductCard;
