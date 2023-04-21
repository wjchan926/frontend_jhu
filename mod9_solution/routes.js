(function () {
  "use strict";

  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/home.template.html",
      })
      .state("categories", {
        url: "/categories",
        templateUrl: "templates/categories.template.html",
        controller: "CategoriesController as categoriesCtrl",
        resolve: {
          categories: [
            "MenuDataService",
            function (MenuDataService) {
              return MenuDataService.getAllCategories().then(function (
                response
              ) {
                return response.data;
              });
            },
          ],
        },
      })
      .state("items", {
        url: "/items/{categoryShortName}",
        templateUrl: "templates/items.template.html",
        controller: "ItemsController as itemsCtrl",
        resolve: {
          items: [
            "$stateParams",
            "MenuDataService",
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              ).then(function (response) {
                return [response.data.category.name, response.data.menu_items];
              });
            },
          ],
        },
      });
  }
})();
