//---------------------------
// Define our app!
//---------------------------

angular.module('Chatop',
    [
        'ngRoute',
        'ngAnimate',
        'irontec.simpleChat',
        'ngMaterial'
        //'ngMessages'
    ])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //---------------------------
        // Nice URLs
        //---------------------------

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        //---------------------------
        // Default view
        //---------------------------

        $routeProvider.when('/',
            {
                controller: 'ChatCtrl as vm',
                templateUrl: '/views/chat.html'
            });
        $routeProvider.when('/login',
            {
                controller: 'LoginCtrl',
                templateUrl: '/views/login.html'
            });
        $routeProvider.when('/signup',
            {
                controller: 'SignupCtrl',
                templateUrl: '/views/signup.html'
            });
    }])

    //---------------------------
    // On application run
    //---------------------------

    .run(['$rootScope', function ($rootScope) {
    }]);
