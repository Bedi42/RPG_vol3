import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Alert,
  Form,
  Col,
  Row,
  FloatingLabel,
} from "react-bootstrap";
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
import { auth } from "../Firebase.config";
import ChangeSkill from "./ChangeSkill";

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

  const [skills, setSkill] = useState([]);

  const [hpValue, setHpValue] = useState("");
  const [expValue, setExpValue] = useState("");

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
      <Card className="mb-3">
        <Card.Body>
          <h3 className="text-center mb-4">Profile</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <div style={{ textDecoration: "none", listStyle: "none" }}>
            <h3 className="text-center w-100">
              {character.name} {character.race}
            </h3>
            <h3>Class: {character.class}</h3>
          </div>
          <Form className="mt-3">
            <Form.Group as={Row}>
              <Form.Label>HP</Form.Label>
              <Col sm="8">
                <Form.Range
                  defaultValue={hpValue}
                  onChange={(e) => setHpValue(e.target.value)}
                  tooltip="auto"
                />
              </Col>
              <Col sm="3">
                <Form.Control defaultValue={hpValue} />
              </Col>
            </Form.Group>
          </Form>
          <Form className="mt-3">
            <Form.Group as={Row}>
              <Form.Label>EXP</Form.Label>
              <Col sm="8">
                <Form.Range
                  defaultValue={expValue}
                  onChange={(e) => setExpValue(e.target.value)}
                />
              </Col>
              <Col sm="3">
                <Form.Control defaultValue={expValue} />
              </Col>
            </Form.Group>
          </Form>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Items"
            className="mt-4"
          >
            <Form.Control
              as="textarea"
              // style={{ height: "150px" }}
              // defaultValue={el.Description}
              // ref={itemRef}
            />
          </FloatingLabel>
          <Button
            className="mt-4 w-100 text-center"
            // style={{ width: "100px" }}
            variant="primary"
            size="sm"
            type="submit"
          >
            Update
          </Button>
        </Card.Body>
      </Card>

      <div>
        {skills.map((el, id) => {
          return <ChangeSkill key={id} el={el} id={el.Skill} />;
        })}
      </div>
      <AddSkill />
      <Button
        className="btn btn-primary w-100 mt-3 mb-4 text-white"
        variant="link"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </>
  );
}
