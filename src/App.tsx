import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { increment, decrease } from './redux/counter/counter.slide'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { Button } from 'react-bootstrap';  
import Header from './components/header';
import TabContent from './components/tab.content';
import UsersTable from './components/user.table';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const count  =  useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Header/>
      <TabContent/>
    </>
  )
}

export default App
