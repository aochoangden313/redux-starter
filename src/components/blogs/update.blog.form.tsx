import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { resetUpdateBlog, updateBlog } from "../../redux/blog/blog.slide";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';


function UpdateBlogForm(props: any) {

    const { showUpdateBlog, handleCloseUpdateBlog, selectedBlog } = props;

    const isUpdatedSuccess = useAppSelector((state) => state.blog.isUpdatedSuccess);
    const dispatch = useAppDispatch();
    const [updatedBlog, setUpdatedBlog] = useState<any>(selectedBlog);

    useEffect(() => { 
        setUpdatedBlog(selectedBlog);
        if (isUpdatedSuccess) {
            handleCloseUpdateBlog();
            setUpdatedBlog(null);
            // reset redux
            dispatch(resetUpdateBlog());
            toast('🦄 Update  blog successfully!');
        }
    }, [selectedBlog, isUpdatedSuccess]);

    const handleUpdateBlog = () => {
        if (!updatedBlog || !updatedBlog.title || !updatedBlog.author || !updatedBlog.content) {
            alert('Please fill in all fields');
            return;
        }
        dispatch(updateBlog(updatedBlog))
    };

    return (
        <>
            <Modal show={showUpdateBlog} onHide={handleCloseUpdateBlog} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Blog</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Id"
                        className="mb-3"
                    >
                        <Form.Control type="id" value={updatedBlog?.id} disabled />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="Title"
                            value={updatedBlog?.title}
                            onChange={(e) => setUpdatedBlog({...updatedBlog, title: e.target.value})}
                        />
                    </FloatingLabel>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Author"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="author"
                            value={updatedBlog?.author}
                             onChange={(e) => setUpdatedBlog({...updatedBlog, author: e.target.value})}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label=""
                        className="mb-3"
                    >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={5} value={updatedBlog?.content}
                             onChange={(e) => setUpdatedBlog({...updatedBlog, content: e.target.value})}placeholder="Blog content"/>
                        </Form.Group>
                    </FloatingLabel>


                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateBlog}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateBlog}>
                        Update Blog
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateBlogForm;