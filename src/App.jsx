import VendorCard from "./components/vendors/VendorCard";
import "./App.css";
import { Routes, Route, redirect } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Login from "./components/users/Login.jsx";
import Navbar from "./components/nav/Navbar.jsx";
import Monitor from "./components/floor/Monitor.jsx";
import JobForm from "./components/floor/JobForm.jsx";
import Vendors from "./components/vendors/Vendors.jsx";
import Employee from "./components/users/Employee.jsx";
import Employees from "./components/users/Employees.jsx";
export const Factory = createContext();
const initUser = {
  token: null,
};

let arr = [];
for (let i = 1; i <= 20; i++) {
  const mach = {
    number: i,
    priority: 0,
    job: "",
    part_id: "",
    part_name: "",
    amount: "",
    time: "",
    material: "",
    lot: "",
    status: "no job",
  };
  arr.push(mach);
}
function App() {
  const [user, setUser] = useState(initUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [machines, setMachines] = useState(arr);

  function closeMenu(e) {
    const { name } = e.target;
    if (name && name === "menu") {
      return setMenuOpen(true);
    } else {
      return setMenuOpen(false);
    }
  }
  function login(emp) {
    setUser(emp);
    return redirect("/");
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    return redirect("/");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      redirect("/");
    }
  }, []);

  return (
    <div onClick={closeMenu} className="w-100 h-screen bg-slate-800">
      <Factory.Provider
        value={{
          user,
          menuOpen,
          logout,
          closeMenu,
          login,
          machines,
          setMachines,
        }}
      >
        {!localStorage.getItem("token") ? (
          <Routes>
            <Route element={<Login />} path="/" />
          </Routes>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Monitor />} />
              <Route path="/monitor/:id" element={<JobForm />} />
              <Route path="/workers" element={<Employees />} />
              <Route path="workers/:id" element={<Employee />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendors/:id" element={<VendorCard />} />
            </Routes>
          </>
        )}
      </Factory.Provider>
    </div>
  );
}

export default App;
