// logic.js — логика обработки результатов теста "Природа и мораль"

const axes = [
  "utilitarianism", "deontology", "anthropocentrism",
  "biocentrism", "ecocentrism", "atomism", "holism"
];

const axisDescriptions = {
  utilitarianism: "Утилитаризм — мораль, ориентированная на пользу.",
  deontology: "Деонтология — мораль, ориентированная на долг.",
  anthropocentrism: "Антропоцентризм — человек в центре системы ценностей.",
  biocentrism: "Биоцентризм — ценность всех живых существ.",
  ecocentrism: "Экоцентризм — ценность природы и экосистемы.",
  atomism: "Атомизм — анализ изолированных элементов.",
  holism: "Холизм — природа как взаимосвязанное целое."
};

const scores = Object.fromEntries(axes.map(a => [a, 0]));

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('questionContainer');
  if (!container || typeof window.questions === 'undefined') {
    console.error("Контейнер с id='questionContainer' или массив 'questions' не найден.");
    return;
  }
  window.questions.forEach((q, i) => {
    const block = document.createElement('div');
    block.innerHTML = `<hr><p><em>${q.story}</em></p><p><strong>${q.text}</strong></p>
      <label><input type='radio' name='q${i}' value='2'> Согласен</label>
      <label><input type='radio' name='q${i}' value='-2'> Не согласен</label>`;
    container.appendChild(block);
  });
});

function calculateResults() {
  axes.forEach(a => scores[a] = 0);
  window.questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name='q${i}']:checked`);
    if (selected) {
      const val = parseInt(selected.value);
      Object.entries(q.axes).forEach(([axis, weight]) => {
        if (scores.hasOwnProperty(axis)) {
          scores[axis] += val * weight;
        }
      });
    }
  });

  const canvas = document.getElementById("radarChart");
  if (!canvas) {
    console.error("Canvas с id='radarChart' не найден.");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (window.radarChart && typeof window.radarChart.destroy === 'function') {
    window.radarChart.destroy();
  }
  window.radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: axes.map(a => axisDescriptions[a].split(" — ")[0]),
      datasets: [{
        label: "Ваш профиль",
        data: axes.map(a => scores[a]),
        backgroundColor: "rgba(153,204,255,0.3)",
        borderColor: "#3399cc"
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

  let out = "<h3>Результаты</h3><table border='1'><tr><th>Шкала</th><th>Баллы</th><th>Описание</th></tr>";
  axes.forEach(a => {
    out += `<tr><td>${axisDescriptions[a].split(" — ")[0]}</td><td>${scores[a]}</td><td>${axisDescriptions[a]}</td></tr>`;
  });
  out += "</table>";
  const resultDiv = document.getElementById("results");
  if (resultDiv) {
    resultDiv.innerHTML = out;
  }
}
