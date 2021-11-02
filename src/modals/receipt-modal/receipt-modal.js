import { Container, Modal, Button, Carousel } from 'react-bootstrap';
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
                    {//if we have an array of images, for tokenId then we make a carousel of the minted tokens
                        !props.multi ? 
                        <TokenImage modal={true} tokenId={props.tokenId}/> : 
                        <Carousel>
                            {props.tokenId.map(token => (
                                <Carousel.Item>
                                    <TokenImage modal={true} key={token} tokenId={token} />
                                    <Carousel.Caption>
                                        <h3>{token}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    }
                </Container>
            </Modal.Body>
            <Modal.Footer style={{"textAlign": "center"}}>
                <Container>
                    {
                        !props.multi ?
                        <h2>Token Id: {props.tokenId}</h2> :
                        props.tokenId.map(token => (
                        <h2>Token Ids: {token} </h2>
                        ))
                    }
                </Container>
            </Modal.Footer>
        </Modal>
    )
}