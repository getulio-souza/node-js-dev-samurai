module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "secret",
  database: "teste-dominando-nodejs",
  define: {
    timestamp: true, //cria duas colunas - createdAt, updatedAt,
    underscored: true //nomenclatura (camelCase)
  }
}