import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === email
    );

    if (userExists) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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
            Signup
          </button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;