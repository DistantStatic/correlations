import { useState, useEffect, useContext } from 'react';
import { Modal, Carousel, Button, Container } from 'react-bootstrap';
import TokenImage from '../../components/token-image/token-image';
import { ContractContext } from '../contract-context/contract-context';
import styles from './token-list.module.css';

export default function TokenList(props) {
    const [tokenList, setTokenList] = useState([]);

    const contract = useContext(ContractContext)

    useEffect(() => {
        ( async () => {
            if (contract.methods === undefined || !props.account) return;
            const result = await contract.methods.getCollection(props.account).call();
            setTokenList(result)
        })()
        // eslint-disable-next-line 
    }, [contract])

    return(
        <Modal 
        show={props.show} 
        onHide={props.hide}
        dialogClassName={styles.modalStyle}
        aria-labelledby="receipt_title"
        >
            <Modal.Header>
                <Modal.Title id="receipt_title">Owned Correlations:</Modal.Title>
                <Button onClick={props.hide} variant="danger">X</Button>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Carousel>
                        {tokenList.map(token => (
                            <Carousel.Item>
                                <TokenImage modal={true} key={token} tokenId={token} />
                                <Carousel.Caption>
                                    <h3>{token}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            </Modal.Body>
        </Modal>
    )
}
