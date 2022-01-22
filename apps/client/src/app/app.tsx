import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lounge from './pages/Lounge';
import RoomLogin from './pages/RoomLogin';
import SignUp from './pages/Signup';
import { isAuthenticated } from './services/auth.service';
import { UserProvider } from './contexts/user';
import Setting from './pages/Setting';
import Playground from './pages/Playground';
import PageNotFound from './pages/404';
import About from './pages/About.tsx';

export function App() {
  return (
    <>
      <Navbar />
      <UserProvider>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="join" element={<RoomLogin />}></Route>
          {isAuthenticated() ?
            <>
              <Route path="room/:code" element={<Lounge />}></Route>
              <Route path="room/:code/setting" element={<Setting />}></Route>
              <Route path="room/:code/play" element={<Playground />}></Route>
            </>
            : null}
          <Route path="room/:code/signup" element={<SignUp />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </UserProvider>
      <Footer />
    </>
  );
}

export default App;
