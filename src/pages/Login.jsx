import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (user) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Login
          </button>
        </form>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;