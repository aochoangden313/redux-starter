import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './user.table';
import { Container } from 'react-bootstrap';

function TabContent() {
  return (
    <>
      <Container>

        <Tabs
          defaultActiveKey="user"
          id="uncontrolled-tab-example"
          className="mb-3 mtm-3"
        >
          <Tab eventKey="user" title="User">
            <UsersTable />
          </Tab>
          <Tab eventKey="blog" title="Blog">
            Tab content for Profile 2
          </Tab>
        </Tabs>
      </Container>
    </>

  );
}

export default TabContent;