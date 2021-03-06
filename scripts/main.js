(function() {
    "use strict";
    $(document).ready(function() {
        /******************** VARIABLES ******************************/
        var listOfRegions = {
            regions: ['', 'The Westerlands', 'Dorne', 'The North', 'The Reach', 'The Vale', 'The Riverlands']
        };

        /******************** HELPER FUNCTIONS ********************************/
        /* update the hash on the window */
        function updateHash(string) {
            window.location.hash = string;
        }


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
            this.context = this.getContextCharacter;

        }
        // Character.prototype.getAllegiancesByName = function() {
        //   var array = [];
        //     for (var index= 0; index < this.allegiances.length; index++) {
        //         var allegianceURL = this.allegiances[index];
        //         $.ajax({
        //             method: "GET",
        //             crossDomain: true,
        //             dataType: "json",
        //             url: allegianceURL,
        //             success: function(response) {
        //                 var newHouse = new House(response);
        //                 array.push(newHouse.name);
        //             },
        //             error: function(data) {
        //                 console.log("Error: data");
        //             }
        //         });
        //     }
        // };
        function getContextCharacter (dataObject){
            var context = {
                "name": dataObject.name,
                "born": dataObject.born,
                "titles": dataObject.titles,
                "aliases": dataObject.aliases,
                "allegiances": dataObject.allegiances
            };

            return context;
        }
        Character.prototype.toString = function() {
            return "Character: " + this.name;
        };

        function House(dataObject) {
            this.name = dataObject.name; // string
            this.words = dataObject.words; // string
        }
        House.prototype.toString = function() {
            return "House: " + this.name;
        };

        /******************** TEMPLATE FUNCTIONS ********************************/
        /* build Home Page */
        function buildHomePage() {
            $('#top').empty();
            $('#bottom').empty();
            updateHash('home');
            appendTemplate('about', 'top');
            appendTemplate('choose-search', 'bottom');

        }
        /* build Houses Search Page */
        function buildHousesSearchPage() {
            $('#top').empty();
            appendTemplate('houses-search', 'top');
            var context = listOfRegions;
            appendTemplate('select-region', 'regions', context);
        }
        /* build Character Search Page */
        function buildCharacterSearchPage() {
            appendTemplate('character-search', 'top');
        }
        /* prepares the context of a character for the template */

        function appendTemplate(script, target, context) {
            context = context || {};
            var source = $('#' + script).html();
            var template = Handlebars.compile(source);
            var html = template(context);
            $("#" + target).empty();
            $(html).appendTo("#" + target);
        }

        /******************** API CALLS ********************************/
        /* function to search for a character by name, passed in as searchString-
        needs to be exact, but capitalization doesn't matter. */
        function searchCharacters(searchString) {
            $.ajax({
                method: "GET",
                crossDomain: true,
                dataType: 'json',
                url: 'http://www.anapioficeandfire.com/api/characters/?name=' + encodeURIComponent(searchString),
                success: function(response) {
                    var newChar = new Character(response[0]);
                    var context = getContextCharacter(newChar);
                    appendTemplate("character-results", "bottom", context);
                    return newChar;
                },
                error: function(data) {
                    console.log("Error: " + data);
                }
            });
        }
        /* function to search for a list of houses by region,
        returns an array of Objects. */
        function searchHouses(region) {
            var url = 'http://www.anapioficeandfire.com/api/houses';
            if (region) {
                url += "?region=" + encodeURIComponent(region) + '&page=1&pageSize=50';
            }
            $.ajax({
                method: "GET",
                crossDomain: true,
                dataType: 'json',
                url: url,
                success: function(response) {
                    var listOfHouses = [];
                    for (var index in response) {
                        if (response[index].region === region) {
                            var newHouse = new House(response[index]);
                            listOfHouses.push(newHouse.name);
                        }
                    }
                    $.ajax({
                        method: "GET",
                        crossDomain: true,
                        dataType: 'json',
                        url: 'http://www.anapioficeandfire.com/api/houses' + "?region=" + encodeURIComponent(region) + '&page=2&pageSize=50',
                        success: function(response) {
                            for (var index in response) {
                                if (response[index].region === region) {
                                    var newHouse = new House(response[index]);
                                    listOfHouses.push(newHouse.name);
                                }
                            }
                            console.log(listOfHouses);
                            var context = {
                                listOfHouses
                            };
                            appendTemplate('house-results', 'bottom', context);
                            console.log(context);
                            return listOfHouses;
                        },

                        error: function(data) {
                            console.log("Error: " + data);
                        }
                    });

                },
                error: function(data) {
                    console.log("Error: " + data);
                }
            });
        }


        function init() {
            $('#top').empty();
            // updateHash('home');
            appendTemplate('about', 'top');
            appendTemplate('choose-search', 'bottom');
            var hash = window.location.hash;
            /* navigating based on hash */
            if (window.location.hash.length > 0) {
              console.log(window.location.hash);
              switch (hash) {
                case '#home':
                $('#top').empty();
                $('#bottom').empty();
                buildHomePage();
                updateHash('home');
                  break;
                case '#characters':
                $('#top').empty();
                $('#bottom').empty();
                buildCharacterSearchPage();
                updateHash('characters');
                  break;
                case '#houses':
                $('#top').empty();
                $('#bottom').empty();
                buildHousesSearchPage();
                updateHash('houses');
                  break;
                default:
                  console.log(hash);
                  break;
              }
              // init();
            }

        }
        /******************** EVENT LISTENERS ******************************/
        //when "Search Characters" is clicked, append a search field.
        $('#character-search-page').on('click', function(event) {
          event.preventDefault();
            $('#top').empty();
            $('#bottom').empty();
            buildCharacterSearchPage();
            updateHash('characters');

        });

        //when "Search Houses" is clicked, append a search field, save selection.
        $('#houses-search-page').on('click', function(event) {
          event.preventDefault();
            $('#top').empty();
            $('#bottom').empty();
            buildHousesSearchPage();
            updateHash('houses');
        });

        //when "Home" is clicked, Build Home Page.
        $('#home-page').on('click', function(event) {
          event.preventDefault();
            $('#top').empty();
            $('#bottom').empty();
            buildHomePage();
            updateHash('home');
        });

        //when character search is submitted, collect data from field and run search.
        $('#top').on('keypress', '#character-search-field', function(event) {
          if(event.keyCode === 13) {
            $('#bottom').empty();
            updateHash('characters');
            var searchString = $('#character-search-field').val();
            searchCharacters(searchString);
          }
        });

        //when houses search is submitted, collect data from field and run search.
        $('#top').on('change', '#regions', function(event) {
            $('#bottom').empty();
            updateHash('houses');
            var selectedRegion = $('#regions option:selected').text();
            searchHouses(selectedRegion);
        });
        init();
    });

})();
