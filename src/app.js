import './styles/app.scss';
import {objectToQueryParams} from './helpers/';


(function() {
  const searchInput = document.querySelector('.search input');
  const searchForm = document.querySelector('#searchForm');

  // Search
  searchForm.addEventListener('submit', (event) => {
    fetchFlickrPhotos(searchInput.value).then(renderFlickrPhotos);
    associatedWordSearch(searchInput.value).then(renderAssociatedWords);
    event.preventDefault();
    return false;
  });
})();



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
    // const photoP = document.createElement('p'); 

    // photoP.textContent = photo.title;
    photoLi.style.backgroundImage = `url(${photo.url_z || photo.url_o})`;
    photoLi.classList.add('result');
   // photoLi.appendChild(photoP);
    photosList.appendChild(photoLi);
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
  });
}


/* function searchBtn() {
  $('.search').on('click', function() {



  
});  */ 


/*class Mashed {
  constructor(element) {
    this.root = element;

    this.addEventListeners();
  }



    const sidebarWords = document.querySelectorAll('aside ul li a');

    sidebarWords.forEach((sidebarWord) => {
      sidebarWord.addEventListener('click', function() {
        // TODO: Trigger flickr and word api fetch with Promise.all()
      });
    });
  }
*/ 

/*
  function search() {
    let query = this.searchInput.value;

    if (!query.length) {
      return;
    }

    let apiCalls = [
      this.fetchFlickrPhotos(query),
      this.fetchWordlabWords(query)
    ]

    getPromiseData(apiCalls)
      .then((result) => {
        console.log(result)
      });
  }

*/ 

/*
  renderWordSuggestions(res) {
    const sidebarListHolder = document.querySelector('aside ul');

    let words = Object.keys(res).map(key => {
      return Object.values(res[key]).map(w => {
        return w
      });
    });

    words = flatten(words); // Spara över words med den tillplattade versionen av sig själv

    words.forEach((word) => {
      let listItem = document.createElement('li');
      let link = document.createElement('a');

      link.href = "#";
      link.textContent = word;

      listItem.appendChild(link);
      sidebarListHolder.appendChild(listItem);
    });

    this.addEventListeners();

  }


(function() {
  new Mashed(document.querySelector('#mashed')) 
})(); */ 