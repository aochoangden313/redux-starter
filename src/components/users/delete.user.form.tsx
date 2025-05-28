import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";


function DeleteUserForm(props: any) {

    const { show, handleClose, user } = props;
    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User Confirmation</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <p>Are you sure you want to delete this user have id: {user?.id}?</p>

                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteUserForm;