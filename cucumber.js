module.exports = {
    default: {
      require: ["tests/stepDefinitions/*.ts"],
      format: ["progress-bar",
        "json:reports/cucumber_report.json"  // Ajout du format JSON
      ],
      paths: ["tests/features/*.feature"],
      requireModule: ["ts-node/register"],
      worldParameters: {},
    },
  };