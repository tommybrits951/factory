import { useState, useContext } from "react";
import axios from "axios";
import { Factory } from "../../App";

const initForm = {
  emp_id: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initForm);
  const [error, setError] = useState("");

  const { login } = useContext(Factory);

  function change(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function submit(e) {
    e.preventDefault();
    const user = formData;
    axios
      .post("http://localhost:9000/users/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        login(res.data);
      })
      .catch((err) => setError("ID or password is incorrect!", err));
  }

  return (
    <form
      onSubmit={submit}
      className="absolute left-56 top-20 p-5 w-3/6 border flex flex-col bg-slate-600 rounded-xl text-white"
    >
      <h2 className="text-4xl mx-auto mb-5 font-cam text-lime-400">
        Employee Login
      </h2>
      <h5 className="text-red-800 text-lg mx-auto">{error}</h5>
      <label className="mx-auto text-lg font-courier font-semibold">
        Employee ID
        <br />
        <input
          className="rounded p-1 text-black"
          type="number"
          minLength={5}
          onChange={change}
          name="emp_id"
          value={formData.emp_id}
          required
        />
      </label>
      <br />
      <label className="mx-auto text-lg font-courier font-semibold">
        Password
        <br />
        <input
          className="rounded p-1 text-black"
          type="password"
          name="password"
          value={formData.password}
          onChange={change}
          required
        />
      </label>
      <br />
      <button
        type="submit"
        className="rounded-xl mx-auto p-2 w-1/4 bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
