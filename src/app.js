import './styles/app.scss';
import {objectToQueryParams} from './helpers/';


// Search 
const searchInput = document.querySelector('.search input');
const searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', (event) => {
  search(searchInput.value);
  event.preventDefault();
  return false;
});

function search(query) {
  fetchFlickrPhotos(query).then(renderFlickrPhotos);
  associatedWordSearch(query).then(renderAssociatedWords);
}


// Flickr API call 
function fetchFlickrPhotos(query) {

  let resourceUrl = `https://api.flickr.com/services/rest/?`;
  let flickrQueryParams = {
    method: 'flickr.photos.search',
    api_key: process.env.FLICKR_API_KEY,
    text: query,
    sort: 'relevance',
    extras: 'original_format, url_z, url_o',
    license: '2,4,5,6,7',
    per_page: 10,
    format: 'json',
    nojsoncallback: 1,
    dimension_search_mode: "max"
  };

  let flickrUrl = `${resourceUrl}${objectToQueryParams(flickrQueryParams)}`

  return fetch(flickrUrl)
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch (error => console.log('Something went wrong when calling flickr API'));
}


// WordLab API Search
function associatedWordSearch(query) {

  let worldLabAPIKey = process.env.WORLDLT_API_KEY
  let wordLabUrl = `https://words.bighugelabs.com/api/2/${worldLabAPIKey}/${query}/json`

  return fetch(wordLabUrl)
    .then(res => res.json())
    .then(res => {
      console.log('search word associations finished', res);
      return res;
    })
    .catch (error => console.log('Something went wrong'));
}


// Flickr showing search results 
function renderFlickrPhotos(photoData) {
  const photosList = document.querySelector('.results ul'); 
  photosList.innerHTML = "";

  photoData.photos.photo.forEach((photo) => {
    const photoLi = document.createElement('li');

    photoLi.style.backgroundImage = `url(${photo.url_z || photo.url_o})`;
    photoLi.classList.add('result');
    photosList.appendChild(photoLi);

    photoLi.addEventListener("click", () => {
      window.location.href = photo.url_o;
    });
  });
}


// WordLab showing search results
function renderAssociatedWords(words) {
  const wordList = document.querySelector('#associated-words');
  wordList.innerHTML = "";

  if (!words.noun) {
    return false;
  }

  words.noun.syn.forEach((word) => {
    const liEl = document.createElement('li');

    liEl.textContent = word;

    wordList.appendChild(liEl);

    liEl.addEventListener("click", () => {
      searchInput.value = word;
      search(word);
    });
  });
}

