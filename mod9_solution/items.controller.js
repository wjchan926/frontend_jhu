(function () {
  "use strict";

  angular.module("MenuApp").controller("ItemsController", ItemsController);

  ItemsController.$inject = ["items"];
  function ItemsController(items) {
    this.name = items[0];
    this.items = items[1];
  }
})();
