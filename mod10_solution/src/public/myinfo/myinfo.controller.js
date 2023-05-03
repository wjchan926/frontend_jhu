(function () {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService'];
    function MyInfoController(UserService) {
        const $ctrl = this;
        const userPreference = UserService.getUserPreference();

        if (userPreference.user === undefined) {
            $ctrl.notRegistered = true;
        } else {
            $ctrl.user = userPreference.user;
            $ctrl.favoriteDish = userPreference.user.favoriteDish;
        }
    }
})();