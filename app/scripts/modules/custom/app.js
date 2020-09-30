/**
 * @ngdoc overview
 * @name ngmReportHubApp
 * @description
 * # ngmReportHubApp
 *
 * Main module of the application.
 */
angular
    .module('ngmCustom', [])
    .config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {

        // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476#.ufea9sjt1
        $compileProvider.debugInfoEnabled(false);




        this.page = {
            start_date: function () {
                var date;
                if (moment.utc().date() <= 20) {
                    date = moment.utc().startOf('M').subtract(1, 'M').format('YYYY-MM-DD')
                } else {
                    date = moment.utc().startOf('M').format('YYYY-MM-DD');
                }
                return date;
            },
            end_date: function () {
                var date;
                if (moment.utc().date() <= 20) {
                    date = moment.utc().endOf('M').subtract(1, 'M').format('YYYY-MM-DD')
                } else {
                    date = moment.utc().endOf('M').format('YYYY-MM-DD');
                }
                return date;
            },
        }

        // app routes with access rights
        $routeProvider
            // login
            .when('/cluster/login', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardLoginCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAnonymous();
                    }],
                }
            })
            // register
            .when('/cluster/register', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardRegisterCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAnonymous();
                    }],
                }
            })
            // reset with token
            .when('/cluster/find/:token', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardResetCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAnonymous();
                    }],
                }
            })
            // reset with token
            .when('/cluster/pending/', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardPendingUserCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.grantPublicAccess();
                    }],
                }
            })
            // forbidden
            .when('/cluster/forbidden', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardForbiddenCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return !ngmAuth.isAuthenticated();
                    }],
                }
            })
            // guides
            .when('/cluster/guides', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardGuidesMenuCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.grantPublicAccess();
                    }],
                }
            })
            // feedback
            .when('/cluster/guides/feedback', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardGuidesFeedbackCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.grantPublicAccess();
                    }],
                }
            })
            // screencasts
            .when('/cluster/guides/screens', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardGuidesScreenCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.grantPublicAccess();
                    }],
                }
            })
            // organization
            .when('/cluster/organization', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'ClusterAppCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            // project list by organization
            .when('/cluster/organization/:organization_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'ClusterAppCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })

            // Ad-Hoc
            .when('/custom/custom-activities', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomActivitiesListCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })

            // Ad-Hoc
            .when('/custom/custom-main/:adminRpcode/:admin0pcode/:organization_tag/:report_type_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomMainCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })


            // Ad-Hoc
            .when('/custom/custom-project-lists/:adminRpcode/:admin0pcode/:organization_tag/:report_type_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomProjectListsCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })

            // Ad-Hoc
            .when('/custom/custom-project/:report_type_id/:project_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomProjectDetailCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/custom-projects-summary/:project_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomProjectSummaryCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/custom-project-report/:project_id/:report_id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomProjectReportCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/custom-reports/:project_id/', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomReportsListCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/custom-dashboard-admin/:adminRpcode/:admin0pcode/:cluster_id/:organization_tag/:report_type/:report_type_id/:start/:end/:period?', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomDashboardAdminProjectCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/custom-dashboard/3w/:adminRpcode/:admin0pcode/:cluster_id/:organization_tag/:report_type/:report_type_id/:start/:end', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomDashboardProjectCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/file/:adminRpcode/:admin0pcode/:cluster_id/:organization_tag/:report_type/:report_type_id/:start/:end', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomFileListCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/schedule/:adminRpcode/:admin0pcode/:cluster_id/:organization_tag/:report_type/:report_type_id/:start/:end', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomScheduleCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })

            // CONFIG CustomListGlobalConfigCtrl
            .when('/custom/config-menu/', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomConfigMainCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/config/global/',{
                redirectTo: '/custom/config/global/all'
            })
            .when('/custom/config/global/:admin0pcode', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListGlobalCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/config/global-detail/:admin0pcode/:id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListGlobalDetailCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/config/report-types/', {
                redirectTo: '/custom/config/report-types/all'
            })
            .when('/custom/config/report-types/:admin0pcode', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListReportTypeslCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/config/report-types-detail/:admin0pcode/:id', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListReportTypeDetailCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            .when('/custom/config/config-lists/', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListConfigCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })

            .when('/custom/config/list-menu/', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'CustomListMenuCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return ngmAuth.isAuthenticated();
                    }],
                }
            })
            // FORBIDDEN
            .when('/cluster/forbidden', {
                templateUrl: '/views/app/dashboard.html',
                controller: 'DashboardForbiddenCtrl',
                resolve: {
                    access: ['ngmAuth', function (ngmAuth) {
                        return !ngmAuth.isAuthenticated();
                    }],
                }
            })
            // CLUSTER HOME
            .when('/cluster', {
                redirectTo: '/cluster/organization'
            })
            // DEFAULT
            .otherwise({
                redirectTo: '/cluster/organization'
            });

    }]);
