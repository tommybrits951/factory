import { useState } from "react";
import { stateAbbr } from "./EmployeeContactForm.jsx";

export default function EmployeeGovForm(props) {
  const { turn, change, submit, formData } = props;

  function changeHandle(e) {
    const { name, value } = e.target;
    return change(name, value);
  }

  function submitHandle(e) {
    return submit(e);
  }

  return (
    <form
      onSubmit={submitHandle}
      className="mt-20 rounded-2xl p-5 shadow-xl ml-5 grid grid-cols-6 bg-stone-900"
    >
      <label className="mt-3 col-start-1 text-white col-span-2">
        Social Seccurity Number
      </label>
      <input
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl"
        type="number"
        name="ssn"
        value={formData.ssn}
        onChange={changeHandle}
      />
      <label className="mt-3 col-start-1 text-white col-span-2">
        ID Number
      </label>
      <input
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl"
        type="text"
        name="dlNumber"
        value={formData.dlNumber}
        onChange={changeHandle}
      />
      <label className="mt-3 col-start-1 text-white col-span-2">
        Issuing State/Province
      </label>
      <select
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl p-1"
        name="dlState"
        onChange={changeHandle}
      >
        {stateAbbr.map((st, idx) => {
          return <option key={idx}>{st}</option>;
        })}
      </select>
      <label className="mt-3 col-start-1 text-white col-span-2">Password</label>
      <input
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl"
        type="password"
        name="password"
        value={formData.password}
        onChange={changeHandle}
      />
      <label className="mt-3 col-start-1 text-white col-span-2">
        Confirm Password
      </label>
      <input
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl"
        type="password"
        name="confirm"
        value={formData.confirm}
        onChange={changeHandle}
      />
      <label className="mt-3 col-start-1 text-white col-span-2">Role</label>
      <select
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl p-1"
        name="role"
        onChange={changeHandle}
      >
        <option value={1}>Floor</option>
        <option value={2}>Shipping</option>
        <option value={3}>Lead</option>
        <option value={4}>Manager</option>
        <option value={5}>Maintanence</option>
        <option value={6}>Admin</option>
        <option value={7}>HR</option>
      </select>
      <label className="mt-3 col-start-1 text-white col-span-2">
        Hire Date
      </label>
      <input
        className="col-start-3 mt-3 col-span-4 h-9 rounded-xl"
        type="date"
        name="hire"
        value={formData.hire}
        onChange={changeHandle}
      />
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span>Primary Phone
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="number"
        name="phone"
        value={formData.phone}
        onChange={changeHandle}
        required
      />
      <div className="col-start-1 col-span-6 flex justify-between mt-5">
        <button
          className="rounded bg-red-800 p-2 text-white"
          name="back"
          onClick={turn}
        >
          Back
        </button>
        <button type="submit" className="rounded p-2 text-white bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );
}
