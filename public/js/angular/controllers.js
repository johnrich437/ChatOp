//----------------------------
// Default Controller
//----------------------------

angular.module('Chatop')
    .controller('ChatCtrl', function ($scope, $interval, $http, API) {

        var vm = this;
        API.GetUserName()
            .then(function (response) {
                vm.username = response.data.username;
            });
        $interval(function () {
            $scope.getMessage()
        }, 1000)
        var message;
        var bigID = 0;
        vm.messages = [];
        $scope.getMessage = function () {

            API.getMessages(bigID)
                .then(function (response) {
                    var messages = response.data;
                    Array.prototype.push.apply(vm.messages, messages);
                    bigID = vm.messages[vm.messages.length - 1]._id;
                    var elem = document.getElementById('messagesChat');
                    if (messages.length > 0) {
                        setTimeout(function () {
                            elem.scrollTop = elem.scrollHeight;
                        }, 100);
                    }
                    //$("#messagesChat").scrollTop($("#messagesChat")[0].scrollHeight);
                });
        };
        vm.sendMessage = function (message) {
            API.sendMessage(message);
        }
    });

angular.module('Chatop')
    .controller('LoginCtrl', ['$scope', '$route', '$location', function ($scope, $route, $location) {
        $scope.login = function () {
            $.ajax(
                {
                    url: "/login",
                    type: "POST",
                    data: JSON.stringify({username: document.getElementById("username").value}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                }).done(
                function (data, status) {
                    if (data.message == "ok")
                        location.href = "/";
                });
        }
    }]);
angular.module('Chatop')
    .controller('SignupCtrl', function ($scope, API) {
        $scope.signUp = function () {
            API.signUp($scope.user).then(function (response) {
                if (response.data.message == "") {
                    location.href = "/";
                }
                else {

                }
            });

        }
    })
    .config(function ($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('grey');
    });