/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomListActivitieslCtrl
 * @description
 * # CustomListActivitieslCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomListActivitieslCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, $translate, $filter, $rootScope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // init empty model
        $scope.model = $scope.$parent.ngm.dashboard.model;

        // report object
        $scope.list = {

            // ngm
            ngm: $scope.$parent.ngm,

            // user
            user: ngmUser.get(),

            // init
            init: function () {

                // report dashboard model
                // $scope.model = {
                //     name: 'cluster_project_list',
                //     header: {
                //         div: {
                //             'class': 'col s12 m12 l12 report-header',
                //             style: 'border-bottom: 3px ' + $scope.list.ngm.style.defaultPrimaryColor + ' solid;'
                //         },
                //         title: {
                //             'class': 'col s12 m9 l9 report-title truncate',
                //             style: 'font-size: 3.4rem; color: ' + $scope.list.ngm.style.defaultPrimaryColor,
                //             title: 'Global Lists'
                //         },
                //         subtitle: {
                //             'class': 'col s12 m12 l12 report-subtitle hide-on-small-only',
                //             title: 'List Global' 
                //         },
                //         // download: {
                //         //     'class': 'col s12 m3 l3 hide-on-small-only',
                //         //     downloads: [
                //         //         {
                //         //             type: 'csv',
                //         //             color: 'blue lighten-2',
                //         //             icon: 'assignment',
                //         //             hover: 'Download Organization CSV',
                //         //             request: {
                //         //                 method: 'GET',
                //         //                 url: ngmAuth.LOCATION + '/api/list/organizationsCSV',
                //         //                 params: {
                //         //                     admin0pcode: $route.current.params.admin0pcode
                //         //                 },
                //         //                 data: {
                //         //                     report: 'list_organization_' + $route.current.params.admin0pcode,
                //         //                     csv: true
                //         //                 }
                //         //             },
                //         //             metrics: {
                //         //                 method: 'POST',
                //         //                 url: ngmAuth.LOCATION + '/api/metrics/set',
                //         //                 data: {
                //         //                     organization: $scope.list.user.organization,
                //         //                     username: $scope.list.user.username,
                //         //                     email: $scope.list.user.email,
                //         //                     dashboard: 'organization list',
                //         //                     theme: 'list_organizations',
                //         //                     format: 'csv',
                //         //                     url: $location.$$path
                //         //                 }
                //         //             }
                //         //         }
                //         //     ]
                //         // }
                //     },
                //     menu: [],
                //     rows: [{
                //         columns: [{
                //             styleClass: 's12 m12 l12',
                //             widgets: [{
                //                 type: 'html',
                //                 card: 'white grey-text text-darken-2',
                //                 style: 'padding: 20px;',
                //                 config: {
                //                     html: '<a class="btn-flat waves-effect waves-teal left hide-on-small-only" href="#/custom/config-menu/"><i class="material-icons left">keyboard_return</i> Back </a>'
                //                 }
                //             }]
                //         }]
                //     }, 
                //     {
                //         columns: [{
                //             styleClass: 's12 m12 l12',
                //             widgets: [{
                //                 type: 'form.global.list',
                //                 style: 'padding:0px; height: 90px; padding-top:10px;',
                //                 config: {
                //                     style: $scope.list.ngm.style
                //                 }
                //             }]
                //         }]
                //     }, 
                //     {
                //         columns: [{
                //             styleClass: 's12 m12 l12',
                //             widgets: [{
                //                 type: 'html',
                //                 card: 'card-panel',
                //                 style: 'padding:0px; height: 90px; padding-top:10px;',
                //                 config: {
                //                     html: $scope.list.ngm.footer
                //                 }
                //             }]
                //         }]
                //     }]
                // };

                $scope.model = {
                    name: 'cluster_project_list',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.list.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'color: ' + $scope.list.ngm.style.defaultPrimaryColor,
                            title: 'Activities Lists'
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle',
                            title: 'List Activities'
                        },
                    },
                    menu: [],
                    rows: [{
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'html',
                                card: 'white grey-text text-darken-2',
                                style: 'padding: 20px;',
                                config: {
                                    newUrl: '#/custom/config/activities-detail/new',
                                    templateUrl: '/scripts/widgets/ngm-html/template/custom.global.list.btn.html'
                                }
                            }]
                        }]
                    }, {
                        columns: [{
                            styleClass: 's12 m12 l12',
                            widgets: [{
                                type: 'list',
                                card: 'white grey-text text-darken-2',
                                config: {
                                    titleIcon: 'alarm_on',
                                    // color: 'teal lighten-4',
                                    color: 'blue lighten-1',
                                    textColor: 'white-text',
                                    title: 'List',
                                    icon: 'edit',
                                    templateUrl: '/scripts/widgets/ngm-list/template/global_list.html'
                                    // request: $scope.list.getProjectRequest( 'active' )
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
                                    templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                    lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                    defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                }
                            }]
                        }]
                    }]
                };

                // assign to ngm app scope
                $scope.list.ngm.dashboard.model = $scope.model;

            }

        }
        // run page

        $scope.list.init();

    }]);
