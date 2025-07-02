// export.js — экспорт результатов и сохранение лога

function exportCSV(scores, axisDescriptions) {
  const header = "Шкала,Баллы,Описание\n";
  const rows = Object.keys(scores).map(a =>
    `${axisDescriptions[a].split(" — ")[0]},${scores[a]},${axisDescriptions[a]}`
  );
  const csv = header + rows.join("\n");

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `morality_test_result_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  // запись в локальный лог
  const previous = JSON.parse(localStorage.getItem("morality_test_all_results") || "[]");
  previous.push({ timestamp: Date.now(), data: scores });
  localStorage.setItem("morality_test_all_results", JSON.stringify(previous));
  localStorage.setItem("morality_test_csv", previous.map(row => Object.values(row.data).join(",")).join("\n"));
}
