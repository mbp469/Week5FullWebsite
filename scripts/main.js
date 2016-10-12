$(document).ready(function() {


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

    /* set up query to api based on type of search */

    function search(searchString) {

        var settings = {
            async: true,
            crossDomain: true,
            "url": "http://www.anapioficeandfire.com/characters/384",
            method: "GET",
            processData: false,
            error: handleError,
            headers: {},
            // data: dataObject,
            dataType: 'json',
            contentType:    'application/json',
        };



        $.ajax(settings).done(function(response) {

            console.log(response);
        });

    }
    function handleError() {
      console.log("error");
    }
    search('Jon Snow');

    // function apiGet(queryType, query){
    //
    //   var baseUrl = "http://www.anapioficeandfire.com";
    //   var endPoint;
    //   var method = "GET";
    //   // dataObject = (!dataObject) ? {} : dataObject;
    //   query = (!query) ? '' : query;
    //   switch (queryType) { // query dictionary
    //     case 'nameSearch': // Search Method
    //       endPoint = '/characters?name=' + query;
    //       break;
    //     default:
    //       endPoint = null;
    //       break;
    //   }
    //
    //   var settings = {
    //     async: true,
    //     crossDomain: false,
    //     url: baseUrl + endPoint,
    //     method: method,
    //     processData: false,
    //     error: handleError,
    //     headers: {
    //
    //     },
    //     data: dataObject,
    //     dataType: 'json'
    //   };
    //
    //   return settings;
    // }

});
