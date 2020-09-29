/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomListGlobalCtrl
 * @description
 * # CustomListGlobalCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomListGlobalCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', '$translate', '$filter', '$rootScope', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser,  $translate, $filter, $rootScope ) {
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

            setCountryMenu: function () {
                var menu = {
                    'all': {
                        'id': 'search-country',
                        'icon': 'location_on',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'ALL',
                            'param': 'admin0pcode',
                            'active': 'all',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/all'
                        },{
                            'title': 'Afghanistan',
                            'param': 'admin0pcode',
                            'active': 'af',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/af'
                        }, {
                            'title': 'Bangladesh',
                            'param': 'admin0pcode',
                            'active': 'bd',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/bd'
                        }, {
                            'title': 'Cox Bazar',
                            'param': 'admin0pcode',
                            'active': 'cb',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/cb'
                        }, {
                            'title': 'Democratic Republic of Congo',
                            'param': 'admin0pcode',
                            'active': 'cd',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/cluster/5w/afro/cd'
                        }, {
                            'title': 'Ethiopia',
                            'param': 'admin0pcode',
                            'active': 'et',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/et'
                        }, {
                            'title': 'Somalia',
                            'param': 'admin0pcode',
                            'active': 'so',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/so'
                        }, {
                            'title': 'South Sudan',
                            'param': 'admin0pcode',
                            'active': 'ss',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ss'
                        }, {
                            'title': 'Syria',
                            'param': 'admin0pcode',
                            'active': 'so',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/sy'
                        }, {
                            'title': 'Ukraine',
                            'param': 'admin0pcode',
                            'active': 'ua',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ua'
                        }, {
                            'title': 'Yemen',
                            'param': 'admin0pcode',
                            'active': 'ye',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ye'
                        }, {
                            'title': 'Nigeria',
                            'param': 'admin0pcode',
                            'active': 'ng',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ng'
                        },
                        {
                            'title': 'Colombia',
                            'param': 'admin0pcode',
                            'active': 'col',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/col'
                        },
                        {
                            'title': 'Papua New Guinea',
                            'param': 'admin0pcode',
                            'active': 'pg',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/pg'
                        },
                        {
                            'title': 'Philippines',
                            'param': 'admin0pcode',
                            'active': 'phl',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/phl'
                        }]
                    },
                    'afro': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Democratic Republic of Congo',
                            'param': 'admin0pcode',
                            'active': 'cd',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/cluster/5w/afro/cd'
                        }, {
                            'title': 'Ethiopia',
                            'param': 'admin0pcode',
                            'active': 'et',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/et'
                        }, {
                            'title': 'Nigeria',
                            'param': 'admin0pcode',
                            'active': 'ng',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ng'
                        }, {
                            'title': 'South Sudan',
                            'param': 'admin0pcode',
                            'active': 'ss',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ss'
                        }]
                    },
                    'emro': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Afghanistan',
                            'param': 'admin0pcode',
                            'active': 'af',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/af'
                        }, {
                            'title': 'Somalia',
                            'param': 'admin0pcode',
                            'active': 'so',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/so'
                        }, {
                            'title': 'Syria',
                            'param': 'admin0pcode',
                            'active': 'sy',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/sy'
                        }, {
                            'title': 'Yemen',
                            'param': 'admin0pcode',
                            'active': 'ye',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ye'
                        }]
                    },
                    'searo': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Bangladesh',
                            'param': 'admin0pcode',
                            'active': 'bd',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/bd'
                        }, {
                            'title': 'Cox Bazar',
                            'param': 'admin0pcode',
                            'active': 'cb',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/cb'
                        }]
                    },
                    'euro': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Ukraine',
                            'param': 'admin0pcode',
                            'active': 'ua',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/ua'
                        },]
                    },
                    'amer': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country_mayus'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Colombia',
                            'param': 'admin0pcode',
                            'active': 'col',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/col'
                        },]
                    },
                    'wpro': {
                        'id': 'search-country',
                        'icon': 'person_pin',
                        'title': $filter('translate')('country'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'Papua New Guinea',
                            'param': 'admin0pcode',
                            'active': 'pg',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/pg'
                        }, {
                            'title': 'Philippines',
                            'param': 'admin0pcode',
                            'active': 'phl',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/config/global/phl'
                        }]
                    }
                }
                $scope.model.menu.push(menu['all']);
            },

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
                $scope.list.title = 'Global Lists' +($route.current.params.admin0pcode === 'all'? ' | ALL': ' | '+ $route.current.params.admin0pcode.toUpperCase());
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
                            title: $scope.list.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle',
                            title: 'List Global'
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
                                    newUrl: '#/custom/config/global-detail/'+$route.current.params.admin0pcode+'/new',
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
                                    templateUrl: '/scripts/widgets/ngm-list/template/global_list.html',
									// request: {
                                    //     method:'GET',
                                    //     url: ngmAuth.LOCATION + '/api/getCustomLists',
                                    //     params:{
                                    //         admin0pcode: $route.current.params.admin0pcode,
                                    //         list_type_id:'global'
                                    //     }
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
                                    templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                    lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                    defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                }
                            }]
                        }]
                    }]
                };

                $scope.list.setCountryMenu()

                // assign to ngm app scope
                $scope.list.ngm.dashboard.model = $scope.model;

            }

        }
        // run page

        $scope.list.init();

    }]);
