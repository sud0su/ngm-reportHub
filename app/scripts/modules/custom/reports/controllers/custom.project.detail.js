/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomProjectDetailCtrl
 * @description
 * # CustomProjectDetailCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomProjectDetailCtrl', ['$scope', '$route', '$location', '$anchorScroll', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmCustomHelper', '$translate', '$filter', 'ngmCustomDownloads', 'ngmCustomConfig', function ($scope, $route, $location, $anchorScroll, $timeout, ngmAuth, ngmData, ngmUser, ngmCustomHelper, $translate, $filter, ngmCustomDownloads, ngmCustomConfig) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // empty Project
        $scope.report = {

            // parent
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            // current report
            report: 'report' + $location.$$path.replace(/\//g, '_') + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'),

            // set project details
            setProject: function (data) {

                // assign data
                $scope.report.project = data;
                var title = ''
                // set model to null
                if ($route.current.params.project_id === 'new') {
                    var report_types = ngmCustomConfig.getReportTypesList()
                    var report_type_name = report_types.filter(x => $route.current.params.report_type_id === x.report_type_id)[0].report_type_name;

                    // var text = ($route.current.params.report_type_id ? $route.current.params.report_type_id.replace(/\b\w/g, l => l.toUpperCase()) : '');
                    var text = $route.current.params.report_type_id ? report_type_name.replace(/\b\w/g, l => l.toUpperCase()) : '';
                    title = (text === '' ? 'New project' : 'New ' + text + ' Project');
                    subtitle = text === '' ? 'New Project' : 'New Project for ' + text;
                } else {
                    title += $scope.report.project.project_title;
                    subtitle = 'Descriptions:' + $scope.report.project.project_description;
                }
                var data = {report: $filter('limitTo')($scope.report.project.project_title, 180) + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'),
                    project_id: $scope.report.project.id}
                $scope.report.download_config = angular.merge({}, data, ngmCustomConfig.getCustomConfigProjectDownload($scope.report.project.report_type_id,$scope.report.project.version));

                // report dashboard model
                $scope.model = {
                    name: 'cluster_adhoc_project_setting',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
                            title: title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle truncate',
                            'title': subtitle
                        },
                        download: {
                            'class': 'col s12 m3 l3 hide-on-small-only',
                            downloads: [{
                                type: 'csv',
                                color: 'blue lighten-2',
                                icon: 'assignment',
                                hover: 'Project Setting CSV',
                                request: {
                                    method: 'POST',
                                    url: ngmAuth.LOCATION + '/api/custom/project/getProjectCsv',
                                    // data: {
                                    //     report: $filter('limitTo')($scope.report.project.project_title, 180) + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'),
                                    //     project_id: $scope.report.project.id
                                    // }
                                    data: $scope.report.download_config
                                },
                                metrics: {
                                    method: 'POST',
                                    url: ngmAuth.LOCATION + '/api/metrics/set',
                                    data: {
                                        organization: $scope.report.user.organization,
                                        username: $scope.report.user.username,
                                        email: $scope.report.user.email,
                                        dashboard: $scope.report.project.project_title,
                                        theme: 'cluster_adhoc_project_setting',
                                        format: 'csv',
                                        url: $location.$$path
                                    }
                                }
                            }]
                        }
                    },
                    rows: [
                        {
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'custom.project.detail',
                                    config: {
                                        style: $scope.report.ngm.style,
                                        project: $scope.report.project
                                    }
                                }]
                            }]
                        },
                        {
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
                }
                //hide download
                const canDownload = ngmAuth.canDo('DASHBOARD_DOWNLOAD', {
                    adminRpcode: $scope.report.project.adminRpcode,
                    admin0pcode: $scope.report.project.admin0pcode,
                    cluster_id: $scope.report.project.cluster_id,
                    organization_tag: $scope.report.project.organization_tag
                });
                // remove download button
                // if (!canDownload) {
                //     $scope.model.header.download.class += ' hide';
                // }

                // assign to ngm app scope
                $scope.report.ngm.dashboard.model = $scope.model;

            }

        }

        // Run page

        // if 'new' create empty project
        if ($route.current.params.project_id === 'new') {
            // get new project
            var project = ngmCustomHelper.getNewCustomProject(ngmUser.get(), $route.current.params.report_type_id);
            // set summary
            $scope.report.setProject(project);
            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);
        } else {

            // return project
            ngmData.get({
                method: 'POST',
                url: ngmAuth.LOCATION + '/api/custom/project/getProject',
                data: {
                    id: $route.current.params.project_id
                }
            }).then(function (data) {
                // assign data
                if (data.id) {
                    $scope.report.setProject(data);

                    setTimeout(() => {
                        $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                    }, 0);
                } else {

                    // report dashboard model
                    $scope.model = {
                        name: 'cluster_project_details',
                        header: {
                            div: {
                                'class': 'col s12 report-header',
                                style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
                            },
                            title: {
                                'class': 'col s12',
                                style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
                                title: 'Project Not Found!'
                            },
                            subtitle: {
                                'class': 'col s12 report-subtitle truncate hide-on-small-only',
                                'title': 'This project has not been found, please return to your list of projects and try again!'
                            }
                        },
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'form.authentication',
                                    // card: 'card-panel',
                                    style: 'padding:0px; height: ' + $scope.report.ngm.style.height + 'px;',
                                    config: {
                                        style: $scope.report.ngm.style,
                                        templateUrl: '/scripts/app/views/authentication/404.html'
                                    }
                                }]
                            }]
                        }]
                    }

                    // assign to ngm app scope
                    $scope.report.ngm.dashboard.model = $scope.model;
                    setTimeout(() => {
                        $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                    }, 0);

                    // send them away
                    $timeout(function () {
                        $location.path('/custom/custom-project-lists/' + $scope.report.user.adminRpcode.toLowerCase() + '/' + $scope.report.user.admin0pcode.toLowerCase()+'/'+$scope.report.user.organization_tag+'/'+ $route.current.params.report_type_id);
                    }, 11500);

                }

            });

        }

    }]);
