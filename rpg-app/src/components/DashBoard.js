import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddSkill from "./AddSkill";
import {
  collection,
  doc,
  getDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../Firebase.config";
// import { async } from "@firebase/util";
import { auth } from "../Firebase.config";

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
  }, []);

  const colRef = query(
    collection(db, "characters", auth.currentUser.email, "skills"),
    orderBy("date")
  );

  const [skill, setSkill] = useState([]);

  useEffect(() => {
    setSkill([]);
    const unsubscribe = async () =>
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setSkill((prev) => [
              ...prev,
              {
                date: doc.data().date.toDate().toDateString(),
                Skill: doc.data().Skill,
                Level: doc.data().Level,
                Description: doc.data().Description,
              },
            ]);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    return unsubscribe;
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Profile</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <h3 className="text-center">{currentUser.email}</h3> */}
          <div style={{ textDecoration: "none", listStyle: "none" }}>
            <h3>Name: {character.name}</h3>
            <h3>Race: {character.race}</h3>
            <h3>Class: {character.class}</h3>
          </div>
        </Card.Body>
      </Card>
      <Button
        className="btn btn-primary w-100 mt-3 mb-4 text-white"
        variant="link"
        onClick={handleLogout}
      >
        Log Out
      </Button>

      <ul>
        {skill.map((el, id) => {
          return (
            <div key={id}>
              <div>{el.Skill}</div>
              <div>Level: {el.Level}</div>
              <div>Description: {el.Description}</div>
            </div>
          );
        })}
      </ul>
      <AddSkill />
    </>
  );
}
