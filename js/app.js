'use strict';

// console.log('hey there hey!');

// ******* GLOBALS *******
let imgArray = [];
let votingRounds = 25;


//  ****** DOM WINDOWS *******
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-container');

// ******* CANVAS ELEMENT FOR DEMO *****

let canvasElem = document.getElementById('chart');




// ***** CONSTRUCTOR FUNCTION ******

function Img(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ***** HELPER FUNCTIONS / UTILITIES *****

function randomIndex() {
  return Math.floor(Math.random() * imgArray.length);
}

function renderImg() {

  while (imgArray.length < 6) {
    let randomNum = randomIndex();
    if (!imgArray.includes(randomNum)) {
      imgArray.push(randomNum);
    }
  }
  let imgOneIndex = [randomIndex()];
  let imgTwoIndex = [randomIndex()];
  let imgThreeIndex = [randomIndex()];

  // ** Validation to make sure numbers are unique **
  // while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
  //   // TODO: reassign one of the variables
  //   randomIndex();
  // }

  imgOne.src = imgArray[imgOneIndex].img;
  imgTwo.src = imgArray[imgTwoIndex].img;
  imgThree.src = imgArray[imgThreeIndex].img;
  imgOne.title = imgArray[imgOneIndex].name;
  imgTwo.title = imgArray[imgTwoIndex].name;
  imgThree.title = imgArray[imgThreeIndex].name;
  imgOne.alt = `this is an image of ${imgArray[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${imgArray[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${imgArray[imgThreeIndex.name]}`;


  // TODO: increase the number of views on the images that have been rendered
  imgArray[imgOneIndex].views++;
  imgArray[imgTwoIndex].views++;
  imgArray[imgThreeIndex].views++;
}

function renderChart() {

  let imgNames = [];
  let imgVotes = [];
  let imgViews = [];

  for (let i = 0; i < imgArray.length; i++) {
    imgNames.push(imgArray[i].name);
    imgVotes.push(imgArray[i].votes);
    imgViews.push(imgArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: imgNames,
      datasets: [{
        label: '# of Votes',
        data: imgVotes,
        borderWidth: 1,
      },
      {
        label: '# of Views',
        data: imgViews,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvasElem, chartObj);
}

// **** EVENT HANDLERS *****
function handleClick(event) {
  // TODO: Identify what image was clicked on

  let imgClicked = event.target.title;

  // TODO: Increase the number of votes to that specific image
  for (let i = 0; i < imgArray.length; i++) {
    if (imgClicked === imgArray[i].name) {
      imgArray[i].votes++;
    }
  }
  // TODO: decrement voting rounds
  votingRounds--;

  // TODO: Rerender 3 new images
  renderImg();

  // TODO: once voting rounds have ended - not allow any more clicks
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);

  }
}


function handleShowResults() {
  // TODO: Display the results once the there are no more votes
  if (votingRounds === 0) {
    resultsBtn.removeEventListener('click', handleShowResults);
    renderChart();

  }
}




// **** EXECUTABLE CODE *****
let bag = new Img('bag');
let banana = new Img('banana');
let bathroom = new Img('bathroom');
let boots = new Img('boots');
let breakfast = new Img('breakfast');
let bubblegum = new Img('bubblegum');
let chair = new Img('chair');
let cthulhu = new Img('cthulhu');
let dogDuck = new Img('dog-duck');
let dragon = new Img('dragon');
let pen = new Img('pen');
let petSweep = new Img('pet-sweep');
let scissors = new Img('scissors');
let shark = new Img('shark');
let sweep = new Img('sweep', 'png');
let tauntaun = new Img('tauntaun');
let unicorn = new Img('unicorn');
let waterCan = new Img('water-can');
let wineGlass = new Img('wine-glass');

imgArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

