import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const initForm = {
  machine: "",
  job: "",
  part_id: "",
  lot: "",
  amount: "",
};

export default function JobForm() {
  const [formData, setFormData] = useState(initForm);
  const [partList, setPartList] = useState(null);
  const { id } = useParams();

  function change(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function submit(e) {
    e.preventDefault();
  }
  useEffect(() => {
    axios
      .get("http://localhost:9000/parts/list")
      .then((res) => {
        console.log(res.data);
        setPartList(res.data);
      })
      .catch((err) => console.error(err));
    setFormData({ ...formData, machine: id });
  }, []);
  return (
    <div className="pt-36">
      <form
        className="w-2/6 border-2 bg-stone-800 flex flex-col justify-center p-5 rounded-xl mx-auto"
        onSubmit={submit}
      >
        <h5 className="text-4xl text-slate-500 mx-auto">
          Machine <span className="text-4xl">{id}</span>
        </h5>
        <label className="text-white mx-auto">
          Job Number
          <br />
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={change}
            className="rounded text-black p-1"
          />
        </label>
        <br />
        <label className="text-white mx-auto">
          Select Part
          <br />
          <select
            name="part_id"
            onChange={change}
            className="text-black p-1 rounded"
          >
            {partList === null
              ? null
              : partList.map((part, idx) => {
                  return (
                    <option value={part.id} key={idx}>
                      #{part.id}
                    </option>
                  );
                })}
          </select>
          <Link to={"/parts"} className="text-slate-400 ms-3">
            Add Part
          </Link>
        </label>
        <br />
        <label className="text-white mx-auto">
          Lot Number
          <br />
          <input
            type="text"
            onChange={change}
            name="lot"
            value={formData.lot}
            className="text-black p-1 rounded"
          />
        </label>
        <br />
        <label className="text-white mx-auto">
          Amount
          <br />
          <input
            type="number"
            onChange={change}
            name="amount"
            value={formData.amount}
            className="text-black p-1 rounded"
          />
        </label>
        <br />
        <button
          type="submit"
          className="rounded text-white bg-green-900 w-2/6 mx-auto p-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
