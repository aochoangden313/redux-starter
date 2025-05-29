import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './user.table';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import CreateUserForm from './users/create.user.form';
import BlogsTable from './blog.table';

function TabContent() {

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const handleClose = () => setIsOpenCreateForm(false);


  return (
    <>
      <Container style={{ paddingTop: '20px' }}>

        <Tabs
          defaultActiveKey="user"
          id="uncontrolled-tab-example"
          className="mb-3 mtm-3"
        >
          <Tab eventKey="user" title="User">
            <UsersTable />
          </Tab>
          <Tab eventKey="blog" title="Blog">
            <BlogsTable />
          </Tab>
        </Tabs>
      </Container>

      <CreateUserForm show={isOpenCreateForm} setIsOpenCreateForm={setIsOpenCreateForm} />
    </>

  );
}

export default TabContent;