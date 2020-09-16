/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomProjectSummaryCtrl
 * @description
 * # CustomProjectSummaryCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomProjectSummaryCtrl', ['$scope', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', function ($scope, $route, $http, $location, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // return project
        ngmData.get({
            method: 'POST',
            url: ngmAuth.LOCATION + '/api/custom/project/getProject',
            data: {
                id: $route.current.params.project_id
            }
        }).then(function (data) {
            // assign data
            $scope.report.setProjectSummary(data);
        });


        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.report = {

            // ngm
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            title: '',

            // projects href
            getProjectsHref: function () {
                var href = '#/custom/custom-project-lists/' + $scope.report.project.adminRpcode.toLowerCase() + '/' + $scope.report.project.admin0pcode.toLowerCase() + '/' + $scope.report.project.organization_tag + '/' + $scope.report.project.report_type_id;

                return href;
            },

            // set summary
            setProjectSummary: function (data) {

                // set project
                $scope.report.project = data;
                // $scope.report.title='test'
                // project title
                if ($scope.report.project.admin0name) {
                    $scope.report.title = $scope.report.project.organization + ' | ' + $scope.report.project.admin0name.toUpperCase().substring(0, 3) + ' | ';
                }
                // title
                $scope.report.title += $scope.report.project.project_title;

                // add project code to subtitle?
                var subtitle = $scope.report.project.report_type_name + ' : ' + $scope.report.project.project_description;

                // report dashboard model
                $scope.model = {
                    name: 'cluster_adhoc_project_summary',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m12 l12 report-title truncate',
                            style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
                            title: $scope.report.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle truncate',
                            'title': subtitle
                        }
                    },
                    rows: [{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 20px;',
                                config: {
                                    html: '<span class="left show-on-small hide-on-med-and-up" style="padding-top:8px;padding-left:17px;padding-bottom: 15px;">' + $filter('translate')('last_updated') + ': ' + moment($scope.report.project.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a') + '</span>' + '<a class="btn-flat waves-effect waves-teal left" href="' + $scope.report.getProjectsHref() + '"><i class="material-icons mirror left">keyboard_return</i>' + ($filter('translate')('back_to_projects')) + '</a><span class="right hide-on-small-only" style="padding-top:8px;">' + $filter('translate')('last_updated') + ': ' + moment($scope.report.project.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a') + '</span>'
                                }
                            }]
                        }]
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 0px;',
                                config: {
                                    project: $scope.report.project,
                                    user: $scope.report.user,
                                    report_date: moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD'),
                                    templateUrl: '/scripts/modules/custom/views/custom.project.summary.html',
                                    periode_report: $scope.report.project.reporting_period_type.replace(/\b\w/g, l => l.toUpperCase()),

                                    // // permissions
                                    canEdit: ngmAuth.canDo('EDIT', { adminRpcode: $scope.report.project.adminRpcode, admin0pcode: $scope.report.project.admin0pcode, cluster_id: $scope.report.project.cluster_id, organization_tag: $scope.report.project.organization_tag }),

                                    // mark project active
                                    markActive: function (project) {

                                        // mark project active
                                        project.project_status = 'active';

                                        // timeout
                                        $timeout(function () {
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 6000, classes: 'note' });
                                        }, 200);

                                        // Submit project for save
                                        ngmData.get({
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/project/setProject',
                                            data: {
                                                project: project
                                            }
                                        }).then(function (data) {
                                            // redirect on success
                                            // Materialize.toast( $filter('translate')('project_moved_to_active')+'!', 6000, 'success');
                                            M.toast({ html: $filter('translate')('project_moved_to_active') + '!', displayLength: 6000, classes: 'success' });
                                        });

                                    },

                                    // mark poject complete
                                    markComplete: function (project) {

                                        // mark project complete
                                        project.project_status = 'complete';

                                        // timeout
                                        $timeout(function () {
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 6000, classes: 'note' });
                                        }, 200);

                                        // Submit project for save
                                        ngmData.get({
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/project/setProject',
                                            data: {
                                                project: project
                                            }
                                        }).then(function (data) {
                                            // redirect on success
                                            $location.path('/custom/custom-project-lists/' + $scope.report.project.adminRpcode.toLowerCase() + '/' + $scope.report.project.admin0pcode.toLowerCase() + '/' + $scope.report.project.organization_tag + '/' + $scope.report.project.report_type_id);
                                            // Materialize.toast( $filter('translate')('project_market_as_complete_congratulations')+'!', 6000, 'success');
                                            M.toast({ html: $filter('translate')('project_market_as_complete_congratulations') + '!', displayLength: 6000, classes: 'success' });
                                        });

                                    },
                                    deleteProject: function (project) {

                                        // timeout
                                        $timeout(function () {
                                            //   Materialize.toast( $filter('translate')('processing')+'...', 6000, 'note'); 
                                            M.toast({ html: $filter('translate')('processing') + '...', displayLength: 6000, classes: 'note' });
                                        }, 200);

                                        // Submit project for save
                                        $http({
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/project/delete',
                                            data: {
                                                project_id: project.id
                                            }
                                        }).success(function (data) {

                                            // redirect on success
                                            if (data.err) {
                                                // Materialize.toast( $filter('translate')('project_delete_error_please_try_again'), 6000, 'error');
                                                M.toast({ html: $filter('translate')('project_delete_error_please_try_again'), displayLength: 6000, classes: 'error' });
                                            }
                                            if (!data.err) {
                                                $location.path('/custom/custom-project-lists/' + $scope.report.project.adminRpcode.toLowerCase() + '/' + $scope.report.project.admin0pcode.toLowerCase() + '/' + $scope.report.project.organization_tag + '/' + $scope.report.project.report_type_id);
                                                // Materialize.toast( $filter('translate')('project_deleted')+'!', 6000, 'success');
                                                M.toast({ html: $filter('translate')('project_deleted') + '!', displayLength: 6000, classes: 'success' });
                                            }
                                        }).error(function (err) {
                                            // redirect on success
                                            // Materialize.toast( $filter('translate')('project_delete_error_please_try_again'), 6000, 'error');
                                            M.toast({ html: $filter('translate')('project_delete_error_please_try_again'), displayLength: 6000, classes: 'error' });
                                        });
                                    }

                                }
                            }]
                        }]
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'card-panel',
                                style: 'padding:0px; height: 90px; padding-top:10px;',
                                config: {
                                    // html: $scope.report.ngm.footer
                                    templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                    lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                    defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                }
                            }]
                        }]
                    }]
                };

                // assign to ngm app scope
                $scope.report.ngm.dashboard.model = $scope.model;

            }

        }

    }]);