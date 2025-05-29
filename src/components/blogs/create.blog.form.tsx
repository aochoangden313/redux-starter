import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createNewBlog, resetCreateBlog } from "../../redux/blog/blog.slide";
import { ToastContainer, toast } from 'react-toastify';


function CreateBlogForm(props: any) {

    const { show, setIsOpenCreateForm } = props;
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const dispatch = useAppDispatch();
    const isCreatedSuccess = useAppSelector((state) => state.blog.isCreatedSuccess);

    useEffect(() => {
        if (isCreatedSuccess) {
            setIsOpenCreateForm(false);
            toast('🦄 Create  blog successfully!');
            setBlogTitle('');
            setBlogAuthor('');
            setBlogContent('');
            // reset redux
            dispatch(resetCreateBlog());
        }

    }, [isCreatedSuccess])

    const handleCreateBlog = () => {
        if (blogTitle === '' || blogAuthor === '' || blogContent === '') {
            alert('Please fill in all fields');
            return;
        }
        dispatch(createNewBlog({ title: blogTitle, author: blogAuthor, content: blogContent }));
        // Here you would typically send the user data to your backend API
    }


    return (
        <>
            <Modal show={show} onHide={() => setIsOpenCreateForm(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Create Blog</Modal.Title>
                </Modal.Header>

                <Container style={{ padding: '20px' }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="your name"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                        />
                    </FloatingLabel>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Author"
                        className="mb-3"
                    >
                        <Form.Control
                            placeholder="author"
                            value={blogAuthor}
                            onChange={(e) => setBlogAuthor(e.target.value)}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label=""
                        className="mb-3"
                    >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={5} value={blogContent} onChange={(e) => setBlogContent(e.target.value)} placeholder="Blog content"/>
                        </Form.Group>
                    </FloatingLabel>


                </Container>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpenCreateForm(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateBlog}>
                        Create Blog
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default CreateBlogForm;