/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomProjectListsCtrl
 * @description
 * # CustomProjectListsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CustomProjectListsCtrl', ['$scope', '$location', '$route', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmCustomHelper', '$translate', '$filter', '$rootScope', 'ngmCustomConfig', function ($scope, $location, $route, ngmAuth, ngmData, ngmUser, ngmCustomHelper, $translate, $filter, $rootScope, ngmCustomConfig) {
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

            // user
            user: ngmUser.get(),

            // form to add new project
            newProjectUrl: '#/custom/custom-project/' + $route.current.params.report_type_id + '/new',

            // report download title
            report_title: ngmUser.get().organization_tag + '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm'),

            // title
            title: ngmUser.get().organization + ' | ' + ngmUser.get().admin0name.toUpperCase().substring(0, 3) + ' | ' + $filter('translate')('projects_mayus1'),

            // subtitle
            subtitle: $filter('translate')('projects_for_mayus1') + ' ' + ngmUser.get().organization + ' ' + ngmUser.get().admin0name,

            // organization
            getOrganizationHref: function () {
                var href = '#/cluster/organization';
                if ($route.current.params.organization_id) { href += '/' + $route.current.params.organization_id }
                return href;
            },

            // get organization
            getOrganization: function (organization_id) {

                // return http
                var request = {
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/getOrganization',
                    data: {
                        'organization_id': organization_id
                    }
                }

                // return
                return request;
            },

            // set the header titles
            setTitles: function () {

                // if org_id, get org data
                // if ( $route.current.params.organization_id ) {

                // fetch org data
                // 	ngmData
                // 		.get( $scope.report.getOrganization( $scope.report.organization_id ) )
                // 		.then( function( organization ){

                // 			// set titles
                // 			$scope.model.header.download.downloads[0].request.data.report = organization.organization_tag  +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' );
                // 			$scope.model.header.title.c = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring( 0, 3 ) + ' | '+$filter('translate')('projects_mayus1');
                // 			$scope.model.header.subtitle.title = $filter('translate')('projects_for_mayus1')+' ' + organization.organization + ' ' + organization.admin0name;
                // 			$scope.report.title = organization.organization + ' | ' + organization.admin0name.toUpperCase().substring(0, 3) + ' | ' + $filter('translate')('projects_mayus1');
                // 		});

                // }

                var countrylist = {
                    all: 'All',
                    af: 'Afghanistan', bd: 'Bangladesh', cb: 'Cox Bazar',
                    cd: 'Democratic Republic of Congo', et: 'Ethiopia',
                    so: 'Somalia', ss: 'South Sudan', sy: 'Syria', ua: 'Ukraine',
                    ye: 'Yemen', ng: 'Nigeria', col: 'Colombia', pg: 'Papua New Guinea',
                    phl: 'Philippines'
                };
                $scope.model.header.download.downloads[0].request.data.report = ''
                $scope.model.header.title.title = '';
                $scope.model.header.subtitle.title = ''
                $scope.report.title = '';
                if ($route.current.params.adminRpcode === 'all') {
                    $scope.model.header.download.downloads[0].request.data.report = 'all'
                    $scope.model.header.title.title = 'HQ'
                    $scope.model.header.subtitle.title = 'All ' + $filter('translate')('projects_for_mayus1') + ' All Region '
                    $scope.report.title = 'HQ'
                }
                if ($route.current.params.adminRpcode !== 'all' && $route.current.params.admin0pcode === 'all') {
                    $scope.model.header.download.downloads[0].request.data.report = $scope.report.adminRpcode
                    $scope.model.header.title.title = $scope.report.adminRpcode.toUpperCase()
                    $scope.model.header.subtitle.title = 'All ' + $filter('translate')('projects_for_mayus1') + ' Region ' + $scope.report.adminRpcode.toUpperCase()
                    $scope.report.title = $scope.report.adminRpcode.toUpperCase
                }
                if ($route.current.params.admin0pcode !== 'all') {
                    $scope.model.header.download.downloads[0].request.data.report = (countrylist[$scope.report.admin0pcode]).toLowerCase()
                    $scope.model.header.title.title = (countrylist[$scope.report.admin0pcode]).toUpperCase().substring(0, 3)
                    $scope.model.header.subtitle.title = 'All ' + ($route.current.params.admin0pcode === 'af' ? $filter('translate')('activty_for_plans_mayus1') : $filter('translate')('projects_for_mayus1')) + ' ' + (countrylist[$scope.report.admin0pcode])
                    $scope.report.title = (countrylist[$scope.report.admin0pcode]).toUpperCase().substring(0, 3)
                }
                if ($route.current.params.organization_tag !== 'all') {
                    $scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_' + $scope.report.organization_tag
                    $scope.model.header.title.title = $scope.model.header.title.title + " | " + $scope.report.organization_tag.toUpperCase()
                    $scope.model.header.subtitle.title = $scope.model.header.subtitle.title + ' | Organization ' + $scope.report.organization_tag.toUpperCase()
                    $scope.report.title = $scope.report.title + " | " + $scope.report.organization_tag.toUpperCase()
                }

                if ($route.current.params.cluster_id !== 'all') {
                    $scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_' + $scope.report.cluster_id
                    $scope.model.header.title.title = $scope.model.header.title.title + " | " + $scope.report.cluster_id.toUpperCase()
                    $scope.model.header.subtitle.title = $scope.model.header.subtitle.title + ' | Cluster ' + $scope.report.cluster_id.toUpperCase()
                    $scope.report.title = $scope.report.title + " | " + $scope.report.cluster_id.toUpperCase()
                }
                $scope.model.header.download.downloads[0].request.data.report = $scope.model.header.download.downloads[0].request.data.report + '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm');
                $scope.model.header.title.title = $scope.model.header.title.title + ' | ' + ($route.current.params.admin0pcode === 'af' ? $filter('translate')('activty_plans_mayus1') : $filter('translate')('projects_mayus1'));
                $scope.report.title = $scope.report.title + " | " + $scope.report.cluster_id.toUpperCase() + ' | ' + $filter('translate')('projects_mayus1');
            },

            getQuery: function (object) {
                query = {};
                if ($scope.report.adminRpcode !== 'all') {
                    query.adminRpcode = $scope.report.adminRpcode;
                };

                if ($scope.report.admin0pcode !== 'all') {
                    query.admin0pcode = $scope.report.admin0pcode;
                };

                if ($route.current.params.organization_tag !== 'all') {
                    query.organization_tag = $scope.report.organization_tag;
                }
                query.report_type_id = $scope.report.report_type_id
                // var admin_org = ["OCHA", "iMMAP"];
                // if ($scope.report.user.roles.find(rol => rol === "COUNTRY") &&
                //     $scope.report.user.admin0pcode === "COL" && //delete to enable for all countries
                //     admin_org.includes($scope.report.user.organization)) {

                //     query = {
                //         admin0pcode: $scope.report.user.admin0pcode
                //     };
                // }
                query= angular.merge({},query,object)
                return query;
            },
            // fetches request for project list
            getProjectRequest: function (project_status) {


                var filter = {
                    project_status: project_status
                }
                if ($scope.report.adminRpcode !== 'all') {
                    filter.adminRpcode = $scope.report.adminRpcode;
                };

                if ($scope.report.admin0pcode !== 'all') {
                    filter.admin0pcode = $scope.report.admin0pcode;
                };


                if ($route.current.params.organization_tag !== 'all') {
                    filter.organization_tag = $scope.report.organization_tag;
                }

                filter.report_type_id = $scope.report.report_type_id

                // var admin_org = ["OCHA", "iMMAP"];
                // if ($scope.report.user.roles.find(rol => rol === "COUNTRY") &&
                //     $scope.report.user.admin0pcode === "COL" && //delete to enable for all countries
                //     admin_org.includes($scope.report.user.organization)) {

                //     filter = {
                //         project_status: project_status,
                //         admin0pcode: $scope.report.user.admin0pcode
                //     };
                // }


                // /custom/project/getProjectsList
                // get projects
                var request = {
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/custom/project/getProjectsList',
                    data: { filter: filter }
                }

                // return
                return request;

            },
            getCsvRequest: function (obj) {
                var request = {
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/custom/indicator',
                    data: {
                        cluster_id: $scope.report.cluster_id,
                        organization_tag: $scope.report.organization_tag,
                        adminRpcode: $scope.report.adminRpcode,
                        admin0pcode: $scope.report.admin0pcode,
                        admin1pcode: 'all',
                        admin2pcode: 'all',
                        report_type: 'all',
                        report_type_id: $scope.report.report_type_id,
                        start_date: '1970-01-01',
                        end_date: moment().format('YYYY-MM-DDTHHmm'),
                        csv: true, 
                        indicator: "beneficiaries", 
                        report: ngmUser.get().organization_tag + '_' + $scope.report.report_type_name.toLowerCase() + '_projects-extracted-'+ moment().format('YYYY-MM-DDTHHmm')
                    }
                }
                request.data = angular.merge(request.data, obj);
                return request;
            },
            // setUrl: function () {
            //     if ($scope.report.userRestricted.length) {
            //         out_zone = false
            //         $scope.report.userRestricted.forEach(function (e) {
            //             if ($route.current.params[e] !== $scope.report[e]) {
            //                 out_zone = true
            //             }
            //         })
            //         if (out_zone) {
            //             path = '/cluster/projects/list/' + $scope.report.adminRpcode + '/' + $scope.report.admin0pcode + '/' + $scope.report.organization_tag + '/' + $scope.report.cluster_id;
            //             $location.path(path);
            //         }
            //     }
            // },

            // init
            init: function () {

                // org id
                $scope.report.organization_id =
                    $route.current.params.organization_id ? $route.current.params.organization_id : ngmUser.get().organization_id;

                // org tag
                $scope.report.organization_tag =
                    $route.current.params.organization_tag ? $route.current.params.organization_tag : ngmUser.get().organization_tag;

                // sector
                $scope.report.cluster_id =
                    $route.current.params.cluster_id ? $route.current.params.cluster_id : ngmUser.get().cluster_id;

                // country
                $scope.report.admin0pcode = $route.current.params.admin0pcode ? $route.current.params.admin0pcode : ngmUser.get().admin0pcode;

                // region
                $scope.report.adminRpcode = $route.current.params.adminRpcode ? $route.current.params.adminRpcode : ngmUser.get().adminRpcode;

                $scope.report.report_type_id = $route.current.params.report_type_id

                // var text = $route.current.params.report_type_id ? $route.current.params.report_type_id.replace(/\b\w/g, l => l.toUpperCase()) : '';
                var report_types = ngmCustomConfig.getReportTypesList($route.current.params.admin0pcode.toUpperCase())
                $scope.report.report_type_name = report_types.filter(x => $route.current.params.report_type_id === x.report_type_id)[0].report_type_name;
                
                var text = $route.current.params.report_type_id ? $scope.report.report_type_name.replace(/\b\w/g, l => l.toUpperCase()) : '';
                $scope.title = text === '' ? 'Project List' : text + ' Project List ';
                $scope.subtitle = text === '' ? 'Project List' : 'Project List for ' + text;

                $scope.report.download_config = ngmCustomConfig.getCustomConfigProjectDownload($route.current.params.report_type_id);
                // report dashboard model
                $scope.model = {
                    name: 'cluster_project_list',
                    header: {
                        div: {
                            'class': 'col s12 m12 l12 report-header',
                            style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
                        },
                        title: {
                            'class': 'col s12 m9 l9 report-title truncate',
                            style: 'color: ' + $scope.report.ngm.style.defaultPrimaryColor,
                            title: $scope.title
                        },
                        subtitle: {
                            'class': 'col s12 m12 l12 report-subtitle',
                            title: $scope.subtitle
                        },
                        download: {
                            'class': 'col s12 m3 l3 hide-on-small-only',
                            downloads: [{
                                type: 'csv',
                                color: 'blue lighten-2',
                                icon: 'assignment',
                                hover: 'Download All Project CSV',
                                // request: {
                                //     method: 'POST',
                                //     url: ngmAuth.LOCATION + '/api/custom/project/getProjects',
                                //     data: {
                                //         details: 'projects',
                                //         report: $scope.report.report_title + '_projects-extracted-' + moment().format('YYYY-MM-DDTHHmm'),
                                //         query: $scope.report.getQuery($scope.report.download_config),
                                //         csv: true
                                //     }
                                // },
                                request: $scope.report.getCsvRequest($scope.report.getQuery($scope.report.download_config)),
                                metrics: {
                                    method: 'POST',
                                    url: ngmAuth.LOCATION + '/api/metrics/set',
                                    data: {
                                        organization: $scope.report.user.organization,
                                        username: $scope.report.user.username,
                                        email: $scope.report.user.email,
                                        dashboard: 'projects list',
                                        theme: 'custom project list',
                                        format: 'csv',
                                        url: $location.$$path

                                    }
                                }
                            }]

                        }
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
                                    prevLink: '#/custom/custom-main/' + $route.current.params.adminRpcode + '/' + $route.current.params.admin0pcode + '/' + $route.current.params.organization_tag + '/' + $route.current.params.report_type_id,
                                    newProject: $scope.report.newProjectUrl,
                                    templateUrl: '/scripts/widgets/ngm-html/template/custom.project.btn.html'
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
                                    color: 'blue lighten-1',
                                    textColor: 'white-text',
                                    title: $route.current.params.admin0pcode === 'af' ? $filter('translate')('active_activty_plans') : $filter('translate')('active_projects'),
                                    icon: 'edit',
                                    templateUrl: '/scripts/widgets/ngm-list/template/custom_projects.html',
                                    request: $scope.report.getProjectRequest('active')
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
                                    titleIcon: 'done_all',
                                    // color: 'lime lighten-4',
                                    color: 'blue lighten-1',
                                    textColor: 'white-text',
                                    title: $route.current.params.admin0pcode === 'af' ? $filter('translate')('completed_activty_plans') : $filter('translate')('completed_projects'),
                                    icon: 'done',
                                    templateUrl: '/scripts/widgets/ngm-list/template/custom_projects.html',
                                    request: $scope.report.getProjectRequest('complete')
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
                setTimeout(() => {
                    $('.fixed-action-btn').floatingActionButton({ direction: 'left' });
                }, 0);
            }

        }
        // init
        $scope.report.init();

    }]);
