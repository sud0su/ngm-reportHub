angular.module('ngm.widget.form.report.type.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.report.type.list', {
                title: 'Report Type Activities Form List',
                description: 'Report Type Activities Form List',
                controller: 'ReportTypeFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/activities.list.html'
            });
    })
    .controller('ReportTypeFormListCtrl', [
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

                    if (!json.admin0pcode) {
                        missing += 'admin0pcode </br>'

                    }

                    M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                },
                save: function () {
                    $scope.master.definition

                },
                init: function () {

                }
            }

            $scope.master.init();

        }])