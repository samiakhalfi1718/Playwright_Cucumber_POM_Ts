
const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "reports", // Dossier contenant le fichier JSON généré
  reportPath: "reports/html_report", // Dossier où le rapport HTML sera généré
  metadata: {
    browser: {
      name: "chromium",
      version: "latest",
    },
    device: "Local Test Machine",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
});
