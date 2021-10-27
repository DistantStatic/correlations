import { Modal, Spinner } from 'react-bootstrap';
import styles from './loading-modal.module.css';

export default function LoadingModal({show, hide}) {

    return (
        <Modal show={show} static contentClassName={styles.modContent}>
            <Modal.Body>            
                <Modal.Title>
                    Please Check Your Wallet
                    <br />
                    <h5><i>Please do not refresh or close this screen</i></h5>
                </Modal.Title>
                <hr />
                <br />
                
                <Spinner animation="border" role="status" className={styles.custSpinnerOne}>
                    <Spinner animation="border" role="status" className={styles.custSpinnerTwo}>
                        <Spinner animation="border" role="status" className={styles.custSpinnerThree}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Spinner>
                </Spinner>
            </Modal.Body>
        </Modal>
    )
}

