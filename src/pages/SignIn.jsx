import { useState } from 'react';
import { auth, googleProvider } from '../app/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmailLogin = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px'}}>
        <h4 className="mb-3 text-center">Welcome Back</h4>
        <Form onSubmit={handleEmailLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email : </Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 mb-2">Sign In</Button>
          <Button variant="outline-danger" className="w-100 mt-3" onClick={handleGoogleLogin}>
            Sign in with Google
          </Button>
          <Button
            variant="link"
            className="w-100 text-center"
            onClick={() => navigate('/signup')}
          >
            Don’t have an account? Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
     