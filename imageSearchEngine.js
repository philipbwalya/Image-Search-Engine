const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');
const showMoreBtn = document.getElementById('show-more-btn');
const accessKey = 'ThmGOy2q_uyosOeav3ew3O-NsiUisVIUmy6Sd0QqqME';
const secretKey = 'It8ajfkoGTkX_cHZpTiwrR1lVj45TJE76OXaGxFGfkk';

let keyword = '';
let page = 1;

// calling the images from splash.com api using await
async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  // ensure that when you search another term, the page changes what to render;
  if(page===1){
    searchResults.innerHTML = "";
  }

  const results = data.results;

  // showing the results
  results.map((result) => {
    const image = document.createElement('img');
    image.src = result.urls.small;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = 'blank';

    imageLink.appendChild(image);
    searchResults.appendChild(imageLink);
  })
  showMoreBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
})

showMoreBtn.addEventListener("click", () =>{
  page++;
  searchImages();
})