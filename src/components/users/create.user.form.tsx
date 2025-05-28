import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createNewUser, resetCreateUser } from "../../redux/user/user.slide";
import { ToastContainer, toast } from 'react-toastify';


function CreateUserForm(props: any) {

    const { show, setIsOpenCreateForm } = props;
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const dispatch = useAppDispatch();
    const isCreatedSuccess = useAppSelector((state) => state.user.isCreatedSuccess);

    useEffect(() => {
        if (isCreatedSuccess) {
            setIsOpenCreateForm(false);
            toast('🦄 Create  user successfully!');
            setUserName('');
            setUserEmail('');
            // reset redux
            dispatch(resetCreateUser());
        }

    }, [isCreatedSuccess])

    const handleCreateUser = () => {
        if (userName === '' || userEmail === '') {
            alert('Please fill in all fields');
            return;
        }
        dispatch(createNewUser({ name: userName, email: userEmail }));
        // Here you would typically send the user data to your backend API
    }


    return (
        <>
            <Modal show={show} onHide={() => setIsOpenCreateForm(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}

                        />
                    </FloatingLabel>

                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpenCreateForm(false)}> 
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateUser}>
                        Create User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CreateUserForm;