module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "teste-dominando-nodejs",
  define: {
    timestamp: true, //cria duas colunas - createdAt, updatedAt,
    underscored: true //nomenclatura (camelCase)
  }
}