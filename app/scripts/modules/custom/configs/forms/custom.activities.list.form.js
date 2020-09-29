angular.module('ngm.widget.form.activities.list', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('form.activities.list', {
                title: 'Activities Form List',
                description: 'Activities Form List',
                controller: 'ActivitiesFormListCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/activities.list.html'
            });
    })
    .controller('ActivitiesFormListCtrl', [
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
                organization: config.organization,
                itemsPerPage: 9,
                listId: 'ngm-paginate-' + Math.floor((Math.random() * 1000000)),
                search: {
                    filter: '',
                    focused: false
                },
                editedOrg: {},
                removeOrg: {},
                openAddModal: function (modal) {
                    $('#' + modal).modal({ dismissible: false });
                    $('#' + modal).modal('open');
                    $scope.listAtribute = {
                    };

                },
                // removeOrgModal: function (org) {
                //     $scope.master.removeOrg = org;
                //     $('#remove-org-modal').modal({ dismissible: false });
                //     $('#remove-org-modal').modal('open');

                // },
                init: function () {

                }
            }

            $scope.master.init();

        }])