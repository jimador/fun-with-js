"use strict";

angular.module("sigarLandingApp", ["ngRoute", "ngAnimate", "ngSanitize", "ui.bootstrap"])
		.config(function($routeProvider){
			$routeProvider.when("/", {
				templateUrl: "/scripts/app/home/home.html",
				controller: "HomeController"
			});
		});
