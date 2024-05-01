/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("vendors").del();
  await knex("vendors").insert([
    {
      vendor_id: 1,
      vendor_name: "Ramko",
      vendor_street: "555 bull wy",
      vendor_city: "Hemet",
      vendor_postal: 92543,
      vendor_province: "CA",
      vendor_country: "United States",
      vendor_phone: 9515557777,
      vendor_phone2: 9096657777,
      vendor_email: "rmko@gmail.com",
      vendor_product: "Molds"
    },
    {
      vendor_id: 2,
      vendor_name: "Dexron",
      vendor_street: "444 Sht wy.",
      vendor_city: "Perris",
      vendor_postal: 92544,
      vendor_province: "CA",
      vendor_country: "United States",
      vendor_phone: 9519519999,
      vendor_email: "dex@dex.com",
      vendor_product: "Materials"
    }
  ]);
};
