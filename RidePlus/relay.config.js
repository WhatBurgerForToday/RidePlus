const config = {
  src: "./src",
  language: "typescript",
  schema: "../graphql/schema.graphql",
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
};

module.exports = config;
