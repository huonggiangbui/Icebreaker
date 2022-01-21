import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
// import NxWelcome from './nx-welcome';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import RoomLogin from './pages/RoomLogin';
import SignUp from './pages/Signup';

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="join" element={<RoomLogin />}></Route>
        <Route path="room/:code" element={<Lounge />}></Route>
        <Route path="room/:code/signup" element={<SignUp />}></Route>
      </Routes>
      {/* <NxWelcome /> */}
      <Footer />
    </>
  );
}

export default App;
