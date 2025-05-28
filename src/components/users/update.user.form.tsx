import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetUpdateUser, updateUser } from "../../redux/user/user.slide";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';


function UpdateUserForm(props: any) {

    const { showUpdateUser, handleCloseUpdateUser, selectedUser } = props;

    const isUpdatedSuccess = useAppSelector((state) => state.user.isUpdatedSuccess);
    const dispatch = useAppDispatch();
    const [updatedUser, setUpdatedUser] = useState<any>(selectedUser);

    useEffect(() => { 
        setUpdatedUser(selectedUser);
        if (isUpdatedSuccess) {
            handleCloseUpdateUser();
            setUpdatedUser(null);
            // reset redux
            dispatch(resetUpdateUser());
            toast('🦄 Update  user successfully!');
        }
    }, [selectedUser, isUpdatedSuccess]);

    const handleUpdateUser = () => {
        if (!updatedUser || !updatedUser.name || !updatedUser.email) {
            alert('Please fill in all fields');
            return;
        }
        dispatch(updateUser(updatedUser))
    };

    return (
        <>
            <Modal show={showUpdateUser} onHide={handleCloseUpdateUser} >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Id"
                        className="mb-3"
                    >
                        <Form.Control type="id" value={updatedUser?.id} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="name"
                            value={updatedUser?.name}
                            onChange={(e) => {
                                setUpdatedUser({...updatedUser, name: e.target.value});
                            }}
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Email">
                        <Form.Control
                            type="email"
                            value={updatedUser?.email}
                            onChange={(e) => {
                                setUpdatedUser({...updatedUser, email: e.target.value});
                            }}
                        />
                    </FloatingLabel>
                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateUser}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Update User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateUserForm;