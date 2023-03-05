(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.lunchList = "";
    $scope.lunchMessage = "";
    $scope.emptyItemErrorMsg = "";
    $scope.msgColor = {};

    let hasEmptyItem = false;

    $scope.checkIfTooMuch = function () {
      // Dont bother processing
      if (!$scope.lunchList.length) {
        handleEmpty();
        // Reset emptyItemErrorMsg
        $scope.emptyItemErrorMsg = "";
        return;
      }

      // string to array, delimit by ","
      // Remove whitespace
      // Remove nulls/undefined/empty
      const lunchListArr = $scope.lunchList.split(",");
      const lunchListArrFormatted = lunchListArr
        .map((item) => item.trim())
        .filter(Boolean);

      hasEmptyItem = lunchListArr.some((item) => !item.length);

      if (!lunchListArrFormatted.length) {
        handleEmpty();
        return;
      }

      handleLunchItems(lunchListArrFormatted);
    };

    /**
     * Set scope vars based on empty conditions.
     */
    function handleEmpty() {
      $scope.lunchMessage = "Please enter data first.";
      $scope.msgColor = { color: "red", border: "1px solid red" };
      $scope.emptyItemErrorMsg = hasEmptyItem
        ? "Empty Items are not counted."
        : "";
    }

    /**
     * Set scope vars vased on item list.
     * @param {*} lunchList
     * @returns
     */
    function handleLunchItems(lunchList) {
      $scope.msgColor = { color: "green", border: "1px solid green" };
      $scope.emptyItemErrorMsg = hasEmptyItem
        ? "Empty Items are not counted."
        : "";
      if (lunchList.length <= 3) {
        $scope.lunchMessage = "Enjoy!";
        return;
      }
      $scope.lunchMessage = "Too much!";
    }
  }
})();
