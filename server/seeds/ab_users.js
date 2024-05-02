/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Tommy",
      last_name: "Brits",
      gender: "Male",
      dob: "1986-07-14",
      user_phone: 9516305703,
      user_street: "12939 sunnyglen dr.",
      user_city: "Moreno Valley",
      user_province: "CA",
      user_postal: 92553,
      user_email: "britstd951@gmail.com",
      hired: "2024-04-01",
      password: "$2b$08$oZvtVz.A66.ozT82Q2pIX.3FdU7Jt9F3jPFVy0lU2H2UhH4I5z1TO",
      role_id: 4,
      username: 10001
    },
    {
      first_name: "Jake",
      last_name: "Johnson",
      gender: "Male",
      dob: "1972-12-01",
      user_phone: 9998889999,
      user_street: "555 bullshit wy",
      user_city: "Hemet",
      user_province: "CA",
      user_postal: 92543,
      hired: "2024-04-01",
      role_id: 1,
      password: "$2b$08$W7GSnZz3gf9Ggcs1ZhFqQ.FzCEvRy4B3QxYZbsBgVBLkP/9SRFpTG",
      username: 10002
    }
  ]);
};
