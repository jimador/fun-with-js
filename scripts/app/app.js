'use strict';'use strict';

//Main app js file for asi new hire
//initial form data should include
//    FIRST NAME
//    LAST NAME
//    HIRE DATE
//    START DATE
//    ADDRESS
//    PHONE NUMBER
//    SALARY
//    TITLE
//    POSITION
//    SUPERVISOR
//    PROJECT
//    CLEARANCE – INTERIM, SECRET, TOP SECRET, NONE

var Person = function Person(person) {
    if (person) {
        this.firstName = person.firstName;
        this.lastName = person.lastName;
        this.hireDate = person.hireDate;
        this.startDate = person.startDate;
        this.address = person.address;
        this.phoneNumber = person.phoneNumber;
        this.salary = person.salary;
        this.title = person.title;
        this.position = person.position;
        this.supervisor = person.supervisor;
        this.project = person.project;
        this.clearance = person.clearance;
    } else {
        this.firstName = '';
        this.lastName = '';
        this.hireDate = new Date();
        this.startDate = new Date();
        this.address = new Address();
        this.phoneNumber = '';
        this.salary = null;
        this.title = '';
        this.position = '';
        this.supervisor = '';
        this.project = null;
        this.clearance = '';
    }
};

var Address = function Address(address) {
    if (address) {
        this.streetOne = address.streetOne;
        this.streetTwo = address.streetTwo;
        this.city = address.city;
        this.state = address.state;
        this.zip = address.zip;
        this.country = address.country;
    } else {
        this.streetOne = '';
        this.streetTwo = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.country = '';
    }
};

var states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];

var clearances = [
    {
        value: 'NONE',
        label: 'None'
    },
    {
        value: "INTERIM",
        label: 'Interim'
    },
    {
        value: "SECRET",
        label: 'Secret'
    },
    {
        value: "TOP SECRET",
        label: 'Top Secret'
    }
];

angular.module('newHireApp', ['mgcrea.ngStrap', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(function ($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'MM/dd/yyyy',
            startWeek: 1
        });
    })

    .config(function ($dropdownProvider) {
        angular.extend($dropdownProvider.defaults, {
            html: true
        });
    })

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/scripts/app/home/home.html',
             controller: 'PersonalInfoCtrl'
        })
    })

    .controller('PersonalInfoCtrl', function ($scope, newHireFactory) {
        $scope.person = new Person();
        $scope.clearances = clearances;
        $scope.states = states;

        var original = angular.copy($scope.person);

        this.reset = function () {
            $scope.person = angular.copy(original);
            $scope.personalInfoForm.$setPristine();
        };

        this.submit = function (isValid,person) {
            if(isValid){
                newHireFactory.submit(person);
            }
        };
    })

    .factory('newHireFactory',['$http', '$q', '$log', function ($http, $q){
        return {
            submit : function (person){
                var deferred = $q.defer();
                $http.post('/newHire/', person)
                    .success(function(data){
                        deferred.resolve(
                            $log.info(data)
                        ).error(function(code, msg){
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });
                    });
                return deferred.promise;
            }
        }
    }
  ]);
