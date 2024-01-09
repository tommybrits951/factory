import { useContext, useState } from "react";
import { Factory } from "../../App";
import { Link } from "react-router-dom";
import Announcements from "./Announcements";
const initAnnounce = {
  open: false,
  data: "",
};

export default function Navbar() {
  const { logout, menuOpen, closeMenu } = useContext(Factory);
  const [announce, setAnnounce] = useState(initAnnounce);
  const [heading, setHeading] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setAnnounce({ ...announce, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
    setHeading(announce.data);
    setAnnounce(initAnnounce);
  };
  const openAnnounce = (e) => {
    const { name } = e.target;
    if (name === "cancel") {
      setAnnounce(initAnnounce);
    } else if (name === "open") {
      setAnnounce({ ...announce, open: true });
    }
  };
  return (
    <nav
      onClick={closeMenu}
      name={"navbar"}
      className="fixed z-10 w-full p-0 top-0 bg-inherit"
    >
      <div className="relative">
        {menuOpen === true ? (
          <button
            className="text-black text-3xl bg-white"
            onClick={closeMenu}
            name="menu"
          >
            &#9778;
          </button>
        ) : (
          <button
            className="text-white text-3xl hover:bg-red-500 p-2"
            onClick={closeMenu}
            name="menu"
          >
            &#9776;
          </button>
        )}
        <ul
          className={`${
            menuOpen === true ? "block" : "hidden"
          } absolute h-auto bg-slate-900 shadow-2xl p-3 rounded w-40`}
        >
          <li className="my-3">
            <Link
              className="no-underline rounded text-white text-lg p-1 hover:text-xl"
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li className="my-3">
            <Link
              className="no-underline rounded text-white text-lg p-1 hover:text-xl"
              to={"/workers"}
            >
              Employees
            </Link>
          </li>
          <li className="my-3">
            <Link
              to={"/vendors"}
              className="no-underline rounded text-white text-lg hover:text-xl"
            >
              Vendors
            </Link>
          </li>
        </ul>
      </div>
      <div className="absolute top-1 left-44 h-7 w-4/6 bg-white">
        <span className="announce">{heading}</span>
        <button
          name="open"
          onClick={openAnnounce}
          className="absolute right-0 text-2xl bottom-0 hover:text-3xl"
        >
          &#9998;
        </button>
      </div>

      <Link
        onClick={logout}
        to={"/"}
        className="absolute text-white end-4 top-2 p-1 rounded-xl hover:text-lg"
      >
        Logout
      </Link>
      {announce.open === false ? null : (
        <Announcements
          change={change}
          announce={announce}
          open={openAnnounce}
          submit={submit}
        />
      )}
    </nav>
  );
}
