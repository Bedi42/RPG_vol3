import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddSkill from "./AddSkill";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.config";

export default function DashBoard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to Log Out");
    }
  };

  const docRef = doc(db, "characters", currentUser.email);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const unsubscribe = async () =>
      await getDoc(docRef)
        .then((snapshot) => {
          setCharacter(snapshot.data());
        })
        .catch((err) => {
          console.log(err.message);
        });
    return unsubscribe;
  }, [docRef]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <h3 className="text-center">{currentUser.email}</h3>
        </Card.Body>
      </Card>
      <Button
        className="btn btn-primary w-100 mt-3 mb-4 text-white"
        variant="link"
        onClick={handleLogout}
      >
        Log Out
      </Button>
      <ul style={{ textDecoration: "none", listStyle: "none" }}>
        <li>Name: {character.name}</li>
        <li>Race: {character.race}</li>
        <li>Class: {character.class}</li>
      </ul>
      {/* <AddSkill /> */}
    </>
  );
}
