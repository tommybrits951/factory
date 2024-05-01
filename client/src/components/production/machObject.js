const mach = {
  machine_number: "",
  priority: 1,
  job: "",
  part_name: "",
  part_number: "",
  amount: "",
  time: "",
  material: "",
  lot: "",
  status: "no job"
};

let machs = [];

for (let i = 1; i <= 18; i++) {
  let tmp = { ...mach, machine_number: i };
  machs.push(tmp);
}

export default machs;
