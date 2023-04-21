(function () {
  "use strict";

  // Components
  const Categories = {
    templateUrl: "templates/categories.template.html",
    bindings: {
      categories: "<",
    },
  };

  angular.module("MenuApp").component("categories", Categories);
})();
