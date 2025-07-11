// src/features/employees/EmployeeForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, fetchEmployees } from './employeeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import './EmployeeForm.css'; 

export default function EmployeeForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(s => s.employees.data);

  const existing = employees.find(e => e.id === id);
  const [form, setForm] = useState(
    existing ?? { name: '', email: '', role: '', salary: '' }
  );

  useEffect(() => {
    if (employees.length === 0) dispatch(fetchEmployees());
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    id
      ? dispatch(updateEmployee({ id, ...form }))
      : dispatch(addEmployee(form));
    navigate('/');
  };

 return (
  <div className="form-page d-flex justify-content-center align-items-center">
    <Card className="glass-card shadow-lg p-4" style={{backgroundColor : "transparent",color:"white",border:"1px solid #a3a3a3"}}>
      <h3 className="text-center mb-4 fw-bold text-primary">
        {id ? '✏️ Update' : '➕ Add'} Employee
      </h3>

      <Form onSubmit={handleSubmit} >
        {['name', 'email', 'role', 'salary'].map((k, i) => (
          <Form.Group className="mb-4" key={i} >
            <Form.Label className="form-label-custom text-white">{k.toUpperCase()}</Form.Label>
            <Form.Control
              className="form-control-custom bg-transparent"
              name={k}
              value={form[k] ?? ''}
              onChange={handleChange}
              type={k === 'salary' ? 'number' : 'text'}
              required
              placeholder={`Enter ${k}`}
            />
          </Form.Group>
        ))}

        <div className="d-flex gap-3 mt-3">
          <Button type="submit" className="btn-glass flex-grow-1">
            {id ? 'Update Employee' : 'Save Employee'}
          </Button>
          <Button
            variant="outline-secondary"
            className="btn-cancel"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  </div>
);
}
