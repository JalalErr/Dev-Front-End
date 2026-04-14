import { Navbar, Container, Button, Nav } from 'react-bootstrap';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function HeaderBS({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <Navbar bg="success" variant="dark">
      <Container fluid>
        <Button onClick={onMenuClick}>☰</Button>
        <Navbar.Brand>{title}</Navbar.Brand>

        <Nav className="ms-auto">
          {userName && <span>{userName}</span>}
          {onLogout && <Button onClick={onLogout}>Logout</Button>}
        </Nav>
      </Container>
    </Navbar>
  );
}