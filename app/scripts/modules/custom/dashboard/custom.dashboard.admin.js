/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomDashboardAdminProjectCtrl
 * @description
 * # CustomDashboardAdminProjectCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomDashboardAdminProjectCtrl', [
        '$scope',
        '$q',
        '$http',
        '$location',
        '$route',
        '$rootScope',
        '$window',
        '$timeout',
        '$filter',
        '$sce',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        'ngmCustomConfig',
        'ngmCustomLists', '$translate',
        function ($scope, $q, $http, $location, $route, $rootScope, $window, $timeout, $filter, $sce, ngmUser, ngmAuth, ngmData, ngmCustomConfig,ngmCustomLists, $translate) {

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

                // userRestrictedRouteParams: ngmAuth.getRouteParams('ADMIN'),

                // // use menu itemes by user permissions
                userMenuItems: ngmAuth.getMenuParams('ADMIN'),

                // report period start
                startDate: moment($route.current.params.start).format('YYYY-MM-DD'),

                // report period end
                endDate: moment($route.current.params.end).format('YYYY-MM-DD'),

                // report start
                startDateReport: moment().utc().startOf('M').format('YYYY-MM-DD'),

                // report end
                endDateReport: moment().utc().endOf('M').format('YYYY-MM-DD'),

                // current report
                report_file_name: 'report' + $location.$$path.replace(/\//g, '_') + '-extracted-',

                // display names
                activity_name_key: {
                    'cpie': 'CPiE',
                    'cp': 'CPAOR',
                    'gbv': 'GBV',
                    'child_protection': 'CPSS',
                    'general_protection': 'Protection',
                },

                // hq / region

                menu: [
                    {
                        'id': 'search-region',
                        'icon': 'person_pin',
                        'title': $filter('translate')('region'),
                        'class': 'teal lighten-1 white-text',
                        'rows': [{
                            'title': 'HQ',
                            'param': 'adminRpcode',
                            'active': 'all',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/all/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'AFRO',
                            'param': 'adminRpcode',
                            'active': 'afro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/afro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'AMER',
                            'param': 'adminRpcode',
                            'active': 'amer',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/amer/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'EMRO',
                            'param': 'adminRpcode',
                            'active': 'emro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/emro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'SEARO',
                            'param': 'adminRpcode',
                            'active': 'searo',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/searo/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'EURO',
                            'param': 'adminRpcode',
                            'active': 'euro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/euro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }, {
                            'title': 'WPRO',
                            'param': 'adminRpcode',
                            'active': 'wpro',
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#/custom/custom-dashboard-admin/wpro/all/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end + +($route.current.params.period ? $route.current.params.period : '/')
                        }
                        ]
                    }
                ],

                // lists
                lists: {
                    clusters: ngmCustomLists.getClusters($route.current.params.admin0pcode).filter(cluster => cluster.filter !== false),
                },

                // filtered data
                data: {
                    cluster: false,
                    admin1: false,
                    admin2: false,
                },

                // admin
                getPath: function (cluster_id, report_type_id, report_type, organization_tag,period) {

                    // var path = '/cluster/admin/' + $scope.dashboard.adminRpcode.toLowerCase() +
                    //     '/' + $scope.dashboard.admin0pcode.toLowerCase() +
                    //     '/' + cluster_id +
                    //     '/' + activity_type_id +
                    //     '/' + organization_tag +
                    //     '/' + report_type +
                    //     '/' + $scope.dashboard.startDate +
                    //     '/' + $scope.dashboard.endDate;
                    var path = '/custom/custom-dashboard-admin/' + $scope.dashboard.adminRpcode.toLowerCase() +
                        '/' + $scope.dashboard.admin0pcode.toLowerCase() +
                        '/' + cluster_id +
                        '/' + organization_tag +
                        '/' + report_type +
                        '/' + report_type_id +
                        '/' + $scope.dashboard.startDate +
                        '/' + $scope.dashboard.endDate;
                    if(period){
                        path += '/'+period
                    }

                    return path;
                },

                // set URL based on user rights
                // setUrl: function () {

                //     // if ADMIN
                //     var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);

                //     // if current location is not equal to path
                //     if (path !== $location.$$path) {
                //         //
                //         $location.path(path);
                //     }

                // },

                // request
                getRequest: function (indicator, list) {

                    var request = {
                        list: list,
                        indicator: indicator,
                        cluster_id: $scope.dashboard.cluster_id,
                        organization_tag: $scope.dashboard.organization_tag,
                        adminRpcode: $scope.dashboard.adminRpcode,
                        admin0pcode: $scope.dashboard.admin0pcode,
                        report_type: $scope.dashboard.report_type,
                        report_type_id: $scope.dashboard.report_type_id,
                        start_date: $scope.dashboard.startDateReport,
                        end_date: $scope.dashboard.endDateReport
                    }

                    return request;

                },

                // request
                getCsvRequest: function (obj) {
                    var request = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/indicator',
                        data: {
                            adminRpcode: $scope.dashboard.adminRpcode,
                            admin0pcode: $scope.dashboard.admin0pcode,
                            admin1pcode: 'all',
                            admin2pcode: 'all',
                            cluster_id: $scope.dashboard.cluster_id,
                            report_type_id: $scope.dashboard.report_type_id,
                            organization_tag: $scope.dashboard.organization_tag,
                            beneficiaries: ['all'],
                            start_date: $scope.dashboard.startDateReport,
                            end_date: $scope.dashboard.endDateReport
                        }
                    }

                    request.data = angular.merge(request.data, obj);

                    return request;
                },

                // request
                getProjectsRequest: function (obj) {
                    // constructs like sql query
                    var request = {
                        query: {
                            // dinamically construct
                        }
                    }

                    if ($scope.dashboard.adminRpcode !== 'all') {
                        request.query.adminRpcode = $scope.dashboard.adminRpcode;
                    };

                    if ($scope.dashboard.admin0pcode !== 'all') {
                        request.query.admin0pcode = $scope.dashboard.admin0pcode;
                    };

                    if ($route.current.params.cluster_id !== 'all') {
                        request.query.cluster_id = $route.current.params.cluster_id;
                    }

                    if ($route.current.params.organization_tag !== 'all') {
                        request.query.organization_tag = $route.current.params.organization_tag;
                    }

                    //start date and end date params to filter by project_start_date an project_end_date

                    request.query.project_start_date = $route.current.params.start;
                    request.query.project_end_date = $route.current.params.end;


                    // query depenging on role
                    switch ($scope.dashboard.role) {
                        case 'ADMIN':
                            request.query.cluster_id = $scope.dashboard.cluster_id;
                            break;
                        case 'USER':
                            request.query.organization_tag = $scope.dashboard.organization_tag;
                    }

                    request = angular.merge(request, obj);

                    return request;
                },

                // metrics
                getMetrics: function (type, format) {

                    var request = {
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/metrics/set',
                        data: {
                            organization: $scope.dashboard.user.organization,
                            username: $scope.dashboard.user.username,
                            email: $scope.dashboard.user.email,
                            dashboard: 'custom_dashboard_admin_' + type + '_' + $scope.dashboard.cluster_id,
                            theme: 'custom_dashboard_admin_' + type + '_' + $scope.dashboard.cluster_id,
                            format: format,
                            url: $location.$$path
                        }
                    }

                    return request;

                },

                getRequestDocUpload: function () {
                    var param = {
                        adminRpcode: $route.current.params.adminRpcode,
                        admin0pcode: $route.current.params.admin0pcode,
                        cluster_id: $route.current.params.cluster_id,
                        organization_tag: $route.current.params.organization_tag,
                        start_date: $route.current.params.start,
                        end_date: $route.current.params.end,
                        type: 'monthly'
                    }
                    request_query = $.param(param)
                    return request_query
                },

                // get downloads
                getDownloads: function () {

                    // downloads
                    var downloads = [
                        // {
                        //     type: 'pdf',
                        //     color: 'blue',
                        //     icon: 'picture_as_pdf',
                        //     hover: $filter('translate')('download_admin_as_pdf'),
                        //     request: {
                        //         method: 'POST',
                        //         url: ngmAuth.LOCATION + '/api/print',
                        //         data: {
                        //             report: $scope.dashboard.report_file_name,
                        //             printUrl: $location.absUrl(),
                        //             downloadUrl: ngmAuth.LOCATION + '/report/',
                        //             user: $scope.dashboard.user,
                        //         }
                        //     },
                        //     metrics: $scope.dashboard.getMetrics('print', 'pdf')
                        // }, 
                        // {
                        //     type: 'csv',
                        //     color: 'blue lighten-2',
                        //     icon: 'assignment',
                        //     hover: $filter('translate')('download_project_summaries_as_csv'),
                        //     request: {
                        //         method: 'POST',
                        //         url: ngmAuth.LOCATION + '/api/cluster/project/getProjects',
                        //         data: $scope.dashboard.getProjectsRequest({ report: $scope.dashboard.cluster_id_filename + '_projects' + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'), csv: true })
                        //     },
                        //     metrics: $scope.dashboard.getMetrics('projects_summary', 'csv')
                        // }, 
                        {
                            type: 'csv',
                            color: 'blue lighten-2',
                            icon: 'assignment_late',
                            hover: $filter('translate')('download') + ' ' + $scope.dashboard.report_type_id.replace(/\b\w/g, l => l.toUpperCase()) + ' ' + $filter('translate')('reports_todo'),
                            request: {
                                method: 'POST',
                                url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                data: angular.merge($scope.dashboard.getRequest('reports_due', true), { fields: $scope.dashboard.config.fields, fieldNames: $scope.dashboard.config.fieldNames, overwriteFields: $scope.dashboard.config.overwriteFields,report: $scope.dashboard.cluster_id_filename + '_' + $scope.dashboard.report_type_id + '_reports_due_' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'), csv: true })
                            },
                            metrics: $scope.dashboard.getMetrics('reports_due', 'csv')
                        }, {
                            type: 'csv',
                            color: 'blue lighten-2',
                            icon: 'assignment_turned_in',
                            hover: $filter('translate')('download') + ' ' + $scope.dashboard.report_type_id.replace(/\b\w/g, l => l.toUpperCase()) + ' ' + $filter('translate')('reports_completed'),
                            request: {
                                method: 'POST',
                                url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                data: angular.merge($scope.dashboard.getRequest('reports_submitted', true), { fields: $scope.dashboard.config.fields, fieldNames: $scope.dashboard.config.fieldNames, overwriteFields: $scope.dashboard.config.overwriteFields,report: $scope.dashboard.cluster_id_filename + '_' + $scope.dashboard.report_type_id + '_reports_complete_' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'), csv: true })
                            },
                            metrics: $scope.dashboard.getMetrics('reports_complete', 'csv')
                        }, {
                            type: 'csv',
                            color: 'blue lighten-2',
                            icon: 'group',
                            hover: $filter('translate')('download_beneficiary_data_as_csv'),
                            request: $scope.dashboard.getCsvRequest({ fields: $scope.dashboard.config.fields, fieldNames: $scope.dashboard.config.fieldNames, overwriteFields: $scope.dashboard.config.overwriteFields, csv: true, indicator: 'beneficiaries', report: $scope.dashboard.activity_filename + $scope.dashboard.cluster_id_filename + '_beneficiary_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                            metrics: $scope.dashboard.getMetrics('beneficiary_data', 'csv')
                        },];

                    // // ng wash dls
                    // var ng_wash_dl = [{
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'compare_arrows',
                    //     hover: $filter('translate')('download_accountability_dara_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'accountability', report: $scope.dashboard.activity_filename + $scope.dashboard.cluster_id_filename + '_accountability_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('accountability_data', 'csv')
                    // }, {
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'radio_button_checked',
                    //     hover: $filter('translate')('download_borehole_dara_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'boreholes', report: $scope.dashboard.cluster_id_filename + '_boreholes_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('borehole_data', 'csv')
                    // }, {
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'local_activity',
                    //     hover: $filter('translate')('download_cash_programming_data_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'cash', report: $scope.dashboard.cluster_id_filename + '_cash_programming-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('cash_programming', 'csv')
                    // }, {
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'spa',
                    //     hover: $filter('translate')('download_hygiene_data_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'hygiene', report: $scope.dashboard.cluster_id_filename + '_hygiene_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('hygiene_data', 'csv')
                    // }, {
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'wc',
                    //     hover: $filter('translate')('download_sanitation_data_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'sanitation', report: $scope.dashboard.cluster_id_filename + '_sanitation_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('sanitation_data', 'csv')
                    // }, {
                    //     type: 'csv',
                    //     color: 'teal lighten-3',
                    //     icon: 'local_drink',
                    //     hover: $filter('translate')('download_water_data_as_csv'),
                    //     request: $scope.dashboard.getCsvRequest({ csv: true, indicator: 'water', report: $scope.dashboard.cluster_id_filename + '_water_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') }),
                    //     metrics: $scope.dashboard.getMetrics('water_data', 'csv')
                    // }];

                    // NG, wash and Admin
                    if ($scope.dashboard.admin0pcode === 'NG' &&
                        $scope.dashboard.cluster_id === 'wash' &&
                        ($scope.dashboard.user.roles.indexOf('ADMIN') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('COUNTRY_ADMIN') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('CLUSTER') !== -1 ||
                            $scope.dashboard.user.roles.indexOf('SUPERADMIN') !== -1
                        )
                    ) {
                        downloads = downloads.concat(ng_wash_dl);
                    }

                    // example of blocking download
                    const canDownload = ngmAuth.canDo('DASHBOARD_DOWNLOAD', {
                        adminRpcode: $scope.dashboard.adminRpcode.toUpperCase(),
                        admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
                        cluster_id: $scope.dashboard.cluster_id,
                        organization_tag: $scope.dashboard.organization_tag
                    })
                    // remove download button
                    if (!canDownload) {
                        setTimeout(function () {
                            $scope.model.header.download.class += ' hide';
                        }, 10)
                    }

                    // return
                    return downloads;
                },

                // menu
                setMenu: function (userMenuItems) {

                    // menu rows
                    var clusterRows = [],
                        orgRows = [],
                        request = {
                            method: 'POST',
                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                            // indicator, list
                            data: $scope.dashboard.getRequest('organizations', true)
                        };

                    if (userMenuItems.includes('adminRpcode')) {
                        $scope.model.menu = $scope.dashboard.menu;
                    }

                    if (userMenuItems.includes('admin0pcode')) {
                        if ($scope.dashboard.user.organization_tag !== 'usaid') {
                            $scope.dashboard.setCountryMenu();
                        }
                    }

                    if (userMenuItems.includes('cluster_id') && $scope.dashboard.config.filter_clusters && $scope.dashboard.config.filter_clusters.length) {

                        var filter_config = [];
                        // $scope.dashboard.config.filter_clusters
                        // $scope.dashboard.lists.clusters
                        angular.forEach($scope.dashboard.lists.clusters, function (c, i) {
                            if ($scope.dashboard.config.filter_clusters.indexOf(c.cluster_id) > -1) {
                                filter_config.push(c)
                            }
                        })

                        filter_config.unshift({ cluster_id: 'all', cluster: 'ALL' });
                        angular.forEach(filter_config, function (d, i) {
                            // admin URL
                            if ($route.current.params.period) {
                                var path = $scope.dashboard.getPath(d.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                            } else {
                                var path = $scope.dashboard.getPath(d.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                            }
                            clusterRows.push({
                                'title': d.cluster,
                                'param': 'cluster_id',
                                'active': d.cluster_id,
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#' + path
                            });
                        });

                        // if ($scope.dashboard.lists.clusters[0].cluster_id !== 'all') {
                        //     $scope.dashboard.lists.clusters.unshift({
                        //         cluster_id: 'all',
                        //         cluster: 'ALL',
                        //     });
                        // }
                        // // add cluster
                        // angular.forEach($scope.dashboard.lists.clusters, function (d, i) {

                        //     // admin URL
                        //     if($route.current.params.period){
                        //         var path = $scope.dashboard.getPath(d.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                        //     }else{
                        //         var path = $scope.dashboard.getPath(d.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                        //     }
                            

                        //     // menu rows
                        //     clusterRows.push({
                        //         'title': $scope.dashboard.lists.clusters[i].cluster,
                        //         'param': 'cluster_id',
                        //         'active': d.cluster_id,
                        //         'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        //         'href': '/desk/#' + path
                        //     });

                        // });

                        $scope.model.menu.push({
                            'search': true,
                            'id': 'search-cluster',
                            'icon': 'camera',
                            'title': $filter('translate')('sector_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': clusterRows
                        });
                    }

                    // ADMIN
                    if (userMenuItems.includes('organization_tag')) {

                        // fetch org list
                        ngmData.get(request).then(function (organizations) {

                            // set organization
                            if ($scope.dashboard.organization_tag !== 'all') {
                                var org = $filter('filter')(organizations, { organization_tag: $scope.dashboard.organization_tag });
                                if (org.length) {
                                    $scope.dashboard.organization = org[0].organization;
                                    $scope.dashboard.setTitle();
                                    $scope.dashboard.setSubtitle();
                                }
                            }

                            // for each
                            organizations.forEach(function (d, i) {

                                // if exists
                                if (d) {

                                    // admin URL
                                    if ($route.current.params.period) {
                                        var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, d.organization_tag, $route.current.params.period);
                                    } else {
                                        var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, d.organization_tag);
                                    }
                            

                                    // menu rows
                                    orgRows.push({
                                        'title': d.organization,
                                        'param': 'organization_tag',
                                        'active': d.organization_tag,
                                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                        'href': '/desk/#' + path
                                    });

                                }

                            });

                            // organization menu
                            if ($scope.model.menu[$scope.model.menu.length - 1].title !== 'Organization') {
                                $scope.model.menu.push({
                                    'search': true,
                                    'id': 'search-cluster-organization',
                                    'icon': 'supervisor_account',
                                    'title': $filter('translate')('organization'),
                                    'class': 'teal lighten-1 white-text',
                                    'rows': orgRows
                                });
                            }

                        });

                    }
                    $scope.dashboard.setPeriodMenu();

                },

                setCluster: function () {
                    $scope.dashboard.cluster = $filter('filter')($scope.dashboard.lists.clusters,
                        { cluster_id: $scope.dashboard.cluster_id }, true)[0]
                },

                // // filter
                // setAdmin1: function () {
                //     $scope.dashboard.data.admin1 = $filter('filter')($scope.dashboard.lists.admin1,
                //         {
                //             admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
                //             admin1pcode: $scope.dashboard.admin1pcode
                //         }, true)[0];
                // },

                // setAdmin2: function () {
                //     $scope.dashboard.data.admin2 = $filter('filter')($scope.dashboard.lists.admin2,
                //         {
                //             admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
                //             admin1pcode: $scope.dashboard.admin1pcode,
                //             admin2pcode: $scope.dashboard.admin2pcode
                //         }, true)[0];
                // },

                //
                setTitle: function () {
                    // title
                    $scope.dashboard.title = 'ADMIN';

                    // adminR
                    if ($scope.dashboard.adminRpcode === 'all' && $scope.dashboard.admin0pcode === 'all') {
                        $scope.dashboard.title += ' | HQ ';
                    }
                    else if ($scope.dashboard.adminRpcode !== 'all' && $scope.dashboard.admin0pcode === 'all') {
                        $scope.dashboard.title += ' | ' + $scope.dashboard.adminRpcode.toUpperCase();
                    }
                    // admin0
                    else if ($scope.dashboard.admin0pcode !== 'all') {
                        $scope.dashboard.title += ' | ' + $scope.dashboard.admin0pcode.toUpperCase();
                    }

                    // cluster
                    if ($scope.dashboard.cluster_id !== 'all') {
                        $scope.dashboard.title += ' | ' + $scope.dashboard.cluster.cluster;
                    }


                    // org
                    if ($scope.dashboard.organization_tag !== 'all') {
                        var org = $scope.dashboard.organization ? ' | ' + $scope.dashboard.organization : '';
                        $scope.dashboard.title += org;
                    }

                    // report_type
                    $scope.dashboard.title += ' | ' + ($scope.dashboard.report_type_name.replace(/\b\w/g, l => l.toUpperCase()))
                    // update of rendered title
                    if ($scope.model.header && $scope.model.header.title) {
                        $scope.model.header.title.title = $scope.dashboard.title;
                    }
                },

                // subtitle
                setSubtitle: function () {
                    // subtitle
                    $scope.dashboard.subtitle = $filter('translate')('admin_dashboard_for') + ' ';
                    // admin0
                    if ($scope.dashboard.admin0pcode === 'all') {
                        $scope.dashboard.subtitle = $filter('translate')('admin_dashboard_for') + ' ' + $scope.dashboard.adminRpcode.toUpperCase();
                    }

                    if ($scope.dashboard.admin0pcode !== 'all') {
                        $scope.dashboard.subtitle += $scope.dashboard.admin0pcode.toUpperCase();
                    }
                    // cluster
                    if ($scope.dashboard.cluster_id === 'all') {
                        $scope.dashboard.subtitle += ', ' + $filter('translate')('all_clusters');
                    } else {
                        $scope.dashboard.subtitle += ', ' + $scope.dashboard.cluster.cluster.toUpperCase() + ' cluster';
                    }

                    // activity
                    // if ($scope.dashboard.activity_type_id !== 'all') {
                    //     $scope.dashboard.subtitle += ', ' + $scope.dashboard.activity_type_id.toUpperCase();
                    // }

                    // org
                    // if ($scope.dashboard.organization_tag === 'all') {
                    //     $scope.dashboard.subtitle += ', ' + $filter('translate')('all_organizations');
                    // } else {
                    //     var org = $scope.dashboard.organization ? $scope.dashboard.organization : '';
                    //     $scope.dashboard.subtitle += ', ' + org + ' ' + $filter('translate')('organization');
                    // }
                    // admin1
                    // if ( $scope.dashboard.admin1pcode === 'all' ) {
                    // 	$scope.dashboard.subtitle += ', ALL Provinces';
                    // } else {
                    // 	$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin1.admin1name.toUpperCase() + ' Province';
                    // }
                    // // admin2
                    // if ( $scope.dashboard.admin2pcode !== 'all' ) {
                    // 	$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin2.admin2name.toUpperCase() + ' District';
                    // }
                    // update of rendered title
                    // report type id
                    $scope.dashboard.subtitle += ', ' + ($scope.dashboard.report_type_name.replace(/\b\w/g, l => l.toUpperCase()))
                    if ($scope.model.header && $scope.model.header.subtitle) {
                        $scope.model.header.subtitle.title = $scope.dashboard.subtitle;
                    }
                },

                // setReportMenu: function () {

                //     // menu
                //     $scope.model.menu.push({
                //         'search': false,
                //         'id': 'search-cluster-report',
                //         'icon': 'assignment_turned_in',
                //         'title': $filter('translate')('report_mayus'),
                //         'class': 'teal lighten-1 white-text',
                //         'rows': [{
                //             'title': $filter('translate')('activity_mayus'),
                //             'param': 'report_type',
                //             'active': 'activity',
                //             'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //             'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, 'activity', $scope.dashboard.organization_tag)
                //         }, {
                //             'title': 'Stock',
                //             'param': 'report_type',
                //             'active': 'stock',
                //             'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //             'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, 'stock', $scope.dashboard.organization_tag)
                //         }]
                //     });

                // },

                // setActivityMenu: function () {
                //     // menu
                //     if ($scope.dashboard.report_type === 'activity' && $scope.dashboard.cluster_id === 'protection') {

                //         // Afghanistan
                //         if ($scope.dashboard.admin0pcode === 'af') {
                //             $scope.model.menu.push({
                //                 'search': false,
                //                 'id': 'search-cluster-activity',
                //                 'icon': 'data_usage',
                //                 'title': $filter('translate')('activity'),
                //                 'class': 'teal lighten-1 white-text',
                //                 'rows': [{
                //                     'title': $filter('translate')('all'),
                //                     'param': 'activity_type_id',
                //                     'active': 'all',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'all', 'activity', $scope.dashboard.organization_tag)
                //                 }, {
                //                     'title': 'CPiE',
                //                     'param': 'activity_type_id',
                //                     'active': 'cpie',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'cpie', 'activity', $scope.dashboard.organization_tag)
                //                 }, {
                //                     'title': 'GBV',
                //                     'param': 'activity_type_id',
                //                     'active': 'gbv',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'gbv', 'activity', $scope.dashboard.organization_tag)
                //                 }]
                //             });
                //         }

                //         // CXB
                //         if ($scope.dashboard.admin0pcode === 'cb') {
                //             $scope.model.menu.push({
                //                 'search': false,
                //                 'id': 'search-cluster-activity',
                //                 'icon': 'data_usage',
                //                 'title': 'Sub-Sector',
                //                 'class': 'teal lighten-1 white-text',
                //                 'rows': [{
                //                     'title': $filter('translate')('all'),
                //                     'param': 'activity_type_id',
                //                     'active': 'all',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'all', 'activity', $scope.dashboard.organization_tag)
                //                 }, {
                //                     'title': $filter('translate')('child_protection'),
                //                     'param': 'activity_type_id',
                //                     'active': 'child_protection',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'child_protection', 'activity', $scope.dashboard.organization_tag)
                //                 }, {
                //                     'title': 'GBV',
                //                     'param': 'activity_type_id',
                //                     'active': 'gbv',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'gbv', 'activity', $scope.dashboard.organization_tag)
                //                 }, {
                //                     'title': $filter('translate')('protection'),
                //                     'param': 'activity_type_id',
                //                     'active': 'general_protection',
                //                     'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                //                     'href': '/desk/#' + $scope.dashboard.getPath($scope.dashboard.cluster_id, 'general_protection', 'activity', $scope.dashboard.organization_tag)
                //                 }]
                //             });
                //         }

                //     }
                // },
                setCountryMenu: function () {
                    var menu = {
                        'all': {
                            'id': 'search-country',
                            'icon': 'location_on',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Afghanistan',
                                'param': 'admin0pcode',
                                'active': 'af',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/af/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Bangladesh',
                                'param': 'admin0pcode',
                                'active': 'bd',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/searo/bd/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Cox Bazar',
                                'param': 'admin0pcode',
                                'active': 'cb',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/searo/cb/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/et/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Somalia',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/so/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'South Sudan',
                                'param': 'admin0pcode',
                                'active': 'ss',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/ss/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Syria',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/sy/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Ukraine',
                                'param': 'admin0pcode',
                                'active': 'ua',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/euro/ua/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Yemen',
                                'param': 'admin0pcode',
                                'active': 'ye',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/ye/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Nigeria',
                                'param': 'admin0pcode',
                                'active': 'ng',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/ng/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            },
                            {
                                'title': 'Colombia',
                                'param': 'admin0pcode',
                                'active': 'col',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/amer/col/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            },
                            {
                                'title': 'Papua New Guinea',
                                'param': 'admin0pcode',
                                'active': 'pg',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/wpro/pg/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            },
                            {
                                'title': 'Philippines',
                                'param': 'admin0pcode',
                                'active': 'phl',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/wpro/phl/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/cd/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Ethiopia',
                                'param': 'admin0pcode',
                                'active': 'et',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/et/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Nigeria',
                                'param': 'admin0pcode',
                                'active': 'ng',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/ng/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'South Sudan',
                                'param': 'admin0pcode',
                                'active': 'ss',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/afro/ss/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/af/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Somalia',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/so/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Syria',
                                'param': 'admin0pcode',
                                'active': 'sy',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/sy/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Yemen',
                                'param': 'admin0pcode',
                                'active': 'ye',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/emro/ye/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/searo/bd/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Cox Bazar',
                                'param': 'admin0pcode',
                                'active': 'cb',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/searo/cb/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/euro/ua/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/amer/col/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
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
                                'href': '/desk/#/custom/custom-dashboard-admin/wpro/pg/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }, {
                                'title': 'Philippines',
                                'param': 'admin0pcode',
                                'active': 'phl',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': '/desk/#/custom/custom-dashboard-admin/wpro/phl/' + $route.current.params.cluster_id + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type + '/' + $route.current.params.report_type_id + '/' + $route.current.params.start + '/' + $route.current.params.end +($route.current.params.period ? $route.current.params.period : '/')
                            }]
                        }
                    }
                    $scope.model.menu.push(menu[$scope.dashboard.adminRpcode]);
                },

                setPeriodMenu:function(){
                    var periods=[
                        {name:'Week',id:'week'},
                        {name:'Fornight',id:'fortnight'},
                        {name:'Month',id:'month'},
                        {name:'Quarter',id:'quarter'},
                        {name:'Year',id:'year'}
                    ]
                    var periodRows =[];
                    angular.forEach(periods,function(p){
                        path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, p.id);
                        periodRows.push({
                            'title': p.name,
                            'param': 'period',
                            'active': p.id,
                            'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                            'href': '/desk/#' + path
                        });
                    });

                    $scope.model.menu.push({
                        'id': 'search-cluster-organization',
                        'icon': 'date_range',
                        'title': 'Period',
                        'class': 'teal lighten-1 white-text',
                        'rows': periodRows
                    });

                    
                },

                // set dashboard
                setDashboard: function () {

                    // set
                    $scope.dashboard.adminRpcode = $route.current.params.adminRpcode;
                    $scope.dashboard.admin0pcode = $route.current.params.admin0pcode;
                    $scope.dashboard.cluster_id = $route.current.params.cluster_id;
                    $scope.dashboard.organization_tag = $route.current.params.organization_tag;
                    $scope.dashboard.report_type = $route.current.params.report_type;
                    $scope.dashboard.report_type_id = $route.current.params.report_type_id;


                    var report_types = ngmCustomConfig.getReportTypesList()
                    $scope.dashboard.report_type_name = report_types.filter(x => $route.current.params.report_type_id === x.report_type_id)[0].report_type_name;

                    $scope.dashboard.config = ngmCustomConfig.getCustomAdminDashboardConfig($scope.dashboard.report_type_id);

                    // report name
                    $scope.dashboard.report_file_name += moment().format('YYYY-MM-DDTHHmm');

                    // override route params to user permitted zone params if any
                    // if ($scope.dashboard.userRestrictedRouteParams) {
                    //     for (const key of $scope.dashboard.userRestrictedRouteParams) {
                    //         $scope.dashboard[key] = $scope.dashboard.user[key].toLowerCase()
                    //     }
                    // }

                    // name for title, as for other roles it comes from api
                    // if (['USER', 'ORG'].some(role => $scope.dashboard.user.roles.includes(role))) {
                    //     $scope.dashboard.organization = $scope.dashboard.user.organization;
                    // };

                    // set
                    // $scope.dashboard.setUrl();
                    $scope.dashboard.setCluster();
                    $scope.dashboard.setTitle();
                    $scope.dashboard.setSubtitle();

                    // filename cluster needs to be mpc for cvwg
                    // TODO refactor/update cvwg
                    $scope.dashboard.cluster_id_filename = $scope.dashboard.cluster_id !== 'cvwg' ? $scope.dashboard.cluster_id : 'mpc'

                    if ($route.current.params.organization_tag !== 'all') {
                        $scope.dashboard.cluster_id_filename = $route.current.params.organization_tag + '_' + $scope.dashboard.cluster_id_filename;
                    }

                    if ($route.current.params.report_type_id !== 'all') {
                        $scope.dashboard.activity_filename = $route.current.params.report_type_id + '_';
                    }

                    if ($route.current.params.report_type_id === 'all') {
                        $scope.dashboard.activity_filename = '';
                    }

                    // model
                    $scope.model = {
                        name: 'cluster_admin_dashboard',
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
                            datePicker: {
                                'class': 'col s12 m5 l3',
                                dates: [{
                                    style: $rootScope.rtl ? 'float:right;' : 'float:left;',
                                    label: $filter('translate')('from'),
                                    format: 'd mmm, yyyy',
                                    min: '2017-01-01',
                                    max: $scope.dashboard.endDate,
                                    currentTime: $scope.dashboard.startDate,
                                    onClose: function () {
                                        // set date
                                        var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD');
                                        if (date !== $scope.dashboard.startDate) {
                                            // set new date
                                            $scope.dashboard.startDate = date;
                                            // URL
                                            if ($route.current.params.period) {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                                            } else {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                                            }
                                            // update new date
                                            $location.path(path);

                                        }
                                    }
                                }, {
                                    style: $rootScope.rtl ? 'float:left;' : 'float:right;',
                                    label: $filter('translate')('to'),
                                    format: 'd mmm, yyyy',
                                    min: $scope.dashboard.startDate,
                                    currentTime: $scope.dashboard.endDate,
                                    onClose: function () {
                                        // set date
                                        var date = moment.utc(new Date(this.currentTime)).format('YYYY-MM-DD')
                                        if (date !== $scope.dashboard.endDate) {
                                            // set new date
                                            $scope.dashboard.endDate = date;
                                            // URL
                                            if($route.current.params.period){
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                                            }else{
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                                            }
                                            // update new date
                                            $location.path(path);
                                        }
                                    }
                                }]
                            },
                            download: {
                                'class': 'col s12 m4 l4 hide-on-small-only',
                                downloads: $scope.dashboard.getDownloads()
                            }
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
                                        id: 'dashboard-btn-custom',
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest('latest', false)
                                        },
                                        toMainMenu: function () {
                                            var path = '/custom/custom-main/' + $scope.dashboard.user.adminRpcode.toLowerCase() + '/' + $scope.dashboard.user.admin0pcode.toLowerCase() + '/' + $scope.dashboard.user.organization_tag + '/' + $scope.dashboard.report_type_id;
                                            // update new date
                                            $location.path(path);
                                        },
                                        getPreviousMonth: function () {
                                            // get dates
                                            var start_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(1, 'M').startOf('M').format('YYYY-MM-DD');
                                            var end_date = moment(new Date($scope.dashboard.endDate)).utc().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');

                                            if ($route.current.params.period && $route.current.params.period === 'week' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'week') ){
                                                start_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(1, 'week').startOf('isoWeek').format('YYYY-MM-DD');
                                                end_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(1, 'week').endOf('isoWeek').format('YYYY-MM-DD');
                                            }
                                            if ($route.current.params.period && $route.current.params.period === 'fortnight' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'fortnight')){
                                                start_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(2, 'week').startOf('isoWeek').format('YYYY-MM-DD');
                                                end_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(1, 'week').endOf('isoWeek').format('YYYY-MM-DD');
                                            }

                                            if ($route.current.params.period && $route.current.params.period ==='quarter' || (!$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'quarter')){
                                                start_date = moment(new Date($scope.dashboard.startDate)).utc().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD');
                                                end_date = moment(new Date($scope.dashboard.endDate)).utc().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD');
                                            }
                                            if ($route.current.params.period && $route.current.params.period ==='year' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'year')) {
                                                start_date = moment(new Date()).utc().subtract(1, 'Y').startOf('Y').format('YYYY-MM-DD');
                                                end_date = moment(new Date()).utc().subtract(1, 'Y').endOf('Y').format('YYYY-MM-DD');
                                            }
                                            // set dates
                                            $scope.dashboard.startDate = start_date;
                                            $scope.dashboard.endDate = end_date;
                                            // set path
                                            if ($route.current.params.period) {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                                            } else {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                                            }
                                            // update new date
                                            $location.path(path);
                                        },
                                        getCurrentMonth: function () {
                                            // get dates
                                            var start_date = moment().utc().startOf('M').format('YYYY-MM-DD');
                                            var end_date = moment().utc().endOf('M').format('YYYY-MM-DD');

                                            if ($route.current.params.period === 'week'|| ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'week')) {
                                                start_date = moment(new Date()).utc().startOf('isoWeek').format('YYYY-MM-DD');
                                                end_date = moment(new Date()).utc().endOf('isoWeek').format('YYYY-MM-DD');
                                            }
                                            if ($route.current.params.period === 'fortnight'|| ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'fortnight')) {
                                                start_date = moment(new Date()).utc().startOf('isoWeek').format('YYYY-MM-DD');
                                                end_date = moment(new Date()).utc().endOf('isoWeek').format('YYYY-MM-DD');
                                            }

                                            if ($route.current.params.period === 'quarter' || (!$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'quarter')) {
                                                start_date = moment(new Date()).utc().startOf('quarter').format('YYYY-MM-DD');
                                                end_date = moment(new Date()).utc().endOf('quarter').format('YYYY-MM-DD');
                                            }
                                            if ($route.current.params.period === 'year'|| ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'year')) {
                                                start_date = moment(new Date()).startOf('Y').format('YYYY-MM-DD');
                                                end_date = moment(new Date()).endOf('Y').format('YYYY-MM-DD');
                                            }
                                            // set dates
                                            $scope.dashboard.startDate = start_date;
                                            $scope.dashboard.endDate = end_date;
                                            // set path
                                            if ($route.current.params.period) {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag, $route.current.params.period);
                                            } else {
                                                var path = $scope.dashboard.getPath($route.current.params.cluster_id, $scope.dashboard.report_type_id, $scope.dashboard.report_type, $scope.dashboard.organization_tag);
                                            }
                                            // update new date
                                            $location.path(path);
                                        },
                                        getTitle:function(){

                                            title ='MONTH';
                                            if ($route.current.params.period === 'week' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'week')) {
                                                title ='WEEK';
                                            }
                                            if ($route.current.params.period === 'fortnight' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'fortnight')) {
                                                title = 'FORTNIGHT';
                                            }

                                            if ($route.current.params.period === 'month' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'month')) {
                                                title = 'MONTH';
                                            }

                                            if ($route.current.params.period === 'quarter' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'quarter')) {
                                                title = 'QUARTER';
                                            }
                                            if ($route.current.params.period === 'year' || ( !$route.current.params.period && $scope.dashboard.config.defaultPeriod === 'year')) {
                                                title = 'YEAR';
                                            }
                                            return title;
                                        },
                                        templateUrl: '/scripts/widgets/ngm-html/template/adhoc.dashboard.admin.html'
                                    }
                                }]
                            }]
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l6',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        title: $filter('translate')('organizations'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest('organizations', false)
                                        }
                                    }
                                }]
                            }, {
                                styleClass: 's12 m12 l6',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        title: $scope.dashboard.report_type === 'stock' ? $filter('translate')('warehouses_total') : $filter('translate')('total_projects'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest($scope.dashboard.report_type === 'stock' ? 'warehouses_total' : 'projects_total', false)
                                        }
                                    }
                                }]
                            }]
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l3',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        titleIcon: {
                                            style: 'color:#e57373; font-size:64px; bottom:-10;right:-10px;',
                                            icon: 'error'
                                        },
                                        title: $filter('translate')('reports_due'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest('reports_due', false)
                                        }
                                    }
                                }]
                            }, {
                                styleClass: 's12 m12 l3',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        titleIcon: {
                                            style: 'color:#fff176; font-size:64px; bottom:-10;right:-10px;',
                                            icon: 'watch_later'
                                        },
                                        title: $filter('translate')('reports_saved'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest('reports_saved', false)
                                        }
                                    }
                                }]
                            }, {
                                styleClass: 's12 m12 l3',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        titleIcon: {
                                            style: 'color:#4db6ac; font-size:64px; bottom:-10;right:-10px;',
                                            icon: 'check_circle'
                                        },
                                        title: $filter('translate')('reports_submitted'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            data: $scope.dashboard.getRequest('reports_submitted', false)
                                        }
                                    }
                                }]
                            }, {
                                styleClass: 's12 m12 l3',
                                widgets: [{
                                    type: 'stats',
                                    style: 'text-align: center;',
                                    card: 'card-panel stats-card white grey-text text-darken-2',
                                    config: {
                                        titleIcon: {
                                            style: 'color:#2196F3; font-size:64px; bottom:-10;right:-10px;',
                                            // style: 'color:#2196F3; font-size:24px; bottom:0;',
                                            // style: 'color:#2196F3; font-size:142px; bottom:-40px; right:-50px;',
                                            icon: 'assignment_turned_in'
                                        },
                                        title: $filter('translate')('reports_total'),
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            // indicator, list
                                            data: $scope.dashboard.getRequest('reports_total', false)
                                        }
                                    }
                                }]
                            }]
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l12',
                                widgets: [{
                                    type: 'table',
                                    card: 'panel',
                                    style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
                                    config: {
                                        user: $scope.dashboard.user,
                                        cluster_id: $scope.dashboard.cluster_id,
                                        showTitle: $scope.dashboard.report_type === 'activity' ? true : false,
                                        style: $scope.dashboard.ngm.style,
                                        headerClass: 'collection-header red lighten-2',
                                        headerText: 'white-text',
                                        headerIcon: 'assignment_late',
                                        headerTitle: $filter('translate')('reports_due'),
                                        templateUrl: '/scripts/widgets/ngm-table/templates/cluster/custom.project.list.html',
                                        tableOptions: {
                                            count: 10
                                        },
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            // indicator, list
                                            data: $scope.dashboard.getRequest('reports_due', true)
                                        }
                                    }
                                }]
                            }]
                        }, {
                            columns: [{
                                styleClass: 's12 m12 l12 remove',
                                widgets: [{
                                    type: 'table',
                                    card: 'panel',
                                    style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
                                    config: {
                                        user: $scope.dashboard.user,
                                        cluster_id: $scope.dashboard.cluster_id,
                                        showTitle: $scope.dashboard.report_type === 'activity' ? true : false,
                                        style: $scope.dashboard.ngm.style,
                                        headerClass: 'collection-header teal lighten-2',
                                        headerText: 'white-text',
                                        headerIcon: 'assignment_turned_in',
                                        headerTitle: $filter('translate')('reports_completed'),
                                        templateUrl: '/scripts/widgets/ngm-table/templates/cluster/custom.project.list.html',
                                        tableOptions: {
                                            count: 10
                                        },
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/custom/admin/indicator',
                                            // indicator, list
                                            data: $scope.dashboard.getRequest('reports_submitted', true)
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
                                        // html: $scope.dashboard.ngm.footer
                                        templateUrl: '/scripts/widgets/ngm-html/template/footer.html',
                                        lightPrimaryColor: $scope.ngm.style.lightPrimaryColor,
                                        defaultPrimaryColor: $scope.ngm.style.defaultPrimaryColor,
                                    }
                                }]
                            }]
                        }]
                    }

                }

            };

            // set dashboard
            $scope.dashboard.setDashboard();
            $scope.model.menu = [];
            $scope.dashboard.setMenu($scope.dashboard.userMenuItems);

            // assign to ngm app scope ( for menu )
            $scope.dashboard.ngm.dashboard.model = $scope.model;
            setTimeout(() => {
                $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
            }, 0);

        }

    ]);
