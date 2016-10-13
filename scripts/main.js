$(document).ready(function() {

/******************** TEMPLATE FUNCTIONS ********************************/
    /* set up function to attach a handlebar template
    script is the id tag of the template
    context is the object containing the VARIABLES
    target is the element to attach to
    */
    appendTemplate = function(script, target, context) {
        context = context || {};
        var source = $('#' + script).html();
        console.log(source);

        var template = Handlebars.compile(source);
        var html = template(context);
        $("#" + target).empty();
        $(html).appendTo("#" + target);
    };

/******************** API CALLS ********************************/
    /* function to search for a character by name, passed in as searchString- needs to be exact?? */
    searchCharacters = function(queryType, searchString) {
    $.ajax({
        method: "GET",
        crossDomain: true,
        dataType: 'json',
        url: 'http://www.anapioficeandfire.com/api/characters/?name=' + searchString,
        success: function(response) {
          console.log(response);
        },
        // done: function(data) {
        //   console.log(data);
        // },
        error: function(data) {
          console.log("Error: " + data);
        }
    });
  };
    /* function to search for a list of houses by region */
    searchHouses = function(queryType, region) {
    $.ajax({
        method: "GET",
        crossDomain: true,
        dataType: 'json',
        url: 'http://www.anapioficeandfire.com/api/houses?region=' + region,
        success: function(response) {
          console.log(response);
        },
        done: function(data) {
          console.log(data);
        },
        error: function(data) {
          console.log("Error: " + data);
        }
    });
  };
  searchCharacters("Jon Snow");
  searchHouses();
});
/******************** CONSTRUCTORS ******************************/

function Character(dataObject){
  // dataObject is an array
  this.name = dataObject.name; //string
  this.culture = dataObject.culture; // string
  this.gender = dataObject.gender; // string
  this.aliases = dataObject.aliases; // array of strings
  this.allegiances = dataObject.allegiances;// array of urls as strings
  this.father = dataObject.father; // string
  this.mother = dataObject.mother; // string
  this.spouse = dataObject.spouse; // string
  this.titles = dataObject.titles; // array
  this.url = dataObject.url; //contains the character number
  this.born = dataObject.born; // string
}

function House(dataObject) {
  // dataObject is an object
  this.coatOfArms = dataObject.coatOfArms; // string
  this.currentLord = dataObject.currentLord; // url with character number at end
  this.heir = dataObject.heir; // url with character number at end
  this.name = dataObject.name; // string
  this.overlord = dataObject.overlord; // url with character number at end
  this.region = dataObject.region; // string
  this.words = dataObject.words; // string
}
