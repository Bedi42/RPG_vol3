import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <h3 className="text-center">{currentUser.email}</h3>

          {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2"> */}
      <Button
        className="btn btn-primary w-100 mt-3 text-white"
        variant="link"
        onClick={handleLogout}
      >
        Log Out
      </Button>
      {/* </div> */}
    </>
  );
}
