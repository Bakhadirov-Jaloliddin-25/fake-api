const wrapper = document.querySelector(".wrapper");
const loading = document.querySelector(".loader");
const seeMoreBtn = document.querySelector(".see__more");

const API_URL = "https://dummyjson.com";
let offset = 1;
const perPageCount = 4;
let currentCategory = "";

let totalProducts = 0;

async function fetchData(api) {
  const response = await fetch(api);
  response
    .json()
    .then((res) => {
      createCard(res);
      totalProducts = res.total;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMoreBtn.removeAttribute("disabled");
      if (offset * perPageCount >= totalProducts) {
        seeMoreBtn.style.display = "none";
      }
    });
}

fetchData(`${API_URL}/products?limit=${perPageCount}`);

function changeCategory(type) {
  currentCategory = type;
  offset = 1;
  seeMoreBtn.style.display = "block";

  fetchData(`${API_URL}/products${currentCategory}?limit=${perPageCount}`);
}

function createCard(data) {
  while (wrapper.firstChild) {
    wrapper.firstChild.remove();
  }
  //   wrapper.innerHTML = ""; // Clear previous cards
  data.products.forEach((product) => {
    const card = document.createElement("div");
    // card.classList.add("card");
    card.className = "card";
    card.innerHTML = `
    <img src=${product.images[0]} alt="">
    <div class="info">
      <h3>${product.title}<h3>
      <strong>${product.price} $</strong>
    </div>
    <button>Buy now</button>
    `;
    wrapper.appendChild(card);
  });
  window.scrollTo(0, wrapper.scrollHeight);
}

function seeMore() {
  seeMoreBtn.setAttribute("disabled", true);
  loading.style.display = "flex";
  offset++;
  fetchData(
    `${API_URL}/products${currentCategory}?limit=${perPageCount * offset}`
  );
  if (offset * perPageCount >= totalProducts) {
    seeMoreBtn.style.display = "none";
  }
}
