/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 10001,
      first_name: "Tommy",
      last_name: "Brits",
      suffix: "Jr",
      gender: "male",
      dob: "1986-07-14",
      street: "12939 sunnyglen dr.",
      city: "Moreno Valley",
      province: "CA",
      postal: 92553,
      phone: 9097139898,
      ssn: 551957860,
      dlNumber: "d7744437",
      dlState: "CA",
      email: "tommybrits74@gmail.com",
      role: 1,
      password: "$2a$08$cP0IE70CGf9TL4f61E/9ruQsupo/wjcUMQU54RzAZnKKf69NL5HHO",
      confirm: null,
      hire: "2023/12/29",
    },
  ]);
};
