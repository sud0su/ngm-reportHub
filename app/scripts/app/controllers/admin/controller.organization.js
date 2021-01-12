
/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:OrganizationContactPageCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('OrganizationContactPageCtrl', [
        '$scope',
        '$q',
        '$http',
        '$location',
        '$route',
        '$rootScope',
        '$window',
        '$timeout',
        '$filter',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        'ngmClusterHelper',
        'ngmClusterLists',
        'ngmLists',
        '$translate',
        '$filter',
        'NgTableParams',
        function ($scope, $q, $http, $location, $route, $rootScope, $window, $timeout, $filter, ngmUser, ngmAuth, ngmData, ngmClusterHelper, ngmClusterLists, ngmLists, $translate, $filter, NgTableParams) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            // init empty model
            $scope.model = $scope.$parent.ngm.dashboard.model;

            // create dews object
            $scope.dashboard = {

                // parent
                ngm: $scope.$parent.ngm,

                // current user
                user: ngmUser.get(),

                
                // set dashboard
                init: function () {
                    // model
                    $scope.model = {
                        name: 'profile_page_dashboard',
                        header: {
                            div: {
                                'class': 'col s12 m12 l12 report-header',
                                'style': 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
                            },
                            title: {
                                'class': 'col s12 m8 l8 report-title truncate',
                                'style': 'color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
                                'title': $scope.dashboard.title,
                            },
                            subtitle: {
                                'class': 'col hide-on-small-only report-subtitle truncate m7 l9',
                                'title': $scope.dashboard.subtitle,
                            },
                        },
                        menu: [],
                        rows: [{
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'html',
                                    card: 'white grey-text text-darken-2',
                                    style: 'margin:15px; padding-bottom:30px;',
                                    config: {
                                        id: 'dashboard-btn-performance',
                                        templateUrl: '/scripts/widgets/ngm-html/template/org-contact-btn.html',
                                        toAdmin:function(){
                                            url = $rootScope.backToAdmin ? $rootScope.backToAdmin:'#/cluster/admin/' + $scope.dashboard.user.adminRpcode.toLowerCase() + '/' + $scope.dashboard.user.admin0pcode.toLowerCase();
                                            return url;
                                            
                                        },
                                        join: $scope.dashboard.join
                                    }
                                }]
                            }]
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'org.profile',
                                    card: 'white grey-text text-darken-2',
                                    style: 'margin:15px; padding-bottom:30px;',
                                    config: {
                                        id: 'profile_org_page',
                                        style:$scope.dashboard.ngm.style,
                                        cluster: ngmClusterLists.getClusters('all'),
                                        organization: $scope.dashboard.organization,
                                        templateUrl: '/scripts/widgets/ngm-html/template/organization-contact.html',
                                        request: {
                                            method: 'GET',
                                            url: ngmAuth.LOCATION + '/api/getUsersForOrgPage',
                                            params: {
                                                organization: $scope.dashboard.organization.organization,
                                                statistic: 'true'
                                            }
                                        },
                                        
                                    }
                                }]
                            }]
                            }, 
                            // {
                            //     columns: [{
                            //         styleClass: 's12',
                            //         widgets: [{
                            //             type: 'table',
                            //             card: 'panel',
                            //             style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
                            //             config: {
                            //                 style: $scope.dashboard.ngm.style,
                            //                 headerClass: 'collection-header blue lighten-2',
                            //                 headerText: 'white-text',
                            //                 headerIcon: 'group',
                            //                 headerTitle: 'List of User',
                            //                 templateUrl: '/scripts/widgets/ngm-table/templates/cluster/org-page-table.html',
                            //                 tableOptions: {
                            //                     count: 10,
                            //                     sorting: { updatedAt: "desc" }
                            //                 },
                            //                 request: {
                            //                     method: 'GET',
                            //                     url: ngmAuth.LOCATION + '/api/getUsersForOrgPage',
                            //                     params: {
                            //                         organization: $route.current.params.organization,
                            //                         statistic: 'false'
                            //                     }
                            //                 },
                            //             }
                            //         }]
                            //     }]
                            // },
                            {
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
                    }
                    $scope.dashboard.ngm.dashboard.model = $scope.model;
                }

            };
            ngmData.get({
                method: 'POST',
                    url: ngmAuth.LOCATION + '/api/getOrganization',
                        data: {
                    'organization_id': $route.current.params.organization
                }
            }).then(function(org){
                $scope.dashboard.organization = org;
                $scope.dashboard.title = org.organization.toUpperCase() +' | '+org.admin0pcode+ ' | Organization',
                $scope.dashboard.join = moment(org.createdAt).format('MMMM Do YYYY, h:mm:ss a')

                $scope.dashboard.subtitle = 'Page for ' + org.organization.toUpperCase() + ' Organization',
                $scope.dashboard.init();
            })
        }

    ]);

