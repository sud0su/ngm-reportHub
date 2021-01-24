/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CountryOrganizationListCtrl
 * @description
 * # CountryOrganizationListCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('CountryOrganizationListCtrl', ['$scope', 
    '$route', 
    '$location', 
    '$anchorScroll', 
    '$timeout', 
    'ngmAuth', 
    'ngmData', 
    'ngmUser', 
    '$translate', 
    '$filter', 
    'ngmClusterDownloads',
    'ngmClusterLists', function (
        $scope, 
        $route, 
        $location, 
        $anchorScroll, 
        $timeout, 
        ngmAuth, 
        ngmData, 
        ngmUser, 
        $translate, 
        $filter, 
        ngmClusterDownloads,
        ngmClusterLists
        ) {
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

            // current user
            user: ngmUser.get(),
            type_org : [
                { organization_type_id: 'all', organization_type: 'ALL' },
                { organization_type_id: 'government',organization_type: 'Government' },
                { organization_type_id: 'national_ngo',organization_type: 'National NGO' },
                { organization_type_id: 'united_nations',organization_type: 'United Nations' },
                { organization_type_id: 'international_ngo',organization_type: 'International NGO' }
            ],
            getPath: function (admin0pcode,cluster_id,type) {
                // go with URL
                var path = '/country-organization-list/' + admin0pcode +
                    '/' + cluster_id+
                    '/' + type;
                // return path
                return path;

            },

            // get organization
            setCountryMenu: function () {
                startYear = moment($scope.report.organization.createdAt).year();
                var yearRow = [];
                url = $route.current.params.organization_id ? '#/cluster/stocks/organization/' + $route.current.params.organization_id + '/' : '#/cluster/stocks/'
                for (eyear = startYear; eyear <= moment().year(); eyear++) {
                    year_obj = {
                        'title': eyear,
                        'param': 'year',
                        'active': eyear,
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': url + eyear
                    }
                    yearRow.push(year_obj)
                }
                $scope.model.menu.push({
                    'id': 'search-sector',
                    'icon': 'date_range',
                    'title': $filter('translate')('year'),
                    'class': 'teal lighten-1 white-text',
                    'rows': yearRow
                })
            },
            setClusterMenu: function () {
                clusterRows = []
                clusters = ngmClusterLists.getClusters($route.current.params.admin0pcode).filter(cluster => cluster.filter !== false)
                if (clusters[0].cluster_id !== 'all') {
                    clusters.unshift({
                        cluster_id: 'all',
                        cluster: 'ALL',
                    });
                }
                // add cluster
                angular.forEach(clusters, function (d, i) {

                    // admin URL
                    var path = $scope.report.getPath($scope.report.admin0pcode, d.cluster_id,$scope.report.type);

                    // menu rows
                    clusterRows.push({
                        'title': clusters[i].cluster,
                        'param': 'cluster_id',
                        'active': d.cluster_id,
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '/desk/#' + path
                    });

                });

                $scope.model.menu.push({
                    'search': false,
                    'id': 'search-cluster',
                    'icon': 'camera',
                    'title': $filter('translate')('sector_mayus'),
                    'class': 'teal lighten-1 white-text',
                    'rows': clusterRows
                });
            },
            setTypeMenu:function(){
                var typeRows=[]

                angular.forEach($scope.report.type_org,function(t,i){
                    // admin URL
                    var path = $scope.report.getPath($scope.report.admin0pcode, $scope.report.cluster_id, t.organization_type_id);

                    // menu rows
                    typeRows.push({
                        'title': $scope.report.type_org[i].organization_type,
                        'param': 'type',
                        'active': t.organization_type_id,
                        'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                        'href': '/desk/#' + path
                    });
                })

                $scope.model.menu.push({
                    'search': false,
                    'id': 'search-cluster',
                    'icon': 'camera',
                    'title': 'Organization Type',
                    'class': 'teal lighten-1 white-text',
                    'rows': typeRows
                });
            },
            // set project details
            init: function () {

                $scope.report.admin0pcode = $route.current.params.admin0pcode
                $scope.report.cluster_id =  $route.current.params.cluster_id
                $scope.report.type =  $route.current.params.type
                org_type = $filter('filter')($scope.report.type_org, { organization_type_id: $route.current.params.type })
                if(org_type.length){
                    $scope.report.organization_type = org_type[0].organization_type;
                }


                // title
                $scope.report.title = $route.current.params.admin0pcode.toUpperCase() + ' | Organizations';

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
                            'title': 'List Organization for ' + $route.current.params.admin0pcode.toUpperCase()
                        },
                        download: {
                            'class': 'col s12 m3 l3 hide-on-small-only',
                            downloads: [{
                                type: 'csv',
                                color: 'blue lighten-2',
                                icon: 'description',
                                hover: 'List Organization CSV',
                                request: {
                                    method: 'POST',
                                    url: ngmAuth.LOCATION + '/api/getOrganizationlastReport',
                                    data: {
                                            admin0pcode: $scope.report.admin0pcode.toUpperCase(),
                                            organization_type: $scope.report.organization_type,
                                            cluster_id: $scope.report.cluster_id,
                                            report: 'list_organization' + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'), 
                                            csv: true
                                        } 
                                },
                                metrics: {
                                    method: 'POST',
                                    url: ngmAuth.LOCATION + '/api/metrics/set',
                                    data: {
                                        organization: $scope.report.user.organization,
                                        username: $scope.report.user.username,
                                        email: $scope.report.user.email,
                                        dashboard: 'organization',
                                        theme: 'organization_lists',
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
                            styleClass: 's12 m12 l12 remove',
                            widgets: [{
                                type: 'table',
                                card: 'panel',
                                style: 'padding:0px; height: ' + $scope.report.ngm.style.height + 'px;',
                                config: {
                                    style: $scope.report.ngm.style,
                                    headerClass: 'collection-header teal lighten-2',
                                    headerText: 'white-text',
                                    headerIcon: 'perm_contact_calendar',
                                    headerTitle: 'Organizations List',
                                    templateUrl: '/scripts/widgets/ngm-table/templates/cluster/country.org.list.html',
                                    search_tool:true,
                                    tableOptions: {
                                        count: 20
                                    },
                                    request: {
                                        method: 'POST',
                                        url: ngmAuth.LOCATION + '/api/getOrganizationlastReport',
                                        data: {
                                            admin0pcode: $scope.report.admin0pcode.toUpperCase(),
                                            organization_type: $scope.report.organization_type,
                                            cluster_id: $scope.report.cluster_id
                                        }
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
        $scope.report.init();
        $scope.report.setClusterMenu()
        $scope.report.setTypeMenu()

    }]);
