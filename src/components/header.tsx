import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { changeMode } from '../redux/app/app.slide';

function Header() {

  const users = useAppSelector((state) => state.user.listUsers);
  // const [mode, setMode] = useState('light');
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">QuanLV Navbar {users.length}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            value={mode}
            onChange={(e) => dispatch(changeMode(e.target.value === 'light' ? 'dark' : 'light'))}
            label={mode === 'light' ?
              <Navbar.Text>Light Mode</Navbar.Text>
              : <Navbar.Text>Dark Mode</Navbar.Text>
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;