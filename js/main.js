const coursesData = [
  {
    category: "Marketing",
    title: "The Ultimate Google Ads Training Course",
    price: 100,
    author: "Jerome Bell",
    image: "./assets/images/image_1.jpg",
  },
  {
    category: "Management",
    title: "Product Management Fundamentals",
    price: 480,
    author: "Marvin McKinney",
    image: "./assets/images/image_2.jpg",
  },
  {
    category: "HR & Recruiting",
    title: "HR Management and Analytics",
    price: 200,
    author: "Leslie Alexander Li",
    image: "./assets/images/image_3.jpg",
  },
  {
    category: "Marketing",
    title: "Brand Management & PR Communications",
    price: 530,
    author: "Kristin Watson",
    image: "./assets/images/image_4.jpg",
  },
  {
    category: "Design",
    title: "Graphic Design Basic",
    price: 500,
    author: "Guy Hawkins",
    image: "./assets/images/image_5.jpg",
  },
  {
    category: "Management",
    title: "Business Development Management",
    price: 400,
    author: "Dianne Russell",
    image: "./assets/images/image_6.jpg",
  },
  {
    category: "Development",
    title: "Highload Software Architecture",
    price: 600,
    author: "Brooklyn Simmons",
    image: "./assets/images/image_7.jpg",
  },
  {
    category: "HR & Recruiting",
    title: "Human Resources: Selection and Recruitment",
    price: 150,
    author: "Kathryn Murphy",
    image: "./assets/images/image_8.jpg",
  },
  {
    category: "Design",
    title: "User Experience. Human-centered Design",
    price: 240,
    author: "Cody Fisher",
    image: "./assets/images/image_9.jpg",
  },
  {
    category: "Design",
    title: "Cute Cat Drawing for Beginners",
    price: 240,
    author: "Cat",
    image: "./assets/images/image_10.jpg",
  },
  {
    category: "HR & Recruiting",
    title: "Cute Cat Communications",
    price: 240,
    author: "Cute Cat",
    image: "./assets/images/image_11.jpg",
  },
  {
    category: "Development",
    title: "Soft Architecture",
    price: 240,
    author: "Red Cat",
    image: "./assets/images/image_12.jpg",
  },
];

let activeCategory = "All";
let currentPage = 1;
const itemsPerPage = 9;

const grid = document.getElementById("courses-grid");
const searchInput = document.getElementById("search-input");
const filtersList = document.querySelector(".filters__list");
const loadMoreBtn = document.getElementById("load-more");

function getCategoryClass(category) {
  return category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
}

function renderCourses(filteredCourses) {
  grid.innerHTML = "";
  filteredCourses.forEach((course) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <div class="card__image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="card__info">
            <span class="card__category card__category--${getCategoryClass(
              course.category
            )}">${course.category}</span>
            <h2 class="card__title">${course.title}</h2>
            <div class="card__details">
            <span class="card__price">$${course.price}</span>
            <span class="card__author"> | by ${course.author}</span>
            </div>
            </div>
        `;
    grid.appendChild(card);
  });
}

function filterAndRender() {
  let filtered = coursesData;
  const query = searchInput.value.toLowerCase();

  if (activeCategory !== "All") {
    filtered = filtered.filter((c) => c.category === activeCategory);
  }

  if (query) {
    filtered = filtered.filter((c) => c.title.toLowerCase().includes(query));
  }

  const paginated = filtered.slice(0, currentPage * itemsPerPage);
  renderCourses(paginated);

  loadMoreBtn.style.display =
    paginated.length < filtered.length ? "block" : "none";
}

function countCategories() {
  const counts = {};
  coursesData.forEach((course) => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });
  const total = coursesData.length;

  document.querySelectorAll(".filters__item").forEach((item) => {
    const cat = item.dataset.category;
    if (cat === "All") {
      item.innerHTML = `All <span class="filter-count">${total}</span>`;
    } else {
      const count = counts[cat] || 0;
      item.innerHTML = `${cat} <span class="filter-count">${count}</span>`;
    }
  });
}
document.querySelectorAll(".filters__item").forEach((item) => {
  item.dataset.category = item.textContent.trim();
});
countCategories();

filtersList.addEventListener("click", (e) => {
  if (e.target.classList.contains("filters__item")) {
    document
      .querySelectorAll(".filters__item")
      .forEach((item) => item.classList.remove("filters__item--active"));
    e.target.classList.add("filters__item--active");
    activeCategory = e.target.dataset.category;
    currentPage = 1;
    filterAndRender();
  }
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  filterAndRender();
});

loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  filterAndRender();
});

const searchContainer = document.querySelector(".search");
const searchIcon = document.querySelector(".search__icon");

const mediaQuery = window.matchMedia("(max-width: 1125px)");

function handleMediaChange(e) {
  if (e.matches) {
    searchIcon.removeEventListener("click", toggleSearch);
    searchIcon.addEventListener("click", toggleSearch);
  } else {
    searchIcon.removeEventListener("click", toggleSearch);
    searchContainer.classList.remove("search--active");
  }
}

function toggleSearch() {
  searchContainer.classList.toggle("search--active");
  if (searchContainer.classList.contains("search--active")) {
    searchInput.focus();
  }
}

mediaQuery.addEventListener("change", handleMediaChange);
handleMediaChange(mediaQuery);

const filtersBtn = document.querySelector(".filters__btn");
filtersBtn.addEventListener("click", () => {
  filtersList.classList.toggle("filters__list--active");
  filtersBtn.classList.toggle("filters__btn--active");
});

// Initial render
filterAndRender();
