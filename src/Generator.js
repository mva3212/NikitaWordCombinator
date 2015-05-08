'use strict';
angular.module("generator", []);

angular.module('generator').controller("common", [
    "$scope", "$http", "$window", "$rootScope", "$location", '$filter',
    function ($scope, $http, $window, $rootScope, $location, $filter) {
        $scope.word = '';
        $scope.wordsArr = [];

        $scope.addWord = function () {
            if (!~$scope.wordsArr.indexOf($scope.word)) {
                $scope.wordsArr.push($scope.word);

            }
            $scope.word = '';

        };

        $scope.removeWords = function () {
            $scope.word = '';
            $scope.wordsArr = [];
            $scope.resultArr = [];
        };

        $scope.resultArr = [];

        $scope.generate = function (val) {
            $scope.resultArr = [];
            if (val == '2words') {
                for (var i = 0; i < $scope.wordsArr.length; i++) {
                    for (var j = 0; j < $scope.wordsArr.length; j++) {
                        if (i != j) {
                            var newStr = $scope.wordsArr[i] + ' ' + $scope.wordsArr[j];
                            $scope.resultArr.push(newStr)
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.wordsArr.length; i++) {
                    for (var j = 0; j < $scope.wordsArr.length; j++) {
                        for (var k = 0; k < $scope.wordsArr.length; k++) {

                            if (i != j && i != k && j != k) {
                                var newStr = $scope.wordsArr[i] + ' ' + $scope.wordsArr[j] + ' ' + $scope.wordsArr[k];
                                $scope.resultArr.push(newStr);
                            }

                        }
                    }

                }
            }
        }
    }]);
