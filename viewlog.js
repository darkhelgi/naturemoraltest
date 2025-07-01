// viewlog.js — отображение всех записанных результатов в виде таблицы

function showResultLog() {
  const raw = localStorage.getItem("morality_test_all_results");
  if (!raw) {
    alert("Нет сохранённых результатов.");
    return;
  }

  let results;
  try {
    results = JSON.parse(raw);
  } catch (e) {
    alert("Ошибка чтения данных. Возможно, лог повреждён.");
    return;
  }

  if (!Array.isArray(results) || results.length === 0) {
    alert("Лог результатов пуст.");
    return;
  }

  const axes = Object.keys(results[0].data);
  let table = "<h3>Все сохранённые результаты</h3><table border='1'><tr><th>Дата</th>";
  for (const a of axes) table += `<th>${a}</th>`;
  table += "</tr>";

  for (const entry of results) {
    table += `<tr><td>${new Date(entry.timestamp).toLocaleString()}</td>`;
    for (const a of axes) {
      const val = entry.data[a] !== undefined ? entry.data[a] : "";
      table += `<td>${val}</td>`;
    }
    table += "</tr>";
  }

  table += "</table>";
  const logContainer = document.getElementById("resultLog");
  logContainer.innerHTML = table;
}
