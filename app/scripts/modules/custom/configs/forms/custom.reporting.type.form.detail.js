angular.module('ngm.widget.reporting.type.form.detail', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('reporting.type.form.detail', {
                title: 'Reporting Type Detail Form',
                description: 'Reporting Type Detail Form',
                controller: 'ReportingTypeDetailFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/activities.list.html'
            });
    })
    .controller('ReportingTypeDetailFormCtrl', [
        '$scope',
        'config',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$location',
        function (
            $scope,
            config,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $location
        ) {

            $scope.master = {
                // current user
                user: ngmUser.get(),
                definition: config.definition,
                validate: function () {
                    json = JSON.parse($scope.master.definition)
                    missing = '';

                    // if (!json.admin0pcode) {
                    //     missing += 'admin0pcode </br>'

                    // }
                    // if (!json.list_type_id) {
                    //     missing += 'list_type_id </br>'

                    // }
                    // if (!json.reporting_type_id) {
                    //     missing += 'reporting_type_id </br>'
                    // }
                    // if (!json.date_start) {
                    //     missing += 'date_start </br>'

                    // }
                    // if (!json.date_end) {
                    //     missing += 'date_end </br>'
                    // }
                    if(missing ===''){
                        $scope.master.save()
                    }else{
                        M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                    }
                },
                save: function () {
                    // $scope.master.definition
                    $location.path('/custom/config/reporting-types/dummy')
                    // console.log($scope.master.config, json)
                },
                init: function () {

                }
            }

            $scope.master.init();

        }])