import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
// import NxWelcome from './nx-welcome';
import Home from './pages/Home';

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      {/* <NxWelcome /> */}
      <Footer />
    </>
  );
}

export default App;
