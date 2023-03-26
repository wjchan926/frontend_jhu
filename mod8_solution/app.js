(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective)
    .constant(
      "MENU_ITEMS_ENDPOINT",
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    );

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    this.title = "Found Items";

    this.narrowItDownClick = () => {
      if (!this.searchTerm) {
        this.found = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(this.searchTerm).then((res) => {
        this.found = res;
      });
    };

    this.removeItem = (index) => {
      this.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "MENU_ITEMS_ENDPOINT"];
  function MenuSearchService($http, MENU_ITEMS_ENDPOINT) {
    this.getMatchedMenuItems = (searchTerm) => {
      return $http({
        method: "GET",
        url: MENU_ITEMS_ENDPOINT,
      }).then((result) => {
        const searchTermLowerCase = searchTerm.toLowerCase();

        const foundItems = [];

        const { data } = result;
        Object.values(data).forEach((item) => {
          const { menu_items } = item;

          menu_items.forEach((menuItem) => {
            if (
              menuItem.description.toLowerCase().includes(searchTermLowerCase)
            ) {
              foundItems.push(menuItem);
            }
          });
        });

        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: "E",
      templateUrl: "foundItems.html",
      scope: {
        foundItems: "<",
        title: "@title",
        onRemove: "&",
      },
    };

    return ddo;
  }
})();
