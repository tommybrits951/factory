import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Employee() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-80 ">
      {user !== null ? (
        <div className="mt-10 pt-16 absolute left-1/4 p-8 rounded-2xl">
          <h2 className="text-6xl m-5 font-times text-red-700 mt-25">
            {user.first_name} {user.last_name} {user.suffix}
          </h2>
          <h3 className="text-3xl text-white font-mono">
            Employee Number: <span>{user.id}</span>
          </h3>
          <h3 className="text-3xl text-white font-mono">
            Birth Date: {new Date(user.dob).getMonth() + 1}/
            {new Date(user.dob).getDate()}/{new Date(user.dob).getFullYear()}
          </h3>
          <h3 className="text-3xl mt-6 text-white font-mono">
            Address: {user.street} <br /> {user.city}, {user.province} <br />
            {user.postal}
            {new Date(user.dob).getDate()}/{new Date(user.dob).getFullYear()}
          </h3>
        </div>
      ) : null}
    </div>
  );
}
