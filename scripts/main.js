$(document).ready(function(){


/* set up function to attach a template */
appendTemplate = function(script, context, target) {
  var source = $('#' + script).html();
  var template = Handlebars.compile(source);
  var html = template(context);
  $("#" + target).empty();
  $(html).appendTo("#" + target);
};













});
