const loadCategory = async () => {
  const response = await fetch(
    'https://openapi.programming-hero.com/api/news/categories'
  );
  const data = await response.json();
  data.data.news_category.forEach((item) => {
    // console.log(item);

    const categoryContainer = document.getElementById('category-bar-container');
    const div = document.createElement('div');
    div.innerHTML = `
            <button onclick="loadNews('${item.category_id}')" class="bg-white p-3">${item.category_name}</button>
          `;
    categoryContainer.appendChild(div);
  });
};

const loadNews = async (catId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${catId}`
  );
  const data = await response.json();
  const allData = data.data;
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';

  allData.forEach((item) => {
    console.log(item);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card my-10 card-side bg-white singleNews">
        <div>
          <figure>
            <img
              class="h-full w-60"
              src="${item.image_url}"
              alt="Movie"
            />
          </figure>
        </div>
        <div class="c-body">
          <div class="flex flex-col items-center px-6 gap-4">
            <div class="c-title flex justify-between items-center pt-4">
              <div>
                <h2 class="font-bold">
                  ${item.title}
                </h2>
              </div>
              <div class="text-center">
                <p>${item.rating.number}</p>
                <span>${item.rating.badge}</span>
              </div>
            </div>
            <div class="c-details">
              <p>
                ${item.details.slice(0, 300)}
              </p>
            </div>
            <div class="flex w-full justify-between">
              <div class="a-left flex justify-center gap-3 items-center">
                <div class="avatar">
                  <div class="w-16 rounded-full">
                    <img
                      src="${item.author.img}"
                    />
                  </div>
                </div>
                <div class="author-details">
                  <p class="a-name">${item.author.name}</p>
                  <p class="a-date">Date: ${item.author.published_date}</p>
                </div>
              </div>
              <div class="a-right flex items-center gap-3">
                <p class="views">Views: ${item.total_view}</p>
                <button class="bg-gray-500 hover:bg-gray-500 text-gray-200 btn">
                  Details
                </button>
              </div>
            </div>
          </div>
          <!-- <h2 class="card-title">New movie is released!</h2>
          <p>Click the button to watch on Jetflix app.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Watch</button>
          </div> -->
        </div>
      </div>
    `;
    newsContainer.appendChild(div);
  });
};

const handleSearch = () => {
  const value = document.getElementById('search-box').value;
  if (value) {
    loadNews(value);
  } else {
    alert('Please enter a valid catId!');
  }
};
loadNews('01');
loadCategory();
