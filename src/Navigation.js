import {
    Nav,
    Navbar,
    NavDropdown,
    Container
  } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Navigation = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user-info'));

    const handleClick = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="navigation">
            <Navbar className="w-100 mb-3" bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link> */}
                            { localStorage.getItem('user-info') && 
                                <NavDropdown title={user && user.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={ handleClick }>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;