const videoGrid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const ageFilter = document.getElementById("ageFilter");
const languageFilter = document.getElementById("languageFilter");
const videoCount = document.getElementById("videoCount");

videoCount.textContent = videos.length;

function renderVideos() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const age = ageFilter.value;
  const language = languageFilter.value;

  const filtered = videos.filter(video => {
    const textMatch =
      video.title.toLowerCase().includes(search) ||
      video.description.toLowerCase().includes(search) ||
      video.category.toLowerCase().includes(search) ||
      video.language.toLowerCase().includes(search);

    return textMatch &&
      (category === "all" || video.category === category) &&
      (age === "all" || video.age === age) &&
      (language === "all" || video.language === language);
  });

  videoGrid.innerHTML = "";

  if (!filtered.length) {
    videoGrid.innerHTML = "<p>No videos found. Try changing filter options.</p>";
    return;
  }

  filtered.forEach(video => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${video.youtubeId}" title="${video.title}" allowfullscreen></iframe>
      <div class="card-body">
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <div class="tags">
          <span class="tag">Age ${video.age}</span>
          <span class="tag">${video.category}</span>
          <span class="tag">${video.language}</span>
          <span class="tag">${video.audience}</span>
        </div>
      </div>
    `;
    videoGrid.appendChild(card);
  });
}

[searchInput, categoryFilter, ageFilter, languageFilter].forEach(item => {
  item.addEventListener("input", renderVideos);
  item.addEventListener("change", renderVideos);
});

renderVideos();
