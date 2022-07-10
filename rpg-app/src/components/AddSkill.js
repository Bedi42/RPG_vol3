import React, { useState, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function AddSkill() {
  const newSkillRef = useRef();
  const skillDesRef = useRef();

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Card>
        <Card.Body>
          <Form.Group id="newSkill">
            <Form.Label>New Skill</Form.Label>
            <Form.Control
              type="text"
              placeholder="Skill Name"
              required
              ref={newSkillRef}
            />
          </Form.Group>
          <Form.Select className="mt-2" aria-label="Default select example">
            <option>Level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
          <Form.Group id="skillDescription">
            {/* <Form.Label className="mt-4">Skill Description</Form.Label> */}
            <Form.Control
              className="mt-2"
              as="textarea"
              rows={3}
              placeholder="Skill Description"
              required
              ref={skillDesRef}
            />
          </Form.Group>
          <Button
            disabled={loading}
            type="submit"
            className="w-100 text-center mt-2"
          >
            Add Skill
          </Button>
          {/* <Form>
            <Form.Check type="switch" id="custom-switch" label="Active" />
          </Form> */}
          {/* <Form>
            {["checkbox", "radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="1"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group1"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  disabled
                  label="3 (disabled)"
                  type={type}
                  id={`inline-${type}-3`}
                />
              </div>
            ))}
          </Form> */}
        </Card.Body>
      </Card>
    </>
  );
}
