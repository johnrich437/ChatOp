//---------------------------
// Define our app!
//---------------------------

angular.module('Chatop',
        [
            'ngRoute',
            'ngAnimate',
            'irontec.simpleChat'
        ])

    .config( ['$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider )
    {
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
                controller:     'ChatCtrl as vm',
                templateUrl:    '/views/chat.html'
            });
        $routeProvider.when('/login',
            {
                controller:     'LoginCtrl',
                templateUrl:    '/views/login.html'
            });
        ///login
    }])

    //---------------------------
    // On application run
    //---------------------------

    .run(['$rootScope', function ($rootScope)
    {
    }]);
