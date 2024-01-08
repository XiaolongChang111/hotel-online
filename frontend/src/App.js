
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoomDashboard from './components/RoomDashboard';
import Admin from './components/Admin';
import CreateRoom from './components/CreateRoom';
import UpdateRoom from './components/UpdateRoom';
import Customer from './components/Customer';
import AvailableRooms from './components/AvailableRooms';
import BookRoom from './components/BookRoom';
import OrderDetail from './components/OrderDetail';
import AllOrders from './components/AllOrders';
import Header from './components/Header';
import HomePage from './components/HomePage';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='' index element={<HomePage />}/>
        <Route path='register' element={
          <SignUp />
        } />

        <Route path='login' element={
          <SignIn />
        } />

        <Route path='admin' element={<Admin />} >
          <Route index path='' element={<RoomDashboard />}/>
          <Route path='add-room' element={<CreateRoom />}/>
          <Route path='update-room/:roomId' element={<UpdateRoom />}/>
        </Route> 

        <Route path='customer' element={<Customer />} >
          <Route index path='' element={<AvailableRooms />}/>
          <Route path='book/:roomId' element={<BookRoom />}/>
          <Route path='orders' element={<AllOrders />}/>
          <Route path='order/:orderId' element={<OrderDetail />}/>
        </Route> 
        
      </Routes>


      <ToastContainer />
    </>
  );
}

export default App;
