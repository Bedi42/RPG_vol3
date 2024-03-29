import React from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { auth } from "../Firebase.config";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";

export default function ChangeSkill({ el, id }) {
  const levelRef = useRef();
  const descRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(
      doc(db, "characters", auth.currentUser.email, "skills", id),
      {
        Level: levelRef.current.value,
        Description: descRef.current.value,
      }
    );
  };

  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {el.Skill} {el.Level}
        </Accordion.Header>
        <Accordion.Body>
          <Form
            key={id}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "30px",
            }}
          >
            <Form.Select
              ref={levelRef}
              className="mt-2 mb-2"
              size="sm"
              aria-label="Default select example"
            >
              <option>{el.Level}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
            <FloatingLabel controlId="floatingTextarea" label="Description">
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                defaultValue={el.Description}
                ref={descRef}
              />
            </FloatingLabel>

            <Form.Check
              onChange={toggler}
              type="switch"
              id="custom-switch"
              label="Active"
            />
            {toggle ? (
              <Form.Group>
                <Form.Check
                  inline
                  label="1"
                  name="group1"
                  type="checkbox"
                  id="checkbox1"
                />
                <Form.Check
                  inline
                  label="2"
                  name="group1"
                  type="checkbox"
                  id="checkbox2"
                />
                <Form.Check
                  inline
                  label="3"
                  name="group1"
                  type="checkbox"
                  id="checkbox3"
                />
                <Form.Check
                  inline
                  label="4"
                  name="group1"
                  type="checkbox"
                  id="checkbox4"
                />
                <Form.Check
                  inline
                  label="5"
                  name="group1"
                  type="checkbox"
                  id="checkbox5"
                />
              </Form.Group>
            ) : null}

            <Button
              className="mt-2"
              style={{ width: "100px" }}
              variant="primary"
              size="sm"
              type="submit"
            >
              Change
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
