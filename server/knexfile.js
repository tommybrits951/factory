// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "factory",
      user: "postgres",
      username: "postgres",
      password: "Benoni951!",
      port: 5432,
      host: "localhost"
    },
    pool: {
      min: 0,
      max: 10
      /* afterCreate: function (conn, done) {
        conn.run("PRAGMA foreign_keys = On", done);
      } */
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    useNullAsDefault: true
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
