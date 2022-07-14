// import React from "react";
// import { useEffect } from "react";
// import { useState, useRef } from "react";
// import { Button, Form } from "react-bootstrap";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// export default function ChangeSkill({ el, handleUpdate, id }) {
//   const [value, setValue] = useState();
//   const levelRef = useRef();
//   const descRef = useRef();

//   useEffect(() => {
//     setValue({
//       date: el.date,
//       Skill: el.Skill,
//       Level: levelRef.current.value,
//       Description: descRef.current.value,
//     });
//   }, [levelRef, descRef]);

//   const handleSubmit = (id, value) => {
//     handleUpdate(id, value);
//   };

//   return (
//     <Form
//       key={id}
//       onSubmit={() => handleSubmit(id, value)}
//       style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}
//     >
//       <div>{el.Skill}</div>
//       {/* <label htmlFor="">
//         Level
//         <input type="text" deafultValue={el.Level} ref={levelRef} />
//       </label> */}
//       <Form.Select
//         style={{ width: "70px" }}
//         ref={levelRef}
//         className="mt-2 mb-2"
//         size="sm"
//         aria-label="Default select example"
//       >
//         <option>{el.Level}</option>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </Form.Select>
//       {/* <label htmlFor="">Description:</label> */}
//       {/* <input type="text" defaultValue={el.Description} ref={descRef} /> */}
//       <FloatingLabel controlId="floatingTextarea" label="Description">
//         <Form.Control
//           as="textarea"
//           style={{ height: "150px" }}
//           defaultValue={el.Description}
//           ref={descRef}
//         />
//       </FloatingLabel>

//       <Button
//         className="mt-2"
//         style={{ width: "100px" }}
//         variant="primary"
//         size="sm"
//         type="submit"
//       >
//         Change
//       </Button>
//     </Form>
//   );
// }

import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase.config";
import { auth } from "../Firebase.config";

export default function ChangeSkill({ el, id }) {
  //   const [value, setValue] = useState();
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
  return (
    <Form
      key={id}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}
    >
      <div>{el.Skill}</div>
      {/* <label htmlFor="">
        Level
        <input type="text" deafultValue={el.Level} ref={levelRef} />
      </label> */}
      <Form.Select
        style={{ width: "70px" }}
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
      </Form.Select>
      {/* <label htmlFor="">Description:</label> */}
      {/* <input type="text" defaultValue={el.Description} ref={descRef} /> */}
      <FloatingLabel controlId="floatingTextarea" label="Description">
        <Form.Control
          as="textarea"
          style={{ height: "150px" }}
          defaultValue={el.Description}
          ref={descRef}
        />
      </FloatingLabel>

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
  );
}
