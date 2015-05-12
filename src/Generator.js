'use strict';
angular.module("generator", [])

.service('Words', function(){
    this.getWords = function () {
        var words = [];
        if (localStorage["names"]) words = JSON.parse(localStorage["names"]);
        return words;
    };
    this.addWord = function (text) {
        localStorage["names"] = JSON.stringify(text);
        return true;
    };
    this.clearWords = function () {
        window.localStorage.clear();
        return true
    };
})

.controller("common", [
    "$scope", "$http", "$window", "$rootScope", "$location", '$filter', 'Words',
    function ($scope, $http, $window, $rootScope, $location, $filter, Words) {

        $scope.type = "2words";
        $scope.word = '';
        $scope.resultArr = [];
        $scope.wordsArr = Words.getWords();
        $scope.chekedArr = [];

        $scope.checked = function (index) {
            $scope.chekedArr[index+1] = {ind:index, stat:!$scope.chekedArr[index+1]};
        };

        $scope.delChecked = function () {
            var ind = 0;
            $scope.chekedArr.forEach(function(item){
                if (item.stat) {
                    $scope.wordsArr. splice(item.ind-ind,1);
                    ind++;
                    Words.addWord($scope.wordsArr);
                    $scope.resultArr = [];
                }
            });
            $scope.word = '';
            $scope.chekedArr = [];
        };

        $scope.addWord = function () {
            if (!~$scope.wordsArr.indexOf($scope.word)) {
                $scope.wordsArr.push($scope.word);
                Words.addWord($scope.wordsArr);
            }
            $scope.word = '';
        };

        $scope.removeWords = function () {
            $scope.word = '';
            $scope.wordsArr = [];
            $scope.resultArr = [];
            $scope.chekedArr = [];
            Words.clearWords();
        };

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
        };

        $scope.shuffleWords = function () {
            var currentIndex = $scope.resultArr.length, temporaryValue, randomIndex ;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = $scope.resultArr[currentIndex];
                $scope.resultArr[currentIndex] = $scope.resultArr[randomIndex];
                $scope.resultArr[randomIndex] = temporaryValue;
            }
        };
}]);
