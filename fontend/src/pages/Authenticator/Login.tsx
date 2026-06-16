import { useState } from "react";

interface LoginAuthen {
  LoginSuccess: () => void;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

export default function Login({
  LoginSuccess,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}: LoginAuthen) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      LoginSuccess();
    }
  };
  return (
    <>
      <div style={{ margin: "0px auto", textAlign: "center" }}>
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "inline-block", textAlign: "center" }}
        >
          <div>
            <label>Email: </label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label>Password: </label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div style={{ display: "grid", textAlign: "center", gap: "20px" }}>
            <span>
              <button type="submit" style={{ width: "178.22px" }}>
                Log In
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                style={{ width: "178.22px" }}
              >
                Forgot Password
              </button>
            </span>
            <span style={{ paddingTop: "10px" }}>
              <button
                type="button"
                onClick={onSwitchToRegister}
                style={{ width: "178.22px" }}
              >
                Register
              </button>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
