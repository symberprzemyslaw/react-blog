import { Link } from "react-router-dom";
import logo from "./react-logo.png"
import { useState } from "react";

const Navbar = () => {
    const  [ isLogged, setIsLogged ] = useState(false)
    return ( 
        <nav className="navbar">
            <h1>React Blog</h1>
            <img  className="logo" src={logo} alt="Logo of React"></img>
            <div className="links">
                <Link to="/">Home</Link>
            { isLogged  &&  <Link to="/create">New Blog</Link>}
                <Link to="/login">Login</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;