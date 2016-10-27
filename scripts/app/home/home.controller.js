'use strict';

angular.module('sigarLandingApp')
    .controller('HomeController', function($scope) {
        var imageDir = 'assets/images/';
        $scope.loopInterval = 5000;
        $scope.noWrapSlides = true;
        $scope.active = 0;
        $scope.leftImage = imageDir + 1 + '.jpg';
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function(num) {
            slides.push({
                image: imageDir + num + '.jpg',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };

				for(var i = 1; i <= 4; i++){
					$scope.addSlide(i);
				}

    });
