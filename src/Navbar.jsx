import { Link } from "react-router-dom";
import logo from "./react-logo.png"

import { getAuth, signOut } from "firebase/auth";

const Navbar = ({logged}) => {
    const auth = getAuth()
    const logout = async () => {
        await signOut(auth)
    }
    return ( 
        <nav className="navbar">
            <h1>React Blog</h1>
            <img  className="logo" src={logo} alt="Logo of React"></img>
            <div className="links">
                <Link to="/">Home</Link>
                { logged  &&  <Link to="/create">New Blog</Link>}
                { !logged && <Link to="/login">Login</Link>}
                { logged && <a onClick={logout}>Log-out</a>}
            </div>
        </nav>
     );
}
 
export default Navbar;