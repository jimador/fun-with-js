'use strict';

angular.module('sigarLandingApp')
    .controller('HomeController', function($scope) {
        // text to delete later
        var text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Praesent eros tellus, lobortis eu libero vel, tincidunt scelerisque metus. ' +
            'Etiam ut bibendum tortor. In at metus eu tortor porttitor eleifend.';
        var text2 = 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ' +
            'Duis diam ex, laoreet et nibh ac, iaculis suscipit est. Maecenas volutpat ipsum non ' +
            'risus viverra pellentesque. Proin consequat, nulla eu semper pharetra, est odio lobortis dolor,';
        var text3 = 'in ullamcorper leo quam et lacus. In augue enim, tristique eleifend tincidunt ut, cursus ut sem. ' +
            'Proin commodo aliquet elit, nec ultrices quam blandit at. Nulla porta tortor a lectus porttitor, ' +
            'tincidunt tincidunt arcu vulputate. Duis venenatis nibh et felis varius, non bibendum odio mattis.';
        var text4 = 'Nulla fermentum ullamcorper accumsan. Donec auctor neque vitae nunc aliquam luctus.' +
            'Curabitur laoreet nibh dui, sed tincidunt felis semper ut.';

        // images dir
        var imageDir = 'assets/images/';

        $scope.loopInterval = 7000;
        $scope.noWrapSlides = true;
        $scope.active = 0;
        $scope.leftImage = imageDir + 1 + '.jpg';
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function(num) {
            slides.push({
                image: imageDir + num + '.jpg',
                text: [text1, text2, text3, text4][slides.length % 4],
                id: currIndex++
            });
        };

        for (var i = 1; i <= 4; i++) {
            $scope.addSlide(i);
        }


    });
