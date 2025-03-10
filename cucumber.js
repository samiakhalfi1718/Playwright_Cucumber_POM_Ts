module.exports = {
    default: {
      require: ["tests/stepDefinitions/*.ts"],
      format: ["progress-bar"],
      paths: ["tests/features/*.feature"],
      requireModule: ["ts-node/register"],
      worldParameters: {},
    },
  };