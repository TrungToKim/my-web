import { useState } from "react";

interface RegisterProps {
  RegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function Register({
  RegisterSuccess,
  onSwitchToLogin,
}: RegisterProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && password) {
      RegisterSuccess();
    }
  };

  return (
    <div style={{ margin: "0px auto", textAlign: "center" }}>
      <form
        onSubmit={handleRegister}
        style={{ display: "inline-block", textAlign: "center" }}
      >
        <h2>Register</h2> <br />
        <div>
          <label>Email: </label> <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>{" "}
        <br />
        <div>
          <label>Name: </label> <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>{" "}
        <br />
        <div>
          <label>Password: </label> <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>{" "}
        <br />
        <div style={{ display: "grid", textAlign: "center", gap: "20px" }}>
          <button type="submit">Register</button>
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
