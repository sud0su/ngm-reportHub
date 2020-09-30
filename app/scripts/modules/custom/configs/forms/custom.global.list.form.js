angular.module('ngm.widget.form.global.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.global.list', {
                title: 'Global Form List',
                description: 'Global Form List',
                controller: 'GlobalFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/global.list.html'
            });
    })
    .controller('GlobalFormListCtrl', [
        '$scope',
        'config',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        function (
            $scope,
            config,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                definition: config.definition,
                validate:function(){
                    json = JSON.parse($scope.master.definition)
                    missing='';
    
                    if(!json.admin0pcode){
                        missing += 'admin0pcode </br>'
                        
                    }
                    if(!json.list_type_id){
                        missing += 'list_type_id </br>'
                        
                    }
                    if(!json.reporting_type_id){
                        missing += 'reporting_type_id </br>'
                    }
                    if(!json.date_start){
                        missing += 'date_start </br>'
                        
                    }
                    if(!json.date_end){
                        missing += 'date_end </br>'
                    }

                    M.toast({ html: 'Please Put The missing atribute below </br>'+ missing, displayLength: 4000, classes: 'error' });
                },
                save:function(){
                    $scope.master.definition
                   
                    // console.log($scope.master.config, json)
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])