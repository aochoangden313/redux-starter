import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { fetchListUsers } from '../redux/user/user.slide';
import { useAppDispatch, useAppSelector } from '../redux/hook';


function UsersTable() {


  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUsers);

  useEffect(() => {
    dispatch(fetchListUsers())
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>

  );
}

export default UsersTable;