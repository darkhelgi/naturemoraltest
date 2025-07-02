// export.js — добавление результатов в persistent файл (имитация через localStorage)

function appendToResultLog(scores, axisDescriptions) {
  const result = {
    timestamp: new Date().toISOString(),
    data: Object.fromEntries(
      Object.entries(scores).map(([axis, value]) => [
        axisDescriptions[axis].split(" — ")[0],
        value
      ])
    )
  };

  let allResults = JSON.parse(localStorage.getItem("morality_test_all_results") || "[]");
  allResults.push(result);
  localStorage.setItem("morality_test_all_results", JSON.stringify(allResults));

  const csvHeader = "Дата, " + Object.keys(result.data).join(", ") + "\n";
  const csvRow = result.timestamp + ", " + Object.values(result.data).join(", ") + "\n";

  // Если ещё нет файла, создаём с заголовком, иначе дописываем строку
  let fullCSV = localStorage.getItem("morality_test_csv") || csvHeader;
  fullCSV += csvRow;
  localStorage.setItem("morality_test_csv", fullCSV);

  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'morality_test_results_log.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// автоматически использовать при расчёте результата
function exportCSV(scores, axisDescriptions) {
  appendToResultLog(scores, axisDescriptions);
}
