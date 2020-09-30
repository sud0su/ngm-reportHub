angular.module('ngm.widget.form.activities.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.activities.list', {
                title: 'Activities Form List',
                description: 'Activities Form List',
                controller: 'ActivitieslFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/global.list.html'
            });
    })
    .controller('ActivitieslFormListCtrl', [
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
                validate: function () {
                    json = JSON.parse($scope.master.definition)
                    missing = '';

                    if (!json.activity) {
                        missing += 'activity </br>'

                    }

                    M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                },
                save: function () {
                    $scope.master.definition

                    // console.log($scope.master.config, json)
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])