$(document).ready(function() {

/******************** VARIABLES ******************************/
  var listOfRegions = {regions:['','The Westerlands','Dorne','The North','The Reach','The Vale','The Riverlands']};

/******************** CONSTRUCTORS ******************************/

function Character(dataObject) {
  // dataObject is one object from the array returned from api call.
  this.name = dataObject.name; //string
  this.culture = dataObject.culture; // string
  this.gender = dataObject.gender; // string
  this.aliases = dataObject.aliases; // array of strings
  this.allegiances = dataObject.allegiances; // array of urls as strings
  this.father = dataObject.father; // string
  this.mother = dataObject.mother; // string
  this.spouse = dataObject.spouse; // string
  this.titles = dataObject.titles; // array
  this.url = dataObject.url; //contains the character number
  this.born = dataObject.born; // string
}

function House(dataObject) {
// dataObject is one object from the array returned from api call.
  this.coatOfArms = dataObject.coatOfArms; // string
  this.currentLord = dataObject.currentLord; // url with character number at end
  this.heir = dataObject.heir; // url with character number at end
  this.name = dataObject.name; // string
  this.overlord = dataObject.overlord; // url with character number at end
  this.region = dataObject.region; // string
  this.words = dataObject.words; // string
}

function HouseList(dataObject) {
console.log("HouseList");
}
/******************** EVENT LISTENERS ******************************/
  //when "Search Characters" is clicked, append a search field.
$('#top').empty();
$('#character-search-page').on('click', function(event){
  appendTemplate('character-search', 'top');
});

//when character search is submitted, collect data from field and run search.
$('#top').on('click', '#submit-character-search',function(event){
  console.log("character search submitted.");
  var searchString = $('#character-search-field').val();
  searchCharacters(searchString);
});

//when "Search Houses" is clicked, append a search field.
$('#top').empty();
$('#houses-search-page').on('click', function(event){
  console.log("houses search page");
  appendTemplate('houses-search', 'top');
  var context = listOfRegions;
  appendTemplate('select-region', 'regions', context);
});


/******************** TEMPLATE FUNCTIONS ********************************/
/* set up function to attach a handlebar template
script is the id tag of the template
context is the object containing the VARIABLES
target is the element to attach to
*/
appendTemplate = function(script, target, context) {
  context = context || {};
  var source = $('#' + script).html();
  var template = Handlebars.compile(source);
  var html = template(context);
  $("#" + target).empty();
  $(html).appendTo("#" + target);
};

/******************** API CALLS ********************************/
/* function to search for a character by name, passed in as searchString-
needs to be exact, but capitalization doesn't matter. */
searchCharacters = function(searchString) {
  $.ajax({
      method: "GET",
      crossDomain: true,
      dataType: 'json',
      url: 'http://www.anapioficeandfire.com/api/characters/?name=' + searchString,
      success: function(response) {
        var newChar = new Character(response[0]);
        console.log(newChar);
        return newChar;
        // append the character to #bottom section
      },
      error: function(data) {
          console.log("Error: " + data);
      }
  });
};
/* function to search for a list of houses by region,
returns an array of Objects. */
searchHouses = function(region) {
  var url = 'http://www.anapioficeandfire.com/api/houses';
  if(region) {
    url += "?region=" + region;
  }
  $.ajax({
      method: "GET",
      crossDomain: true,
      dataType: 'json',
      url: url,
      success: function(response) {
        var listOfHouses = [];
        for (var index in response){
          var newHouse = new House(response[index]);
          listOfHouses.push(newHouse);
        }
        console.log(listOfHouses);
        return listOfHouses;
        // append each house to #bottom section
      },
      error: function(data) {
          console.log("Error: " + data);
      }
  });
};
// searchCharacters("jon snow");
// searchHouses("Dorne");
  searchHouses();
});
