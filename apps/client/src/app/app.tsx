import { User } from '@icebreaker/shared-types';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
// import NxWelcome from './nx-welcome';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import RoomLogin from './pages/RoomLogin';
import SignUp from './pages/Signup';
import { isAuthenticated } from './services/auth.service';

export function App() {
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    console.log(currentUser);
  }, [isAuthenticated, currentUser])
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="join" element={<RoomLogin />}></Route>
        {isAuthenticated() ? 
          <>
            <Route path="room/:code" element={<Lounge />}></Route>
          </>
        : null}
        <Route path="room/:code/signup" element={<SignUp setCurrentUser={setCurrentUser} />}></Route>
      </Routes>
      {/* <NxWelcome /> */}
      <Footer />
    </>
  );
}

export default App;
