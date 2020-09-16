/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomMainCtrl
 * @description
 * # CustomMainCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomMainCtrl', ['$scope', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', 'ngmCustomConfig', function ($scope, $route, $http, $location, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope, ngmCustomConfig) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.report = {

            // ngm
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            title: '',

            // set summary
            init: function () {
                var report_types = ngmCustomConfig.getReportTypesList($route.current.params.admin0pcode.toUpperCase())
                $scope.report.report_type_name = report_types.filter(x => $route.current.params.report_type_id === x.report_type_id)[0].report_type_name;
                // var text_title = $route.current.params.report_type_id ? $route.current.params.report_type_id.replace(/\b\w/g, l => l.toUpperCase()) : '';
                var text_title = $route.current.params.report_type_id ? $scope.report.report_type_name.replace(/\b\w/g, l => l.toUpperCase()) : '';
                $scope.report.title = text_title === '' ? 'Main Menu' : text_title + ' Menu';

                // add project code to subtitle?
                var subtitle = text_title === '' ? 'Main Menu' : 'Main Menu for ' + text_title;

                // report dashboard model
                $scope.model = {
                    name: 'ad_hoc_main',
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
                                    html: '<a class="btn-flat waves-effect waves-teal left" href="#/custom/custom-activities"><i class="material-icons mirror left">keyboard_return</i>' + 'Back to Activities' + '</a>'
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
                                    user: $scope.report.user,
                                    templateUrl: '/scripts/modules/custom/views/custom.main.html',
                                    report_type_id: $route.current.params.report_type_id,
                                    admin0pcode: $route.current.params.admin0pcode,
                                    adminRpcode: $route.current.params.adminRpcode,
                                    organization_tag: $route.current.params.organization_tag,
                                    cluster_id: $scope.report.user.cluster_id,
                                    star_date: moment.utc().date() <= 20 ? moment.utc().startOf('M').subtract(1, 'M').format('YYYY-MM-DD') : moment.utc().startOf('M').format('YYYY-MM-DD'),
                                    end_date: moment.utc().date() <= 20 ? moment.utc().endOf('M').subtract(1, 'M').format('YYYY-MM-DD') : moment.utc().endOf('M').format('YYYY-MM-DD'),
                                    title: text_title


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

        $scope.report.init()

    }]);