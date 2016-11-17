var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
} // end setDetails()

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url')
} // end imageFromThumb(thumbnail)

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title')
} // end titleFromThumb(thumbnail)

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail))
} // end setDetailsFromThumb(thumbnail)

function addThumbClickedHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb)
    showDetails();
  });
} // end addThumbClickedHandler(thumb)

function getThumbnailsArray () {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails)
  return thumbnailArray;
} // end getThumbnailsArray()

// Gold challenge functions included below

// returns a random integer between min inclusive and max (inclusive)
function getRandomInt(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min + 1)) + min;
} // end getRandomInt(min, max)

function changeRandomThumbURL() {
  'use strict';
  // get random thumbnail
  var thumbnails = getThumbnailsArray();
  var index = getRandomInt(0, 4)
  console.log("Random number is " + index)
  var thumb = thumbnails[index]

  // change its data-image-url to another url (tacocat)
  thumb.setAttribute('data-image-url', 'https://scontent-ams3-1.cdninstagram.com/t51.2885-15/s320x320/e35/13248742_1133462560049694_979427289_n.jpg');
} // end changeRandomThumbURL()

function resetThumbURL(thumb) {
  'use strict';
  // get thumb's image
  var image = thumb.querySelector(".thumbnail-image");
  // get image's src
  var source = image.getAttribute('src');

  thumb.setAttribute('data-image-url', source);
} // end resetThumbURL(thumb)

function resetAllThumbURLs() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(resetThumbURL);
} // end resetALLThumbURLs()

// End of Gold challenge

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
} // end hideDetails()

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
  // frame.classList.remove(TINY_EFFECT_CLASS);
} // end showDetails()

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
} // end addKeyPressHandler

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickedHandler)
  addKeyPressHandler();
} // end initializeEvents()

initializeEvents();
