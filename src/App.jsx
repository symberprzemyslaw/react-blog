import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from "./Login";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
const auth = getAuth();

function App() {
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Użytkownik jest zalogowany, user zawiera jego informacje
        setLogged(true)
        console.log('Użytkownik jest zalogowany');
      } else {
        // Użytkownik nie jest zalogowany
        setLogged(false)
        console.log('Użytkownik nie jest zalogowany');
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar logged={logged}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            {logged && <Route path="/create" element={<Create />} />}
            {!logged && <Route path="/login" element={<Login />} />}
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
