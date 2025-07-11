import { useEffect } from 'react';
import { Table, Button, Container, Spinner, Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from './employeeSlice';
import { Link } from 'react-router-dom';
import './EmployeeTable.css'; 
export default function EmployeeTable() {
  const dispatch = useDispatch();
  const { data, status } = useSelector(s => s.employees);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchEmployees());
  }, [status, dispatch]);

  if (status === 'loading')
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container>
      <Card className="table-card shadow-lg p-4 mt-4">
        <h2 className="mb-4 text-center text-primary fw-bold">👥 Employee Data</h2>
        <Table responsive bordered hover className="employee-table">
          <thead>
            <tr>
              <th>#</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>🛠️ Role</th>
              <th>💰 Salary</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, idx) => (
              <tr key={emp.id}>
                <td>{idx + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  <Badge bg="secondary" className="px-2 py-1 text-uppercase">
                    {emp.role}
                  </Badge>
                </td>
                <td>₹{emp.salary}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      as={Link}
                      to={`/edit/${emp.id}`}
                      variant="outline-primary"
                      size="sm"
                      className="action-btn"
                    >
                      ✏️
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="action-btn"
                      onClick={() => dispatch(deleteEmployee(emp.id))}
                    >
                      🗑️
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
