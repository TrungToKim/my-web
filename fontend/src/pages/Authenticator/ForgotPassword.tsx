import { useState } from "react";

interface forgotPass {
  ForgotPass: () => void;
}

export default function ForgotPassword({ ForgotPass }: forgotPass) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      ForgotPass();
    }
  };

  return (
    <div style={{ margin: "0px auto", textAlign: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "center" }}
      >
        <h2>Forgot Password</h2> <br />
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
        <div style={{ display: "grid", textAlign: "center", gap: "10px" }}>
          <button type="submit">Reset Password</button>
          <button type="button" onClick={ForgotPass}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
