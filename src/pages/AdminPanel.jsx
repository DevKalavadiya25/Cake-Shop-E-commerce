import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';

function AdminPanel({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Chocolate',
    image: '',
    description: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      price: '',
      category: 'Chocolate',
      image: '',
      description: ''
    });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editMode && currentProduct) {
      onUpdateProduct(currentProduct.id, productData);
    } else {
      onAddProduct(productData);
    }

    handleClose();
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ color: '#8b4513' }}>Admin Panel</h1>
        <Button
          onClick={handleShow}
          style={{ backgroundColor: '#d4a574', border: 'none' }}
        >
          <FaPlus /> Add New Cake
        </Button>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h4 className="mb-3">Manage Products</h4>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded"
                    />
                  </td>
                  <td className="align-middle">{product.name}</td>
                  <td className="align-middle">
                    <span className="badge bg-secondary">{product.category}</span>
                  </td>
                  <td className="align-middle">₹{product.price}</td>
                  <td className="align-middle">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDeleteProduct(product.id)}
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

      <h4 className="mb-3">Product Preview</h4>
      <Row>
        {products.slice(0, 4).map(cake => (
          <Col key={cake.id} md={3} className="mb-4">
            <ProductCard
              product={cake}
              onDelete={onDeleteProduct}
              showDelete={true}
            />
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Cake' : 'Add New Cake'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cake Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter cake name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    step="0.01"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.filter(cat => cat !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter cake description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: '#d4a574', border: 'none' }}
              >
                {editMode ? 'Update Cake' : 'Add Cake'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminPanel;
