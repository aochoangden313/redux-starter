import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { deleteUser, resetDeleteUser } from "../../redux/user/user.slide";
import { ToastContainer, toast } from 'react-toastify';

function DeleteUserForm(props: any) {

    const { showDeleteUser, handleCloseDeleteUser, selectedDeleteUser } = props;

    const isDeletedSuccess = useAppSelector((state) => state.user.isDeletedSuccess);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isDeletedSuccess) {
            handleCloseDeleteUser();
            // reset redux
            dispatch(resetDeleteUser());
            toast('🦄 Delete user successfully!');
        }
    }, [isDeletedSuccess])

    const handleDeleteUser = () => {
        console.log('selectedDeleteUser >>> ', selectedDeleteUser);
        dispatch(deleteUser(selectedDeleteUser));
    };
    
    return (
        <>
            <Modal show={showDeleteUser} onHide={handleCloseDeleteUser} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User Confirmation</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <p>Are you sure you want to delete this user have id: {selectedDeleteUser?.id}?</p>

                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteUser}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteUserForm;