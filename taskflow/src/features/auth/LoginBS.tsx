import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../../api/axios';

export default function LoginBS() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const { data: users } = await api.get(`/users?email=${email}`);

      if (users.length === 0 || users[0].password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur login' });
        return;
      }

      const { password: _, ...user } = users[0];
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });

    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height:'100vh' }}>
      <Card style={{ width: 400 }}>
        <Card.Body>
          <Card.Title>TaskFlow</Card.Title>

          {state.error && <Alert variant="danger">{state.error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button type="submit">Se connecter</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}