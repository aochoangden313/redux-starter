import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { fetchListUsers } from '../redux/user/user.slide';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { ToastContainer, toast } from 'react-toastify';
import UpdateUserForm from './users/update.user.form';
import DeleteUserForm from './users/delete.user.form';

function UsersTable() {

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUsers);

  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [selectedDeleteUser, setSelectedDeleteUser] = useState<any>(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const handleShow = () => setIsOpenCreateForm(true);


  useEffect(() => {
    dispatch(fetchListUsers())
    // toast('🦄 Wow so easy!');
  }, []);

  const handleCloseUpdateUser = () => {
    setShowUpdateUser(false);
    setSelectedUser(null);
  }


  const handleCloseDeleteUser = () => {
    setShowDeleteUser(false);
    setSelectedDeleteUser(null);
  }

  return (
    <>
      <Container style={{ paddingTop: '20px' }}>
        <Row>
          <Col>Table Users</Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={handleShow} variant="primary">
              Create User
            </Button></Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Container className="d-flex justify-content-end">
                      <button className="btn btn-primary me-2" onClick={
                        () => {
                          setSelectedUser(user);
                          setShowUpdateUser(true);
                        }
                      }>Edit</button>
                      <button className="btn btn-danger" onClick={
                        () => {
                          setSelectedDeleteUser(user);
                          setShowDeleteUser(true);
                        }
                      }>Delete</button>
                    </Container>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <UpdateUserForm
          showUpdateUser={showUpdateUser}
          handleCloseUpdateUser={handleCloseUpdateUser}
          selectedUser={selectedUser}
        />

        <DeleteUserForm
          showDeleteUser={showDeleteUser}
          handleCloseDeleteUser={handleCloseDeleteUser}
          selectedDeleteUser={selectedDeleteUser}
        />
      </Container>
    </>

  );
}

export default UsersTable;