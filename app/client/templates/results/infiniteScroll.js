var TEXTS_INCREMENT = 2000;
// temporarily make it huge, lower in the future
Session.setDefault('textsLimit', 2000 + TEXTS_INCREMENT);

// This is run every time one of the variables has been changed.
Deps.autorun(function() {
  var term = Session.get('term');
  var limit = Session.get('textsLimit');
  if (!term)
    return;
  console.log(term, limit, "Deps.autorun function has been run.");
  Meteor.subscribe('texts',
    {
      term: term,
      limit: limit
    });
});


// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
  var threshold, target = $("#showMoreResults");
  if (!target.length) {
    return;
  }

  //console.log($(window).scrollTop(), $(window).height(), target.height());
  threshold = $(window).scrollTop() + $(window).height() - target.height();
  //console.log(threshold, target.offset().top);

  if (target.offset().top <= threshold) {
    if (!target.data("visible")) {
      //console.log("target became visible (inside viewable area)");
      target.data("visible", true);
      Session.set("textsLimit",
        Session.get("textsLimit") + TEXTS_INCREMENT);
    }
  } else {
    if (target.data("visible")) {
      //console.log("target became invisible (below viewable arae)");
      target.data("visible", false);
    }
  }
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);
