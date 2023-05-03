(function () {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$timeout', 'MenuService', 'UserService'];
  function SignupController($timeout, MenuService, UserService) {

    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.isInfoSaved = false;
    $ctrl.isMenuItemNotFound = false;
    $ctrl.favoriteDish = {};
    $ctrl.DEBOUNCE = 500; // ms


    $ctrl.onSubmit = function (signupForm) {
      $ctrl.isInfoSaved = false;

      const doOnSubmit = () => {
        if (signupForm.$valid) {
          // Do a refetch of menu item incase user tried to bypass debounce in UI
          MenuService.fetchMenuItem($ctrl.favoriteDishNum)
            .then(function (response) {
              if (response === null) {
                $ctrl.isMenuItemNotFound = true;
                $ctrl.isInfoSaved = false;
              } else {
                const [category] = $ctrl.favoriteDishNum.match(/[a-z]+|\d+/ig)

                $ctrl.user = {
                  firstName: $ctrl.firstName,
                  lastName: $ctrl.lastName,
                  phoneNumber: $ctrl.phoneNumber,
                  email: $ctrl.email,
                  favoriteDishNum: $ctrl.favoriteDishNum,
                  favoriteDish: { ...response, category }
                }
                UserService.saveUserPreference($ctrl.user);
                $ctrl.isInfoSaved = true;
                $ctrl.isMenuItemNotFound = false;
              }
            });
        }
      }

      // Debounce for same time as Dish Num check to get most updated info
      $timeout(doOnSubmit, $ctrl.DEBOUNCE);
    };

    $ctrl.validateFavoriteDish = function () {
      if ($ctrl.favoriteDishNum) {
        MenuService.fetchMenuItem($ctrl.favoriteDishNum)
          .then(function (response) {
            if (response === null) {
              $ctrl.isMenuItemNotFound = true;
            } else {
              $ctrl.isMenuItemNotFound = false;
            }
          });
      } else {
        $ctrl.isMenuItemNotFound = false;
      }
    }
  }
})();
