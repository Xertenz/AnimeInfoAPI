const url = "https://api.jikan.moe/v3/search/anime?page=1&q=";

window.onload = function () {
  document.getElementById("search-txt").focus();
};

// Main Variables
var searchBtn = document.getElementById("search-btn"),
  items = document.querySelector(".search-result .items"),
  searchTxt = document.getElementById("search-txt");

// Main Function
function proccessing() {
  items.textContent = "";
  const searchTxtValue = searchTxt.value;
  fetch(url + searchTxtValue)
    .then((res) => res.json())
    .then((data) => {
      for (let result of data.results) {
        // console.log(result);
        let url = result.image_url,
          title = result.title,
          tooltip = result.synopsis,
          startDate =
            result.start_date == null
              ? "0000-00-00"
              : result.start_date.split("T")[0];
        endDate =
          result.end_date == null
            ? "0000-00-00"
            : result.end_date.split("T")[0];

        episodes = result.episodes;
        rated = result.rated;
        score = result.score;
        console.log(result);
        let finalElement = creatingElement(
          url,
          title,
          tooltip,
          startDate,
          endDate,
          episodes,
          rated,
          score
        );
        items.appendChild(finalElement);
      }
    });
}

// Handling 'Click' And 'Enter' Events
searchBtn.addEventListener("click", proccessing);
searchTxt.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    proccessing();
  }
});

// Image Creating Function
function creatingImg(src, tooltip = "") {
  const img = document.createElement("img");
  img.src = src;
  img.title = tooltip;
  return img;
}

// Final Item Creating Function
function creatingElement(
  src,
  title = "",
  tooltip = "",
  startDate,
  endDate,
  episodes,
  rated,
  score
) {
  const item = document.createElement("div");
  item.classList.add("item");
  const img = creatingImg(src, title);
  item.appendChild(img);

  const overlay = creatingOverlay(
    title,
    tooltip,
    startDate,
    endDate,
    episodes,
    rated,
    score
  );
  item.appendChild(overlay);

  return item;
}

// Creating Information Overlay Function
function creatingOverlay(
  title,
  tooltip,
  startDate,
  endDate,
  episodes,
  rated,
  score
) {
  const overlay = document.createElement("div");
  overlay.title = tooltip;
  overlay.classList.add("overlay");
  console.log(endDate);

  const itemTitle = document.createElement("p");
  itemTitle.classList.add("item-title");
  itemTitle.innerHTML =
    'Title: <span class="item-value item-title-value">' + title + "</span>";

  const itemStartDate = document.createElement("p");
  itemStartDate.classList.add("item-startdate");
  itemStartDate.innerHTML =
    'Start Date: <span class="item-value item-startdate-value">' +
    startDate +
    "</span>";

  const itemEndDate = document.createElement("p");
  itemEndDate.classList.add("item-enddate");
  itemEndDate.innerHTML =
    'End Date: <span class="item-value item-enddate-value">' +
    endDate +
    "</span>";

  const itemEpisodes = document.createElement("p");
  itemEpisodes.classList.add("item-episodes");
  itemEpisodes.innerHTML =
    'Episodes: <span class="item-value item-episodes-value">' +
    episodes +
    "</span>";

  const itemRated = document.createElement("p");
  itemRated.classList.add("item-rated");
  itemRated.innerHTML =
    'Rated: <span class="item-value item-rated-value">' + rated + "</span>";

  const itemScore = document.createElement("p");
  itemScore.classList.add("item-score");
  itemScore.innerHTML =
    'Score: <span class="item-value item-score-value">' + score + "</span>";

  overlay.appendChild(itemTitle);
  overlay.appendChild(itemStartDate);
  overlay.appendChild(itemEndDate);
  overlay.appendChild(itemEpisodes);
  overlay.appendChild(itemRated);
  overlay.appendChild(itemScore);
  return overlay;
}
