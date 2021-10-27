import { Container, Navbar, Nav } from "react-bootstrap"
import styles from './nav-bar.module.css';

export default function MyNav(props) {
    return(
        <Navbar className={styles.stickyNav} bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand href="#">Correlations</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={props.showMint}>
                            Mint
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text className={styles.account}>{props.account ? `Using address: ${props.account}` : <a href="/">Not connected to web3</a>}</Navbar.Text>
                    <Navbar.Text onClick={props.showCollection} className={styles.balance}>{props.balance ? `Balance: ${props.balance}` : ''}</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}