import { Container, Modal, Button } from 'react-bootstrap';
import TokenImage from '../../components/token-image/token-image';
import styles from './receipt-modal.module.css';

export default function ReceiptModal(props) {

    return(
        <Modal 
        show={props.show} 
        onHide={props.hide}
        dialogClassName={styles.modalStyle}
        aria-labelledby="receipt_title"
        >
            <Modal.Header>
                <Modal.Title id="receipt_title">Mint Success!</Modal.Title>
                <Button onClick={props.hide} variant="danger">X</Button>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <TokenImage modal={true} tokenId={props.tokenId}/>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <h3>{props.tokenId}</h3>
                </Container>
            </Modal.Footer>
        </Modal>
    )
}