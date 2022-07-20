// import React, { useState, useRef } from "react";
// import { Card, Form, Button } from "react-bootstrap";
// import { setDoc, doc } from "firebase/firestore";
// import { db } from "../Firebase.config";
// import { auth } from "../Firebase.config";
// import { Timestamp } from "firebase/firestore";
// import Accordion from "react-bootstrap/Accordion";

// export default function AddStatistics() {
//   const charLevelRef = useRef();
//   const hpRef = useRef();
//   const maxHpRef = useRef();
//   const expRef = useRef();
//   const itemsRef = useRef();

//   const handleStat = async (e) => {
//     e.preventDefault();

//     await setDoc(
//       doc(
//         db,
//         "characters",
//         auth.currentUser.email,
//         "statistics",
//         auth.currentUser.email
//       ),
//       {
//         date: Timestamp.fromDate(new Date()),
//         Level: charLevelRef.current.value,
//         HP: hpRef.current.value,
//         MAXHP: maxHpRef.current.value,
//         EXP: expRef.current.value,
//         Items: itemsRef.current.value,
//       }
//     );
//   };

//   return (
//     <>
//       {/* <Card>
//         <Card.Body> */}
//       <Accordion>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>Statistics</Accordion.Header>
//           <Accordion.Body>
//             <Form onSubmit={handleStat}>
//               <Form.Select
//                 ref={charLevelRef}
//                 className="mt-2"
//                 aria-label="Default select example"
//               >
//                 <option>Level</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//                 <option value="6">6</option>
//                 <option value="7">7</option>
//                 <option value="8">8</option>
//                 <option value="9">9</option>
//                 <option value="10">10</option>
//                 <option value="11">11</option>
//                 <option value="12">12</option>
//                 <option value="13">13</option>
//                 <option value="14">14</option>
//                 <option value="15">15</option>
//                 <option value="16">16</option>
//                 <option value="17">17</option>
//                 <option value="18">18</option>
//                 <option value="19">19</option>
//                 <option value="20">20</option>
//                 <option value="21">21</option>
//                 <option value="22">22</option>
//                 <option value="23">23</option>
//                 <option value="24">24</option>
//                 <option value="25">25</option>
//                 <option value="26">26</option>
//                 <option value="27">27</option>
//                 <option value="28">28</option>
//                 <option value="29">29</option>
//                 <option value="30">30</option>
//               </Form.Select>
//               <Form.Group id="HP">
//                 <Form.Control
//                   type="text"
//                   placeholder="HP"
//                   required
//                   ref={hpRef}
//                 />
//                 <Form.Control
//                   type="text"
//                   placeholder="MAX HP"
//                   required
//                   ref={maxHpRef}
//                 />
//               </Form.Group>
//               <Form.Group id="EXP">
//                 <Form.Control
//                   type="text"
//                   placeholder="EXP"
//                   required
//                   ref={expRef}
//                 />
//               </Form.Group>
//               <Form.Group id="Items">
//                 <Form.Control
//                   className="mt-2"
//                   as="textarea"
//                   rows={3}
//                   placeholder="Items"
//                   required
//                   defaultValue={itemsRef.value}
//                   ref={itemsRef}
//                 />
//               </Form.Group>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button
//                   type="submit"
//                   style={{ width: "150px" }}
//                   className="text-center mt-2"
//                 >
//                   Add Statistics
//                 </Button>
//                 <Button
//                   className="text-center mt-2"
//                   style={{ width: "150px" }}
//                   variant="primary"
//                   type="submit"
//                 >
//                   Change
//                 </Button>
//               </div>
//             </Form>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//       {/* </Card.Body>
//       </Card> */}
//     </>
//   );
// }
