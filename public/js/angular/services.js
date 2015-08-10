
//---------------------------
// API Factory
//---------------------------

angular.module('Chatop')
    .factory('API', function($http)
    {
        //----------------------------
        // Publicly-accessible methods
        //----------------------------

        return{
            getMessages:function(id){
                return $http.get("/getMessages?id=" + id);
            },
            sendMessage:function(content){
                var message = {content : content}
                return  $http(
                    {
                        url: "/sendMessage",
                        method: "POST",
                        data: JSON.stringify(message),
                        headers: {'Content-Type': 'application/json'}
                    });
            }

        };
    });