// API Used: http://newsapi.org/s/us-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const apiKey = '484408e726f646fcaa97d4f71dbc75e8'; // API Key
const country = "us"; // Country code set to US
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

// 100 requests per day
let requestURL;

// // Create cards from data
// const generateUI = (articles) => {
//   container.innerHTML = ""; // Clear previous content
//   for (let item of articles) {
//     let card = document.createElement("div");
//     card.classList.add("news-card");
//     card.innerHTML = `
//       <div class="news-image-container">
//         <img src="${item.urlToImage || "./newspaper.jpg"}" alt="News Image" />
//       </div>
//       <div class="news-content">
//         <div class="news-title">
//           ${item.title}
//         </div>
//         <div class="news-description">
//           ${item.description || item.content || ""}
//         </div>
//         <a href="${item.url}" target="_blank" class="view-button">Read More</a>
//       </div>`;
//     container.appendChild(card);
//   }
// };

const generateUI = (articles) => {
  container.innerHTML = ""; // Clear previous content

  // Sort articles: those with images first, followed by those without
  const sortedArticles = articles.sort((a, b) => (b.urlToImage ? 1 : 0) - (a.urlToImage ? 1 : 0));

  for (let item of sortedArticles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="News Image" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
          ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  }
};

// News API Call
const getNews = async () => {
  container.innerHTML = "Loading news..."; // Indicate loading state
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Data unavailable at the moment. Please try again later.");
    }
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    alert(error.message);
    container.innerHTML = "Failed to load news. Please try again later.";
  }
};

// Category Selection
const selectCategory = (e, category) => {
  const options = document.querySelectorAll(".option");
  options.forEach((element) => element.classList.remove("active"));
  e.target.classList.add("active");
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  getNews();
};

// Options Buttons
const createOptions = () => {
  optionsContainer.innerHTML = ""; // Clear previous options
  options.forEach((option) => {
    const button = document.createElement('button');
    button.className = `option ${option === 'general' ? 'active' : ''}`;
    button.textContent = option;
    button.onclick = (e) => selectCategory(e, option);
    optionsContainer.appendChild(button);
  });
};

// Initialize the app
const init = () => {
  optionsContainer.innerHTML = "";
  createOptions();
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  getNews();
};

window.onload = init;

