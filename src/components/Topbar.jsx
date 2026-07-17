import { Nav } from 'react-bootstrap';

const Topbar = () => {
    return (
        <Nav className="justify-content-center w-100 mt-3 mb-5 d-none d-md-flex topbar-links">
            <Nav.Link href="#" className="text-secondary fw-bold text-uppercase px-3">Trending</Nav.Link>
            <Nav.Link href="#" className="text-secondary fw-bold text-uppercase px-3">Podcast</Nav.Link>
            <Nav.Link href="#" className="text-secondary fw-bold text-uppercase px-3">Moods and Genres</Nav.Link>
            <Nav.Link href="#" className="text-secondary fw-bold text-uppercase px-3">New Releases</Nav.Link>
            <Nav.Link href="#" className="text-secondary fw-bold text-uppercase px-3">Discover</Nav.Link>
        </Nav>
    );
};

export default Topbar;