// aggregate.js — визуализация средних значений по шкалам

function showAverageChart() {
  const raw = JSON.parse(localStorage.getItem("morality_test_all_results") || "[]");
  if (!raw.length) {
    alert("Нет данных для анализа.");
    return;
  }

  const axisSum = {};
  const axisCount = {};
  axes.forEach(a => {
    axisSum[a] = 0;
    axisCount[a] = 0;
  });

  raw.forEach(entry => {
    Object.entries(entry.data).forEach(([axis, value]) => {
      if (axes.includes(axis)) {
        axisSum[axis] += value;
        axisCount[axis]++;
      }
    });
  });

  const averages = axes.map(a => axisCount[a] ? axisSum[a] / axisCount[a] : 0);

  const canvas = document.getElementById("averageChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (window.averageChart && typeof window.averageChart.destroy === 'function') {
    window.averageChart.destroy();
  }
  window.averageChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: axes.map(a => axisDescriptions[a].split(" — ")[0]),
      datasets: [{
        label: "Средние значения",
        data: averages,
        backgroundColor: "rgba(204,255,204,0.3)",
        borderColor: "#33aa33"
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
