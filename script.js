const defaultReviews = [
  {
    name: "Cliente de Grupo Azanza",
    rating: 5,
    comment: "Excelente atención y acompañamiento. Muy conformes con el trabajo."
  },
  {
    name: "Cliente de Colonia",
    rating: 5,
    comment: "Responsabilidad y buena disposición durante todo el proyecto."
  }
];

function getReviews() {
  try {
    return JSON.parse(localStorage.getItem("azanzaReviews")) || defaultReviews;
  } catch (e) {
    return defaultReviews;
  }
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m];
  });
}

function renderReviews() {
  const list = document.getElementById("review-list");

  list.innerHTML = getReviews().map(function(r) {
    const rating = Number(r.rating);

    return `
      <article class="review">

        <div class="stars">
          ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
        </div>

        <p>
          ${escapeHtml(r.comment)}
        </p>

        <strong>
          ${escapeHtml(r.name)}
        </strong>

      </article>
    `;
  }).join("");
}

function openReview() {
  const modal = document.getElementById("modal");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeReview() {
  const modal = document.getElementById("modal");

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("review-form").addEventListener("submit", function(e) {

  e.preventDefault();

  const reviews = getReviews();

  reviews.unshift({
    name: document.getElementById("name").value,
    rating: document.getElementById("rating").value,
    comment: document.getElementById("comment").value
  });

  localStorage.setItem(
    "azanzaReviews",
    JSON.stringify(reviews)
  );

  renderReviews();

  e.target.reset();

  closeReview();

});

renderReviews();
