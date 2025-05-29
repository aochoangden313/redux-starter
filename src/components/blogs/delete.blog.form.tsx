import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { deleteBlog, resetDeleteBlog } from "../../redux/blog/blog.slide";
import { ToastContainer, toast } from 'react-toastify';

function DeleteBlogForm(props: any) {

    const { showDeleteBlog, handleCloseDeleteBlog, selectedDeleteBlog } = props;

    const isDeletedSuccess = useAppSelector((state) => state.blog.isDeletedSuccess);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isDeletedSuccess) {
            handleCloseDeleteBlog();
            // reset redux
            dispatch(resetDeleteBlog());
            toast('🦄 Delete blog successfully!');
        }
    }, [isDeletedSuccess])

    const handleDeleteBlog = () => {
        console.log('selectedDeleteBlog >>> ', selectedDeleteBlog);
        dispatch(deleteBlog(selectedDeleteBlog));
    };
    
    return (
        <>
            <Modal show={showDeleteBlog} onHide={handleCloseDeleteBlog} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog Confirmation</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <p>Are you sure you want to delete this post: {selectedDeleteBlog?.title}?</p>

                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteBlog}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteBlog}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteBlogForm;