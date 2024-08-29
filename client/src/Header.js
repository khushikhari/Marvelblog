import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('https://marvelblog-mi9u.vercel.app/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user profile');
        }
      })
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error(error);
        setUserInfo(null); // Optionally clear user info on error
      });
  }, [setUserInfo]);

  function logout() {
    fetch('https://marvelblog-mi9u.vercel.app/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          setUserInfo(null);
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => {
        console.error(error);
        // Optionally handle logout error
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MARVEL-VERSE</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
