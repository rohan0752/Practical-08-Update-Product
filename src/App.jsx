import { useState } from 'react';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Wireless Earbuds', price: 2499, category: 'Electronics', description: 'Bluetooth 5.0 earbuds with noise cancellation', stock: 30 },
  { id: 2, name: 'Laptop Stand', price: 1799, category: 'Accessories', description: 'Adjustable aluminum laptop stand', stock: 50 },
  { id: 3, name: 'Mechanical Keyboard', price: 3999, category: 'Electronics', description: 'RGB mechanical keyboard with Cherry MX switches', stock: 25 },
  { id: 4, name: 'Mouse Pad XL', price: 599, category: 'Accessories', description: 'Extended gaming mouse pad, 900x400mm', stock: 100 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', category: '', description: '', stock: '' });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState('');

  const categories = ['Electronics', 'Accessories', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'];

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      stock: product.stock.toString(),
    });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: '', price: '', category: '', description: '', stock: '' });
    setErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!editForm.name.trim()) errs.name = 'Product name is required';
    if (!editForm.price || isNaN(editForm.price) || Number(editForm.price) <= 0) errs.price = 'Enter a valid price';
    if (!editForm.category) errs.category = 'Select a category';
    if (!editForm.stock || isNaN(editForm.stock) || Number(editForm.stock) < 0) errs.stock = 'Enter valid stock';
    return errs;
  };

  const handleSave = (id) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setProducts(prev => prev.map(p =>
      p.id === id
        ? { ...p, name: editForm.name.trim(), price: Number(editForm.price), category: editForm.category, description: editForm.description.trim(), stock: Number(editForm.stock) }
        : p
    ));
    setEditingId(null);
    setShowSuccess(`Product "${editForm.name}" updated successfully!`);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <span className="brand-icon">✏️</span>
        <h1>Product Management — Update Operation</h1>
        <p className="header-subtitle">Edit and update product details — BCA Practical 8</p>
      </header>

      <main className="main-content">
        {showSuccess && <div className="toast-success">✅ {showSuccess}</div>}

        <div className="products-container">
          <div className="section-header">
            <h2>📦 Products ({products.length})</h2>
            <p className="section-desc">Click "Edit" on any product to modify its details</p>
          </div>

          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className={`product-card ${editingId === product.id ? 'editing' : ''}`}>
                {editingId === product.id ? (
                  <div className="edit-form">
                    <h3>✏️ Editing: {product.name}</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className={errors.name ? 'error' : ''} />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label>Price (₹) *</label>
                        <input type="number" name="price" value={editForm.price} onChange={handleEditChange} className={errors.price ? 'error' : ''} />
                        {errors.price && <span className="error-msg">{errors.price}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Category *</label>
                        <select name="category" value={editForm.category} onChange={handleEditChange} className={errors.category ? 'error' : ''}>
                          <option value="">Select</option>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.category && <span className="error-msg">{errors.category}</span>}
                      </div>
                      <div className="form-group">
                        <label>Stock *</label>
                        <input type="number" name="stock" value={editForm.stock} onChange={handleEditChange} className={errors.stock ? 'error' : ''} />
                        {errors.stock && <span className="error-msg">{errors.stock}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea name="description" value={editForm.description} onChange={handleEditChange} rows="2" />
                    </div>
                    <div className="edit-actions">
                      <button className="btn btn-success" onClick={() => handleSave(product.id)}>💾 Save Changes</button>
                      <button className="btn btn-outline" onClick={handleCancel}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="product-header">
                      <div>
                        <h3>{product.name}</h3>
                        <div className="product-meta">
                          <span className="meta-badge">{product.category}</span>
                          <span className="meta-item">Stock: {product.stock}</span>
                        </div>
                      </div>
                      <div className="product-right">
                        <span className="product-price">₹{product.price.toLocaleString()}</span>
                        <button className="btn btn-edit" onClick={() => handleEdit(product)}>✏️ Edit</button>
                      </div>
                    </div>
                    {product.description && <p className="product-desc">{product.description}</p>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Product Management — BCA Practical 8</p>
      </footer>
    </div>
  );
}

export default App;
