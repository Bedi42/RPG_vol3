import React, { useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { auth } from "../Firebase.config";
import { Timestamp } from "firebase/firestore";
import Accordion from "react-bootstrap/Accordion";

export default function AddSkill() {
  const newSkillRef = useRef();
  const skillDesRef = useRef();
  const levelRef = useRef();

  // const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(
        db,
        "characters",
        auth.currentUser.email,
        "skills",
        newSkillRef.current.value
      ),
      {
        date: Timestamp.fromDate(new Date()),
        Skill: newSkillRef.current.value,
        Level: levelRef.current.value,
        Description: skillDesRef.current.value,
      }
    );
  };

  return (
    <>
      {/* <Card>
        <Card.Body> */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>New Skill</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group id="newSkill">
                <Form.Control
                  type="text"
                  placeholder="Skill Name"
                  required
                  ref={newSkillRef}
                />
              </Form.Group>
              <Form.Select
                ref={levelRef}
                className="mt-2"
                aria-label="Default select example"
              >
                <option>Level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Form.Group id="skillDescription">
                <Form.Control
                  className="mt-2"
                  as="textarea"
                  rows={3}
                  placeholder="Skill Description"
                  required
                  ref={skillDesRef}
                />
              </Form.Group>
              <Button type="submit" className="w-100 text-center mt-2">
                Add Skill
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* </Card.Body>
      </Card> */}
    </>
  );
}
