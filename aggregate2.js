// aggregate.js — визуализация средней диаграммы по всем результатам

function showAverageChart() {
  const raw = localStorage.getItem("morality_test_all_results");
  if (!raw) {
    alert("Нет накопленных данных для построения диаграммы.");
    return;
  }

  const results = JSON.parse(raw);
  const axes = Object.keys(results[0].data);
  const totals = Object.fromEntries(axes.map(a => [a, 0]));

  results.forEach(entry => {
    for (const axis of axes) {
      totals[axis] += Number(entry.data[axis] || 0);
    }
  });

  const averages = axes.map(a => totals[a] / results.length);

  const ctx = document.getElementById("averageChart").getContext("2d");
  if (window.averageChart && typeof window.averageChart.destroy === 'function') {
    window.averageChart.destroy();
  }

  window.averageChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: axes,
      datasets: [{
        label: "Средние значения",
        data: averages,
        backgroundColor: "rgba(200,255,200,0.3)",
        borderColor: "#44aa44"
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: -10,
          suggestedMax: 20
        }
      }
    }
  });
}
