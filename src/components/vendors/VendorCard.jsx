import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VendorCard() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/vendors/${id}`)
      .then((res) => {
        console.log(res.data);
        setVendor(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="pt-5">
      {vendor !== null ? <h2 className="mt-5">{vendor.company_name}</h2> : null}
    </div>
  );
}
