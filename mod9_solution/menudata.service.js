(function () {
  "use strict";

  angular
  .module("data")
  .service("MenuDataService", MenuDataService);

  MenuDataService.$inject = ["$http"];
  function MenuDataService($http) {
    this.getAllCategories = function () {
      return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json",
      });
    };

    this.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url:
          "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" +
          categoryShortName +
          ".json",
      });
    };
  }
})();
