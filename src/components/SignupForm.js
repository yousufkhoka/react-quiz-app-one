import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

const SingupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const hendelSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("contirm password is incorrect");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("err.message");
    }
  };

  return (
    <Form style={{ height: "500px" }} onSubmit={hendelSubmit}>
      <TextInput
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextInput
        type="email"
        placeholder="Enter Email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Enter Password"
        icon="lock"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Confirm Password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Checkbox
        required
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/Login">Login</Link> instead.
      </div>
    </Form>
  );
};

export default SingupForm;
