const grayscaleToggle = document.getElementById('grayscale-toggle');
const gallery = document.getElementById('gallery');
const fetchNewButton = document.getElementById('fetch-new');
const loadMoreButton = document.getElementById('load-more');

grayscaleToggle.addEventListener('change', function () {
  if (this.checked) {
    gallery.classList.add('grayscale');
  } else {
    gallery.classList.remove('grayscale');
  }
});

function fetchPhotos(NrFotove) {
  for (let i = 0; i < NrFotove; i++) {
    const randomId = Math.floor(Math.random() * 1000);

    const skeleton = document.createElement('div');
    skeleton.classList.add('skeleton-card');
    gallery.appendChild(skeleton);

    fetch(`https://picsum.photos/id/${randomId}/info`)
      .then((response) => response.json())
      .then((data) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('photo-card');

        const img = document.createElement('img');
        img.src = data.download_url;

        img.onload = function () {
          skeleton.remove();
          const overlay = document.createElement('div');
          overlay.classList.add('photo-info');

          const author = document.createElement('h4');
          author.textContent = data.author;
          overlay.appendChild(author);

          const link = document.createElement('p');
          link.textContent = data.url;
          overlay.appendChild(link);

          imgWrapper.appendChild(img);
          imgWrapper.appendChild(overlay);

          gallery.appendChild(imgWrapper);
        };
      })
  }
}

fetchPhotos(4);

fetchNewButton.addEventListener('click', function () {
  gallery.innerHTML = '';
  fetchPhotos(4);
});

loadMoreButton.addEventListener('click', function () {
  fetchPhotos(4);
});