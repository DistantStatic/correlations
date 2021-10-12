import { ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';

export default function AccountChooser(props) {
    console.log(props.accounts)
    return(
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header>
                <Modal.Title>Choose Eth Account</Modal.Title>
                <Button variant="danger">X</Button>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {props.accounts.map((account) => (
                    <ListGroupItem 
                        key={props.accounts.indexOf(account)}
                        onClick={() => {
                            props.setAccount(account)
                            props.onHide();
                        }}
                        >{account}
                    </ListGroupItem>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}