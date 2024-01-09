import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const stateAbbr = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const initForm = {
  company_name: "",
  street: "",
  city: "",
  province: "",
  postal: "",
  phone: "",
  email: "",
  service: "material",
};

export default function Vendors() {
  const [formData, setFormData] = useState(initForm);
  const [vendors, setVendors] = useState([]);

  function change(e) {
    const { name, value } = e.target;
    return setFormData({ ...formData, [name]: value });
  }
  function clear() {
    setFormData(initForm);
  }
  function submit(e) {
    e.preventDefault();
    const vendor = {
      ...formData,
      postal: parseInt(formData.postal),
      phone: parseInt(formData.phone),
    };
    axios
      .post("http://localhost:9000/vendors/add", vendor)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        clear();
      });
  }
  useEffect(() => {
    axios
      .get("http://localhost:9000/vendors")
      .then((res) => {
        console.log(res.data);
        setVendors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="grid grid-cols-2">
      <form
        onSubmit={submit}
        className="col-start-1 p-5 mt-20 mx-5 grid grid-cols-6 bg-stone-900 rounded-xl"
      >
        <h3 className="text-4xl text-red-700 col-start-1 col-span-6 text-center mb-5">
          Add Vendor
        </h3>
        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Company Name
        </label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={change}
          required
          className="rounded-xl col-start-3 h-8 col-span-4 mt-3 text-black"
        />

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Phone
        </label>
        <input
          type="number"
          minLength={10}
          maxLength={10}
          name="phone"
          value={formData.phone}
          onChange={change}
          required
          className="rounded-xl col-start-3 h-8 col-span-4 mt-3 text-black"
        />

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Street Address
        </label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={change}
          required
          className="rounded-2xl text-black h-8 col-start-3 col-span-4 mt-3"
        />

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          City
        </label>
        <input
          className="rounded-xl col-start-3 h-8 col-span-4 mt-3 text-black"
          type="text"
          name="city"
          value={formData.city}
          onChange={change}
          required
        />

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          State/Province
        </label>
        <select
          name="province"
          onChange={change}
          className="rounded-2xl py-0 px-5 text-black h-8 col-start-3 col-span-4 mt-3"
          required
        >
          {stateAbbr.map((st, idx) => {
            return <option key={idx}>{st}</option>;
          })}
        </select>

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Postal/Zip Code
        </label>
        <input
          type="number"
          minLength={5}
          name="postal"
          value={formData.postal}
          onChange={change}
          className="rounded-xl col-start-3 h-8 col-span-4 mt-3 text-black "
        />
        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={change}
          className="rounded-xl col-start-3 h-8 col-span-4 mt-3 text-black"
        />

        <label className="col-start-1 col-span-2 mt-3 text-white w-6/6">
          Service
        </label>
        <select
          name="service"
          onChange={change}
          className="rounded-2xl py-0 px-5 text-black h-8 col-start-3 col-span-4 mt-3"
        >
          <option value={"material"}>Material</option>
          <option value={"molds"}>Molds</option>
          <option value={"hardware"}>Hardware</option>
        </select>
        <div className="col-start-1 col-span-6 flex mt-5 justify-between">
          <button className="rounded bg-red-800 p-2 text-white" onClick={clear}>
            Clear
          </button>
          <button type="submit" className="rounded bg-green-800 text-white p-2">
            Submit
          </button>
        </div>
      </form>
      <ul className="col-start-2 px-1 py-1 border-2 h-1/4 mr-5 rounded-2xl btn-list overflow-y-scroll">
        {vendors
          ? vendors.map((vend, idx) => {
              return (
                <Link key={idx} to={`/vendors/${idx + 1}`}>
                  <li className="border-2 flex justify-around bg-slate-900 text-white h-20 rounded-2xl p-2">
                    <h5>{vend.company_name}</h5>
                    <p className="text-red-600 font-cam">
                      phone: <span className="text-white">{vend.phone}</span>
                    </p>
                  </li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
}
