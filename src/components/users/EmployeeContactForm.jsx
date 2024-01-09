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

export default function EmployeeContactForm(props) {
  const { turn, change, formData, clear } = props;

  function changeHandle(e) {
    const { name, value } = e.target;
    return change(name, value);
  }
  function submit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={submit}
      className="p-5 mt-20 shadow-xl ml-5 grid grid-cols-6 bg-stone-900 rounded-2xl"
    >
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span> First Name
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        required
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={changeHandle}
      />

      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span> Last Name
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={changeHandle}
        required
      />

      <label className="mt-3 text-white mr-5 col-start-1">Suffix</label>
      <input
        className="col-span-2 mt-3 rounded-xl text-md p-1"
        type="text"
        name="suffix"
        value={formData.suffix}
        onChange={changeHandle}
      />
      <label className="mt-3 text-white mr-5 col-start-4 p-1">Gender</label>
      <select
        className="rounded-xl mt-3 col-start-5 col-span-2 text-md p-1"
        name="gender"
        onChange={changeHandle}
      >
        <option>Male</option>
        <option>Female</option>
      </select>
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span> Date of Birth
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="date"
        name="dob"
        value={formData.dob}
        onChange={changeHandle}
        required
      />
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        Email
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="email"
        name="email"
        value={formData.email}
        onChange={changeHandle}
      />
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span> Street Address
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="text"
        name="street"
        value={formData.street}
        onChange={changeHandle}
        required
      />
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span> City
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="text"
        name="city"
        value={formData.city}
        onChange={changeHandle}
        required
      />
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span>State/Province
      </label>
      <select
        className="rounded-xl mt-3 text-md p-1"
        name="province"
        onChange={changeHandle}
        required
      >
        {stateAbbr.map((st, idx) => {
          return <option key={idx}>{st}</option>;
        })}
      </select>
      <label className="mt-3 text-white mr-5 col-start-1 col-span-2">
        <span className="text-red-600">*</span>Postal/Zip Code
      </label>
      <input
        className="col-span-4 mt-3 rounded-xl text-md p-1"
        type="number"
        name="postal"
        value={formData.postal}
        onChange={changeHandle}
        required
      />

      <div className="col-start-1 col-span-6 flex justify-between mt-5">
        <button
          className="text-white p-2 bg-red-800 rounded"
          onClick={() => clear()}
        >
          Clear
        </button>
        <button
          name="next"
          onClick={turn}
          className="rounded p-2 bg-green-800 text-white"
        >
          Next
        </button>
      </div>
    </form>
  );
}
