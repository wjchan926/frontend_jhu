(function (window) {
  const byeSpeaker = {};

  const speakWord = "Good Bye";

  byeSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  };

  byeSpeaker.speakSimple = function(name) {
    return speakWord + " " + name;
  }

  window.byeSpeaker = byeSpeaker;
})(window);
