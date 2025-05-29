import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { ToastContainer, toast } from 'react-toastify';
import UpdateBlogForm from './blogs/update.blog.form';
import DeleteBlogForm from './blogs/delete.blog.form';
import { fetchListBlogs } from '../redux/blog/blog.slide';
import CreateBlogForm from './blogs/create.blog.form';

function BlogsTable() {

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const handleClose = () => setIsOpenCreateForm(false);
  const handleShow = () => setIsOpenCreateForm(true);


  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog.listBlogs);

  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const [selectedDeleteBlog, setSelectedDeleteBlog] = useState<any>(null);
  const [showDeleteBlog, setShowDeleteBlog] = useState(false);

  useEffect(() => {
    dispatch(fetchListBlogs())
    // toast('🦄 Wow so easy!');
  }, []);

  const handleCloseUpdateBlog = () => {
    setShowUpdateBlog(false);
    setSelectedBlog(null);
  }


  const handleCloseDeleteBlog = () => {
    setShowDeleteBlog(false);
    setSelectedDeleteBlog(null);
  }

  return (
    <>
      <Container style={{ paddingTop: '20px' }}>
        <Row>
          <Col>Table Blogs</Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={handleShow} variant="primary">
              Create Blog
            </Button></Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map(blog => {
              return (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{blog.content}</td>
                  <td>
                    <Container className="d-flex justify-content-end">
                      <button className="btn btn-primary me-2" onClick={
                        () => {
                          setSelectedBlog(blog);
                          setShowUpdateBlog(true);
                        }
                      }>Edit</button>
                      <button className="btn btn-danger" onClick={
                        () => {
                          setSelectedDeleteBlog(blog);
                          setShowDeleteBlog(true);
                        }
                      }>Delete</button>
                    </Container>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <CreateBlogForm show={isOpenCreateForm} setIsOpenCreateForm={setIsOpenCreateForm} />

        <UpdateBlogForm
          showUpdateBlog={showUpdateBlog}
          handleCloseUpdateBlog={handleCloseUpdateBlog}
          selectedBlog={selectedBlog}
        />

        <DeleteBlogForm
          showDeleteBlog={showDeleteBlog}
          handleCloseDeleteBlog={handleCloseDeleteBlog}
          selectedDeleteBlog={selectedDeleteBlog}
        />
      </Container>
    </>

  );
}

export default BlogsTable;