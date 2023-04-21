(function () {
  "use strict";

  // Components
  const Items = {
    templateUrl: "templates/items.template.html",
    bindings: {
      items: "<",
    },
  };

  angular.module("MenuApp").component("items", Items);
})();
