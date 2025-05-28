import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";


function UpdateUserForm(props: any) {

    const { show, handleClose, handleUpdateUser, selectedUser } = props;
    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Id"
                        className="mb-3"
                    >
                        <Form.Control type="id" value={selectedUser?.id} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control type="name" value={'my name'} />
                    </FloatingLabel>
                    <FloatingLabel  label="Email">
                        <Form.Control type="email" value={'my_email@gmail.com'} />
                    </FloatingLabel>
                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Update User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateUserForm;