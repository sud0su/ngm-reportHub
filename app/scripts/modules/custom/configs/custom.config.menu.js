/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomConfigMainCtrl
 * @description
 * # CustomConfigMainCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomConfigMainCtrl', ['$scope', '$route', '$http', '$location', '$timeout', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', 'ngmCustomConfig', function ($scope, $route, $http, $location, $timeout, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope, ngmCustomConfig) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.menu = {

            // ngm
            ngm: $scope.$parent.ngm,

            // current user
            user: ngmUser.get(),

            title: '',

            // set summary
            init: function () {
                $scope.menu.title = 'Activities | Global Lists';
                var subtitle = 'Global List ...';

                // report dashboard model
                $scope.model = {
                    name: 'custom_config_main',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.menu.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m12 l12 report-title truncate',
                            style: 'color: ' + $scope.menu.ngm.style.defaultPrimaryColor,
                            title: $scope.menu.title
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
                                    html: '<a class="btn-flat waves-effect waves-teal left" href="#/cluster/organization"><i class="material-icons mirror left">keyboard_return</i>' + 'HOME' + '</a>'
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
                                    templateUrl: '/scripts/widgets/ngm-html/template/custom.config.main.html',
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
                                    // html: $scope.menu.ngm.footer
                                    templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                    lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                    defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                }
                            }]
                        }]
                    }]
                };

                // assign to ngm app scope
                $scope.menu.ngm.dashboard.model = $scope.model;

            }

        }

        $scope.menu.init()

    }]);