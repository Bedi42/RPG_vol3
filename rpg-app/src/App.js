import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./App.css";
import { auth } from "./Firebase.config.js";

function App() {
  const [user, setUser] = useState({});
  const registerEmailRef = useRef();
  const registerPasswordRef = useRef();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    login();
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmailRef.current.value,
        registerPasswordRef.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmailRef.current.value,
        loginPasswordRef.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        <input type="text" placeholder="Email..." ref={registerEmailRef} />
        <input
          type="text"
          placeholder="Password..."
          ref={registerPasswordRef}
        />
        <button type="submit">Create User</button>
      </form>

      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type="text" placeholder="Email..." ref={loginEmailRef} />
        <input type="text" placeholder="Password..." ref={loginPasswordRef} />
        <button type="submit">Login</button>
      </form>

      <div>
        <h4>User Logged In:</h4>
        {user?.email}

        <button onClick={logout}>Sing out</button>
      </div>
    </div>
  );
}

export default App;
