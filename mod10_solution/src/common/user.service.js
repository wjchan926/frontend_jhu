(function () {
  "use strict";

  angular.module("common").service("UserService", UserService);

  UserService.$inject = [];
  function UserService() {
    var service = this;
    var userPreference = {};

    service.saveUserPreference = function (user, favoriteItem) {
      userPreference.user = user;
      userPreference.favoriteItem = favoriteItem;
    };

    service.getUserPreference = function () {
      return userPreference;
    };
  }
})();
