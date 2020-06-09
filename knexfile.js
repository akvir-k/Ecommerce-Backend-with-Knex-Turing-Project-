
module.exports = {
  development: {
    client: "mysql",
    connection: "mysql://root:aman1234@localhost:3306/ecommerce",
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
  },
  production: {
    client: "mysql",
    connection: "mysql://root:aman1234@localhost:3306/ecommerce",
  },
};
