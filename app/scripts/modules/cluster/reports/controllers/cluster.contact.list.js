/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterContactListCtrl
 * @description
 * # ClusterContactListCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
    .controller('ClusterContactListCtrl', ['$scope',
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
                getPath: function (admin0pcode, cluster_id) {
                    // go with URL
                    var path = '/cluster/wg/sector-contacts/' + admin0pcode+'/'+ cluster_id;
                    // return path
                    return path;

                },
                clusters: ngmClusterLists.getClusters('all').filter(cluster => cluster.filter !== false),

                // get organization
                setCountryMenu: function () {
                    var url = '/desk/#/cluster/wg/sector-contacts';
                    var country = {
                        'all': {
                            'search': true,
                            'id': 'search-all',
                            'icon': 'location_on',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'ALL',
                                'param': 'admin0pcode',
                                'active': 'all',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/all/' + $scope.report.cluster_id,
                            },{
                                'title': 'Afghanistan',
                                'param': 'admin0pcode',
                                'active': 'af',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/af/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Bangladesh',
                                'param': 'admin0pcode',
                                'active': 'bd',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/bd/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Cox Bazar',
                                'param': 'admin0pcode',
                                'active': 'cb',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/cb/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Democratic Republic of Congo',
                                'param': 'admin0pcode',
                                'active': 'cd',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/cd/'
                            }, {
                                'title': 'Ethiopia',
                                'param': 'admin0pcode',
                                'active': 'et',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/et/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Iraq',
                                'param': 'admin0pcode',
                                'active': 'iq',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/iq/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Somalia',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/so/'+$scope.report.cluster_id,
                            }, {
                                'title': 'South Sudan',
                                'param': 'admin0pcode',
                                'active': 'ss',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ss/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Syria',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/sy/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Ukraine',
                                'param': 'admin0pcode',
                                'active': 'ua',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ua/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Yemen',
                                'param': 'admin0pcode',
                                'active': 'ye',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ye/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Nigeria',
                                'param': 'admin0pcode',
                                'active': 'ng',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ng/'+$scope.report.cluster_id,
                            },
                            {
                                'title': 'Colombia',
                                'param': 'admin0pcode',
                                'active': 'col',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/col/'+$scope.report.cluster_id,
                            }]
                        },
                        'afro': {
                            'search': true,
                            'id': 'search-afro',
                            'icon': 'person_pin',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Democratic Republic of Congo',
                                'param': 'admin0pcode',
                                'active': 'cd',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/cd/'
                            }, {
                                'title': 'Ethiopia',
                                'param': 'admin0pcode',
                                'active': 'et',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/et/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Nigeria',
                                'param': 'admin0pcode',
                                'active': 'ng',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ng/'+$scope.report.cluster_id,
                            }, {
                                'title': 'South Sudan',
                                'param': 'admin0pcode',
                                'active': 'ss',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ss/'+$scope.report.cluster_id,
                            }]
                        },
                        'emro': {
                            'search': true,
                            'id': 'search-emro',
                            'icon': 'person_pin',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Afghanistan',
                                'param': 'admin0pcode',
                                'active': 'af',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/af/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Iraq',
                                'param': 'admin0pcode',
                                'active': 'iq',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/iq/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Somalia',
                                'param': 'admin0pcode',
                                'active': 'so',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/so/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Syria',
                                'param': 'admin0pcode',
                                'active': 'sy',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/sy/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Yemen',
                                'param': 'admin0pcode',
                                'active': 'ye',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ye/'+$scope.report.cluster_id,
                            }]
                        },
                        'searo': {
                            'search': true,
                            'id': 'search-searo',
                            'icon': 'person_pin',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Bangladesh',
                                'param': 'admin0pcode',
                                'active': 'bd',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/bd/'+$scope.report.cluster_id,
                            }, {
                                'title': 'Cox Bazar',
                                'param': 'admin0pcode',
                                'active': 'cb',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/cb/'+$scope.report.cluster_id,
                            }]
                        },
                        'euro': {
                            'search': true,
                            'id': 'search-euro',
                            'icon': 'person_pin',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Ukraine',
                                'param': 'admin0pcode',
                                'active': 'ua',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/ua/'+$scope.report.cluster_id,
                            },]
                        },
                        'amer': {
                            'search': true,
                            'id': 'search-amer',
                            'icon': 'person_pin',
                            'title': $filter('translate')('country_mayus'),
                            'class': 'teal lighten-1 white-text',
                            'rows': [{
                                'title': 'Colombia',
                                'param': 'admin0pcode',
                                'active': 'col',
                                'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
                                'href': url + '/col/' + $scope.report.cluster_id,
                            },]
                        }
                    }
                    country['all'];
                    $scope.model.menu.push(country['all']);
                },
                setClusterMenu: function () {
                    clusterRows = []
                    clusters = ngmClusterLists.getClusters('all').filter(cluster => cluster.filter !== false)
                    if (clusters[0].cluster_id !== 'all') {
                        clusters.unshift({
                            cluster_id: 'all',
                            cluster: 'ALL',
                        });
                    }
                    // add cluster
                    angular.forEach(clusters, function (d, i) {

                        // admin URL
                        var path = $scope.report.getPath($scope.report.admin0pcode, d.cluster_id);

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
                setTypeMenu: function () {
                    var typeRows = []

                    angular.forEach($scope.report.type_org, function (t, i) {
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

                    $scope.report.cluster_id = $route.current.params.cluster_id;
                    $scope.report.admin0pcode = $route.current.params.admin0pcode;


                    // title
                    $scope.report.title = 'Cluster Contact List ';
                    $scope.report.subtitle = 'Cluster Contact List for ';
                    $scope.report.title += ($scope.report.admin0pcode === 'all' ? '' : ' | '+$scope.report.admin0pcode.toUpperCase())
                    $scope.report.subtitle += ($scope.report.admin0pcode === 'all' ? 'All Country, ' : $scope.report.admin0pcode.toUpperCase()+' Country, ')
                    console.log($scope.report.subtitle)
                    if ($scope.report.cluster_id !== 'all'){
                        var cluster = $filter('filter')($scope.report.clusters, { cluster_id: $scope.report.cluster_id })
                        $scope.report.cluster = cluster[0].cluster;
                        $scope.report.title += ' | ' + $scope.report.cluster;
                        $scope.report.subtitle +=  $scope.report.cluster+' Cluster';
                    }else{
                        $scope.report.subtitle += 'All Cluster'
                    }
                    

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
                                'title': $scope.report.subtitle 
                            },
                            download: {
                                'class': 'col s12 m3 l3 hide-on-small-only',
                                downloads: [{
                                    type: 'csv',
                                    color: 'blue lighten-2',
                                    icon: 'description',
                                    hover: 'Cluster Contact List CSV',
                                    request: {
                                        method: 'POST',
                                        url: ngmAuth.LOCATION + '/api/getUserByCluster',
                                        data: {
                                            cluster_id: $scope.report.cluster_id,
                                            admin0pcode: $scope.report.admin0pcode,
                                            report: 'cluster_contact_lists' + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'), 
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
                                            dashboard: 'cluster contact',
                                            theme: 'cluster_contact_lists',
                                            format: 'csv',
                                            url: $location.$$path
                                        }
                                    }
                                }]
                            }
                        },
                        menu: [],
                        rows: [
                            {
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
                                        headerTitle: 'Contact List',
                                        templateUrl: '/scripts/widgets/ngm-table/templates/cluster/cluster.contact-list.html',
                                        tableOptions: {
                                            count: 20
                                        },
                                        request: {
                                            method: 'POST',
                                            url: ngmAuth.LOCATION + '/api/getUserByCluster',
                                            data: {
                                                admin0pcode: $scope.report.admin0pcode,
                                                cluster_id: $scope.report.cluster_id
                                            }
                                        }
                                    }
                                }]
                            }]
                        }
                        , 
                        {
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
            $scope.report.setCountryMenu();
            $scope.report.setClusterMenu();

        }]);
