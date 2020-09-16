/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomProjectReportCtrl
 * @description
 * # CustomProjectReportCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomProjectReportCtrl', [
        '$scope',
        '$route',
        '$q',
        '$http',
        '$location',
        '$anchorScroll',
        '$timeout',
        'ngmAuth',
        'ngmData',
        'ngmUser', '$translate', '$filter', 'ngmCustomDownloads', 'ngmCustomConfig',
        function ($scope, $route, $q, $http, $location, $anchorScroll, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, ngmCustomDownloads,ngmCustomConfig) {
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

                // placeholder
                project: {},

                // placeholder
                definition: {},

                // location_group
                location_group: $route.current.params.location_group,

                // current user
                user: ngmUser.get(),

                // report name placeholder (is updated below)
                report: '_report',

                // get project
                getProject: $http({
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/custom/project/getProject',
                    data: {
                        id: $route.current.params.project_id
                    }
                }),
                // /custom/report/getReportDetailsById
                // get report
                getReport: $http({
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/custom/report/getReport',
                    data: {
                        report_id: $route.current.params.report_id
                    }
                }),

                // set project details
                setReport: function (data) {

                    // project
                    $scope.report.project = data[0].data;

                    // report
                    $scope.report.definition = data[1].data;

                    // set report for downloads
                    $scope.report.report = moment($scope.report.reporting_period).format('MMMM YYYY').replace(/\ /g, '_').toLowerCase() + '_' + $filter('limitTo')($scope.report.project.project_title.replace(/\ /g, '_'), 180) + '_extracted-' + moment().format('YYYY-MM-DDTHHmm');


                    // project title
                    if ($scope.report.project.admin0name) {
                        $scope.report.title = $scope.report.project.organization + ' | ' + $scope.report.project.admin0name.toUpperCase().substring(0, 3) + ' | ';
                    }
                    // title
                    $scope.report.title += $scope.report.project.project_title;

                    // $scope.report.title = " Test"


                    // add project code to subtitle?
                    var text = moment.utc($scope.report.definition.reporting_period).format('MMMM, YYYY');

                    var subtitle = text;

                    var data_bodyParams = {
                        report : $scope.report.report,
                        report_type_id: $scope.report.definition.report_type_id,
                        report_id: $scope.report.definition.id
                    }
                    $scope.report.download_config = angular.merge({}, data_bodyParams, ngmCustomConfig.getCustomBeneficiariesConfigDownload($scope.report.project.report_type_id, $scope.report.project.version))

                    // report dashboard model
                    $scope.model = {
                        name: 'cluster_project_report',
                        header: {
                            div: {
                                'class': 'col s12 m12 l12 report-header',
                                style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
                            },
                            title: {
                                'class': 'col s12 m9 l9 report-title truncate',
                                style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
                                title: $scope.report.title
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
                                    hover: 'Download Report as CSV',
                                    request: {
                                        method: 'POST',
                                        url: ngmAuth.LOCATION + '/api/custom/report/getReportCsv',
                                        // data: {
                                        //     report_type_id: $scope.report.definition.report_type_id,
                                        //     report_id: $scope.report.definition.id
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
                                            theme: 'custom_project_report_' + $scope.report.user.cluster_id,
                                            format: 'csv',
                                            url: $location.$$path
                                        }
                                    }
                                }]
                            }
                        },
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'custom.report',
                                    config: {
                                        style: $scope.report.ngm.style,
                                        project: $scope.report.project,
                                        report: $scope.report.definition
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
                    }

                    // // hide download
                    // const canDownload = ngmAuth.canDo('DASHBOARD_DOWNLOAD', {
                    //     adminRpcode: $scope.report.project.adminRpcode,
                    //     admin0pcode: $scope.report.project.admin0pcode,
                    //     cluster_id: $scope.report.project.cluster_id,
                    //     organization_tag: $scope.report.project.organization_tag
                    // });
                    // // remove download button
                    // if (!canDownload) {
                    //     $scope.model.header.download.class += ' hide';
                    // }
                    // assign to ngm app scope
                    $scope.report.ngm.dashboard.model = $scope.model;

                }

            }

            // assign to ngm app scope
            $scope.report.ngm.dashboard.model = $scope.model;

            // taost for user
            $timeout(function () {
                // Materialize.toast( $filter('translate')('loading_monhtly_progress_report'), 4000, 'success' );
                M.toast({ html: 'Loading Report....', displayLength: 4000, classes: 'success' });
            }, 400);

            // send request
            $q.all([$scope.report.getProject, $scope.report.getReport]).then(function (results) {

                // assign
                $scope.report.setReport(results);

                setTimeout(() => {
                    $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                }, 0);
            });
        }]);
