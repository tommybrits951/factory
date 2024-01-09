import { useContext } from "react";
import { Factory } from "../../App";
import Row from "./Row";

const titles = [
  "#",
  "!",
  "Job",
  "Part#",
  "Part",
  "Amount",
  "Time",
  "Material",
  "Lot",
  "Status",
];

export default function Monitor() {
  const { machines } = useContext(Factory);
  return (
    <div className="monitor mt-10 pt-5 border-r-2 border-b-2 mx-auto">
      <div className="mon-row bg-stone-800">
        {titles.map((title, idx) => {
          return (
            <div
              className="cell text-lime-400 border-l-2 border-t-2 text-center"
              key={idx}
            >
              {title}
            </div>
          );
        })}
      </div>
      {machines.map((mach, idx) => {
        return <Row machine={mach} key={idx} />;
      })}
    </div>
  );
}
