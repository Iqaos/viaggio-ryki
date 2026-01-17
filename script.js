let currentPage = 1;
let selectedCity = "";
let selectedStartDate = "";
let selectedEndDate = "";

/* =========================
   NAVIGAZIONE PAGINE
========================= */
function goToPage(page) {
  currentPage = page;

  // nasconde tutte le pagine
  document.querySelectorAll('[id^="page"]').forEach(p => {
    p.classList.add("hidden");
  });

  // mostra quella giusta
  const target = document.getElementById("page" + page);
  if (target) target.classList.remove("hidden");
}

function goBack() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

/* =========================
   SCELTA CITTÀ
========================= */
function selectCity(city) {
  selectedCity = city;
  goToPage(4);
}

/* =========================
   RIEPILOGO
========================= */
function updateSummary() {
  document.getElementById("summary").innerText =
    `Meta: ${selectedCity}\nDal ${formatDate(selectedStartDate)} al ${formatDate(selectedEndDate)}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long"
  });
}

/* =========================
   CALENDARIO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const today = new Date();
  today.setHours(0,0,0,0);

  document.querySelectorAll(".month").forEach(monthEl => {
    const month = parseInt(monthEl.dataset.month);

    // 🔒 consenti solo giugno (5), luglio (6), agosto (7)
    if (month < 5 || month > 7) return;

    const daysContainer = monthEl.querySelector(".days");
    daysContainer.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dayEl = document.createElement("div");

      dayEl.className = "day";
      dayEl.innerText = d;

      if (date < today) {
        dayEl.classList.add("disabled");
      } else {
        dayEl.addEventListener("click", () => selectDate(date, dayEl));
      }

      daysContainer.appendChild(dayEl);
    }
  });
});

/* =========================
   SELEZIONE DATA
========================= */
function selectDate(date, element) {
  document.querySelectorAll(".day").forEach(d =>
    d.classList.remove("selected", "range")
  );

  selectedStartDate = toISO(date);

  const end = new Date(date);
  end.setDate(date.getDate() + 1);
  selectedEndDate = toISO(end);

  element.classList.add("selected");

  // evidenzia giorno successivo
  document.querySelectorAll(".day").forEach(el => {
    const monthEl = el.closest(".month");
    if (!monthEl) return;

    const m = parseInt(monthEl.dataset.month);
    const d = parseInt(el.innerText);

    if (m === end.getMonth() && d === end.getDate()) {
      el.classList.add("range");
    }
  });

  document.getElementById("datePreview").innerText =
    `Dal ${formatDate(selectedStartDate)} al ${formatDate(selectedEndDate)}`;

  setTimeout(() => {
    updateSummary();
    goToPage(5);
  }, 1200);
}

function toISO(date) {
  return date.toISOString().split("T")[0];
}
