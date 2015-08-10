//----------------------------
// Default Controller
//----------------------------

angular.module('Chatop')
    .controller('ChatCtrl', function ($scope, $interval, $http, API) {

        var vm = this;

        vm.username = 'Matt';

        $interval(function () {
            $scope.getMessage()
        }, 1000)
        var message;
        var bigID = 0;
        vm.messages = [];
        $scope.getMessage = function () {

            API.getMessages(bigID)
                .then(function(response) {
                    var messages = response.data;
                    Array.prototype.push.apply(vm.messages, messages);
                    bigID = vm.messages[vm.messages.length -1]._id;
                    $("#messagesChat").scrollTop($("#messagesChat")[0].scrollHeight);
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