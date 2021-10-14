import { ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import styles from './account-chooser.module.css';

export default function AccountChooser(props) {
    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                <Modal.Title>Choose Eth Account</Modal.Title>
                <Button onClick={props.hide} variant="danger">X</Button>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {props.accounts.map((account) => (
                    <ListGroupItem 
                        key={props.accounts.indexOf(account)}
                        className={styles.account}
                        onClick={() => {
                            props.setAccount(account);
                            props.hide();
                        }}
                        >{account}
                    </ListGroupItem>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}