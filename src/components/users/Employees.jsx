import EmployeeGovForm from "./EmployeeGovForm.jsx";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import EmployeeContactForm from "./EmployeeContactForm.jsx";
const initForm = {
  first_name: "",
  last_name: "",
  suffix: "",
  gender: "male",
  dob: "",
  street: "",
  city: "",
  province: "AL",
  postal: "",
  phone: "",
  cell: "",
  ssn: "",
  dlNumber: "",
  dlState: "AL",
  email: "",
  role: 1,
  password: "",
  confirm: "",
  hire: "",
};

export default function Employees() {
  const [formData, setFormData] = useState(initForm);
  const [page, setPage] = useState(0);
  const [employees, setEmployees] = useState(null);
  const [errors, setErrors] = useState("");

  function change(name, value) {
    return setFormData({ ...formData, [name]: value });
  }

  function getEmployees() {
    axios
      .get("http://localhost:9000/users")
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error(err);
        setErrors(err);
      });
  }

  function clear() {
    return setFormData(initForm);
  }

  function turnPage(e) {
    const { name } = e.target;
    return name === "next" ? setPage(page + 1) : setPage(page - 1);
  }
  function submit(e) {
    e.preventDefault();
    const newEmp = {
      ...formData,
      postal: parseInt(formData.postal),
      phone: parseInt(formData.phone),
      cell: formData.cell.length > 0 ? parseInt(formData.cell) : null,
      ssn: parseInt(formData.ssn),
    };
    axios
      .post("http://localhost:9000/users/add", newEmp)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setErrors(err);
      })
      .finally(() => {
        clear();
        redirect("/");
      });
  }
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="columns-2">
      {page === 0 ? (
        <EmployeeContactForm
          turn={turnPage}
          change={change}
          clear={clear}
          formData={formData}
        />
      ) : (
        <EmployeeGovForm
          submit={submit}
          turn={turnPage}
          formData={formData}
          change={change}
        />
      )}
      <ul className="mt-20 mx-5 rounded-xl btn-list shadow-xl bg-stone-900 border-2 overflow-y-scroll">
        {employees !== null
          ? employees.map((emp, idx) => {
              return (
                <Link key={idx} to={`/workers/${idx + 1}`}>
                  <li className="ml-5 m-3 text-white bg-slate-900 text-center border-2 rounded p-5">
                    <h5>
                      {emp.first_name} {emp.last_name}
                    </h5>
                  </li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
}
