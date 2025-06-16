import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { data } from "../restApi.json";
import { useNavigate } from "react-router-dom";  
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check login status and user name from localStorage on component mount
    if (localStorage.getItem("isLoggedIn") === "true") {
      setLoggedIn(true);
      setUserName(localStorage.getItem("userName") || "");
    } else {
      setLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    setUserName("");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="logo">Pichuka Restaurant</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          {loggedIn ? (
            <div className="loggedInUserContainer">
              <span className="userNameDisplay">Welcome, {userName}!</span>
              <button 
                className="menuBtn"
                onClick={handleLogout} 
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="menuBtn"
              onClick={() => navigate('/login')} 
            >
              Login/Signup
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
