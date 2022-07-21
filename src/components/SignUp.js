import React, { useState, useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef();
  const raceRef = useRef();
  const classRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords are not the same");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Account is not created");
    }
    setLoading(false);

    await setDoc(doc(db, "characters", emailRef.current.value), {
      name: nameRef.current.value,
      race: raceRef.current.value,
      class: classRef.current.value,
    });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm the password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <h2 className="text-center mt-4 mb-4">Create Your Character</h2>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef} />
            </Form.Group>
            <Form.Group id="race">
              <Form.Label>Race</Form.Label>
              <Form.Control type="text" required ref={raceRef} />
            </Form.Group>
            <Form.Group id="class">
              <Form.Label>Class</Form.Label>
              <Form.Control type="text" required ref={classRef} />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
