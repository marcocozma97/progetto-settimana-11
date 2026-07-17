import { useState } from 'react';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { HouseDoorFill, BookFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { fetchMusic } from '../redux/musicSlice';
import logo from '../assets/spotify-logo.png';

const Sidebar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const executeSearch = () => {
        if (query.trim() !== '') {
            dispatch(fetchMusic({ category: 'search', query: query.trim() }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        executeSearch();
    };

    return (
        <Navbar expand="md" className="fixed-left bg-black text-white p-3 sidebar" variant="dark">
            <Container fluid className="d-flex flex-md-column align-items-start h-100 p-0">
                <Navbar.Brand href="#" className="mb-md-4 w-100 d-flex justify-content-between align-items-center px-2">
                    <div className="d-flex align-items-center">
                        <img
                            src={logo}
                            alt="Spotify Logo"
                            style={{ width: '115px', height: 'auto', objectFit: 'contain' }}
                        />
                        <span
                            className="fw-bold"
                            style={{
                                color: '#1DB954',
                                fontSize: '1.1rem',
                                letterSpacing: '-0.5px',
                                fontFamily: 'sans-serif',
                                marginLeft: '-10px' // Margine negativo: tira la scritta "Clone" verso il logo.
                            }}
                        >
                            Clone
                        </span>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav" className="w-100 align-items-start flex-column h-100 px-2">
                    <Nav className="flex-column w-100 mb-auto">
                        <Nav.Link href="#" className="text-secondary fw-bold d-flex align-items-center mb-2 px-0 target-link">
                            <HouseDoorFill className="me-3" size={20} /> Home
                        </Nav.Link>
                        <Nav.Link href="#" className="text-secondary fw-bold d-flex align-items-center mb-4 px-0 target-link">
                            <BookFill className="me-3" size={20} /> Your Library
                        </Nav.Link>

                        <Form className="d-flex mb-4 w-100 align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="rounded-0 rounded-start bg-white text-black border-0 custom-search-input"
                                style={{ height: '34px', fontSize: '0.9rem' }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                variant="outline-secondary"
                                className="rounded-0 rounded-end bg-transparent text-secondary border border-secondary px-2 py-0 d-flex align-items-center justify-content-center"
                                style={{ height: '34px', fontSize: '0.75rem', fontWeight: 'bold' }}
                                onClick={handleButtonClick}
                            >
                                GO
                            </Button>
                        </Form>
                    </Nav>

                    <div className="w-100 mt-auto pb-5 pb-md-3 text-center text-md-start">
                        <Button variant="light" className="w-100 rounded-pill fw-bold mb-2 btn-signup" style={{ fontSize: '0.9rem' }}>Sign Up</Button>
                        <Button variant="outline-light" className="w-100 rounded-pill fw-bold mb-4 btn-login" style={{ fontSize: '0.9rem' }}>Login</Button>
                        <div className="d-flex justify-content-center justify-content-md-start text-secondary gap-1" style={{ fontSize: '0.7rem' }}>
                            <a href="#" className="text-secondary text-decoration-none py-1">Cookie Policy</a> |
                            <a href="#" className="text-secondary text-decoration-none py-1">Privacy</a>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Sidebar;