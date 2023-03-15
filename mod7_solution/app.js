(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    this.buyList = ShoppingListCheckOffService.getBuyList();

    this.handleBoughtItem = (buyItemIndex) => {
      ShoppingListCheckOffService.handleBoughtItem(buyItemIndex);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    this.currencySymbol = "$".repeat(3);
    this.boughtList = ShoppingListCheckOffService.getBoughtList();
    this.calcCost = (item) => ShoppingListCheckOffService.calcCost(item);
  }

  function ShoppingListCheckOffService() {
    const buyList = [
      { name: "Cookies", quantity: 4, pricePerItem: 2 },
      { name: "Bananas", quantity: 3, pricePerItem: 5 },
      { name: "Apples", quantity: 4, pricePerItem: 1 },
      { name: "Steaks", quantity: 6, pricePerItem: 8 },
      { name: "Cake", quantity: 1, pricePerItem: 3 },
      { name: "Bags of Rice", quantity: 2, pricePerItem: 6 },
    ];
    const boughtList = [];

    this.getBuyList = () => buyList;
    this.getBoughtList = () => boughtList;

    this.handleBoughtItem = (buyItemIndex) => {
      const buyItem = buyList.splice(buyItemIndex, 1)[0];
      boughtList.push(buyItem);
    };

    this.calcCost = (item) => item.quantity * item.pricePerItem;
  }
})();
