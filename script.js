let currentPage = 1;
let selectedCity = "";
let selectedStartDate = "";
let selectedEndDate = "";

function goToPage(pageNumber) {
  currentPage = pageNumber;

  for (let i = 1; i <= 10; i++) {
    const page = document.getElementById("page" + i);
    if (page) page.style.display = "none";
  }

  document.getElementById("page" + pageNumber).style.display = "block";
}

function goBack() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}

function selectCity(city) {
  selectedCity = city;
  goToPage(4);
}

function selectDate() {
  const input = document.getElementById("startDate");
  const date = new Date(input.value);

  if (isNaN(date)) return;

  const month = date.getMonth() + 1; // 1–12

  if (month < 6 || month > 8) {
    alert("Puoi scegliere solo una data tra giugno, luglio e agosto 💛");
    input.value = "";
    return;
  }

  selectedStartDate = input.value;

  const end = new Date(date);
  end.setDate(date.getDate() + 1);
  selectedEndDate = end.toISOString().split("T")[0];

  document.getElementById("datePreview").innerText =
    `Dal ${formatDate(selectedStartDate)} al ${formatDate(selectedEndDate)}`;

  setTimeout(() => {
    updateSummary();
    goToPage(5);
  }, 1000);
}

function updateSummary() {
  document.getElementById("summary").innerText =
    `Meta: ${selectedCity}\nDate: ${formatDate(selectedStartDate)} – ${formatDate(selectedEndDate)}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
