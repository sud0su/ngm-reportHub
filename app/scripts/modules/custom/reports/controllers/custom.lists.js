/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomActivitiesListCtrl
 * @description
 * # CustomActivitiesListCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomActivitiesListCtrl', ['$scope',
        '$route',
        '$location',
        '$anchorScroll',
        '$timeout',
        'ngmAuth',
        'ngmData',
        'ngmUser',
        '$translate',
        '$filter',
        'ngmCustomConfig',
        'ngmCustomDownloads', function ($scope,
            $route,
            $location,
            $anchorScroll,
            $timeout,
            ngmAuth,
            ngmData,
            ngmUser,
            $translate,
            $filter,
            ngmCustomConfig,
            ngmCustomDownloads) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            // org id
            var organization_id = ngmUser.get().organization_id;

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

                // get organization
                getOrganization: function (organization_id) {

                    // return http
                    return {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/getOrganization',
                        data: {
                            'organization_id': organization_id,
                        }
                    }
                },
                // organization
                getOrganizationHref: function () {
                    var href = '#/cluster/organization';
                    return href;
                },
                // set project details
                init: function () {

                    // title
                    $scope.report.title = $scope.report.organization.organization + ' | ' + $scope.report.organization.admin0name.toUpperCase().substring(0, 3) + ' | Activities';

                    $scope.report.reports_list = ngmCustomConfig.getReportTypesList($scope.report.organization.admin0pcode)

                    // report dashboard model
                    $scope.model = {
                        name: 'cluster_organization_stocks',
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
                                'title': 'List Activities'
                            },
                        },
                        menu: [],
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'list',
                                    card: 'white grey-text text-darken-2',
                                    config: {
                                        templateUrl: '/scripts/widgets/ngm-list/template/custom_activities.html',
                                        orgHref: $scope.report.getOrganizationHref(),
                                        admin0pcode: $scope.report.organization.admin0pcode.toLowerCase(),
                                        admin0name: $scope.report.organization.admin0name,
                                        adminRpcode: $scope.report.organization.adminRpcode.toLowerCase(),
                                        organization: $scope.report.organization.organization,
                                        organization_tag: $scope.report.organization.organization_tag,
                                        report_types: $scope.report.reports_list
                                        // format: true,
                                        // request: {
                                        //     method: 'GET',
                                        //     url: ngmAuth.LOCATION + '/api/custom/list/activities'
                                        // }
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

                    // assign to ngm app scope
                    $scope.report.ngm.dashboard.model = $scope.model;
                    setTimeout(() => {
                        $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                    }, 0);

                }

            }

            // run page
            ngmData
                .get($scope.report.getOrganization(organization_id))
                .then(function (organization) {

                    // set organization
                    $scope.report.organization = organization;

                    // set page
                    $scope.report.init();
                });

            // $scope.report.init();

        }]);
