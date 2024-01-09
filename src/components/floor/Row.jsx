import { Link } from "react-router-dom";
export default function Row(props) {
  const { machine } = props;
  return (
    <div
      className={`mon-row border-l-2 text-center ${
        machine.status === "running"
          ? "bg-green-800"
          : machine.status === "down"
          ? "bg-red-800"
          : "bg-stone-800"
      }`}
    >
      <div className="cell">
        <span className="cell-text text-white">{machine.number}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.priority}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.job}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.part_id}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.part_name}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.amount}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.time}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.material}</span>
      </div>
      <div className="cell">
        <span className="cell-text text-white">{machine.lot}</span>
      </div>
      <div className="cell text-left">
        <Link
          to={`/monitor/${machine.number}`}
          className="text-white rounded-xl px-1 bg-stone-900 px-1 text-sm"
        >
          Add Job
        </Link>
      </div>
    </div>
  );
}
