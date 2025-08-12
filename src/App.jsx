import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body.jsx'
import Login from './components/Login.jsx'
import EditProfile from './components/EditProfile.jsx'
import Feed from './components/Feed.jsx'
import { Provider as ReduxProvider } from 'react-redux';
import  appStore from './utils/appStore.js'; // Import the store from utils/appStore.js
import Connections from './components/Connections.jsx';
import Request from './components/Request.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (    
    <>
    <ReduxProvider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />    
          <Route path="profile" element={<EditProfile />} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/requests' element={<Request />}/>
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ReduxProvider>
    </>
  )
}

export default App
