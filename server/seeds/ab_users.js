/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      first_name: 'Tommy',
      last_name: 'Brits',
      gender: 'Male',
      dob: '1986-07-14',
      user_phone: 9516305703,
      user_street: '12939 sunnyglen dr.',
      user_city: 'Moreno Valley',
      user_province: 'CA',
      user_postal: 92553,
      user_email: 'britstd951@gmail.com',
      hired: '2024-04-01',
      password: '$2b$10$rc2tovZemaHP38/w25QsCuOq9mzdD8UnG1nuCZHf3En5cWpa9crNy',
      role_id: 4,
      username: 10001
    },

    {
      first_name: 'Jake',
      last_name: 'Johnson',
      gender: 'Male',
      dob: '1972-12-01',
      user_phone: 9998889999,
      user_street: '555 bullshit wy',
      user_city: 'Hemet',
      user_province: 'CA',
      user_postal: 92543,
      hired: '2024-04-01',
      role_id: 1,
      password: '$2b$08$W7GSnZz3gf9Ggcs1ZhFqQ.FzCEvRy4B3QxYZbsBgVBLkP/9SRFpTG',
      username: 10002
    },
    {
      first_name: 'Tommy',
      last_name: 'Brits',
      gender: 'Male',
      dob: '07/14/1986',
      user_phone: 9995559999,
      user_street: '555 fuckthis wy',
      user_city: 'Perris',
      user_province: 'CA',
      user_postal: 92570,
      role_id: 4,
      hired: '04/30/2024',
      password: '$2b$10$Qv/DeaGjeDlLAkeAtCoTyO21xPINtrnOnE.wYx0vuI8L24RATz6NO',
      username: 10003
    }
  ])
}
