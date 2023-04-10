import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const hendelSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("login failed!");
    }
  };
  return (
    <Form style={{ height: "330px" }} onSubmit={hendelSubmit}>
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
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        <span>Login now</span>
      </Button>
      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/Login">Signup</Link> instead.
      </div>
    </Form>
  );
};

export default LoginForm;
