import { Modal, Button, Container } from 'react-bootstrap';
import styles from './mint-modal.module.css';

export default function MintModal(props) {

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                <Modal.Title>Mint Token</Modal.Title>
                <Button variant="danger" onClick={props.hide}>x</Button>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Button class={styles.btnLeft}>Mint 1</Button>
                    <Button class={styles.btnRight}>Mint 5</Button>
                </Container>
            </Modal.Body>
        </Modal>
    )
}