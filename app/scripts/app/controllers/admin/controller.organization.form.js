
angular.module('ngm.widget.org.profile', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('org.profile', {
                title: 'HTML Panel',
                description: 'Display HTML template',
                templateUrl: '/scripts/widgets/ngm-html/template/organization-contact.html',
                controller: 'OrgPageCtrl',
                resolve: {
                    data: ['ngmData', 'config', function (ngmData, config) {
                        if (config.request) {
                            return ngmData.get(config.request);
                        }
                    }]
                }
            });
    }).controller('OrgPageCtrl', [
        '$scope',
        '$sce',
        '$http',
        '$element',
        '$location',
        '$timeout',
        'ngmAuth',
        'ngmUser',
        'data',
        'config',
        '$filter',
        function ($scope, $sce, $http,$element, $location, $timeout, ngmAuth, ngmUser, data, config, $filter) {

            // statistics widget default config
            $scope.btn = {
                decription:false,
                contact:false
            }
            $scope.panel = {
                // defaults
                user: ngmUser.get(),
                style: config.style,
                organization: config.organization ? config.organization : {},
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
                canEdit:function(){

                    // index = ngmUser.get().roles.indexOf('ORG')
                    // org = ngmUser.get().organization
                    if ((ngmUser.get().roles.indexOf('ORG') > -1) || 
                        (ngmUser.get().roles.indexOf('SUPERADMIN') > -1) || 
                        (ngmUser.get().roles.indexOf('CLUSTER')>-1) || 
                        (ngmUser.get().roles.indexOf('COUNTRY_ADMIN')>-1)
                    )
                    {
                        return true
                    }
                    return false
                },
                selectMainContact:function(){
                    $scope.panel.organization.contact=$filter('filter')($scope.panel.organization_users.users,{id:$scope.panel.organization.contact_id},true)
                },
                checkCLuster:function(id){
                    $scope.panel.organization.clusters = $scope.panel.organization.clusters ? $scope.panel.organization.clusters : [];
                    if($scope.panel.organization.clusters.findIndex(x=>x.cluster_id===id)>-1){
                        return true
                    }else{
                        return false
                    }
                },
                manageCluster:function(cluster_id){
                    if (document.getElementById(cluster_id).checked) {
                        $scope.panel.organization.clusters = $scope.panel.organization.clusters ? $scope.panel.organization.clusters : [];
                        var selected = $filter('filter')($scope.panel.cluster, { cluster_id: cluster_id }, true)
                        if(selected){
                            $scope.panel.organization.clusters.push(selected[0])
                        }
                    } else {
                        index = $scope.panel.organization.clusters.findIndex(x => x.cluster_id===cluster_id)
                        $scope.panel.organization.clusters.splice(index,1)
                    }
                    
                },
                switch:function(attr){
                    if ($scope.btn[attr]){
                        M.toast({ html: 'Please, Click Update to save all change...', displayLength: 6000, classes: 'note' });
                    }
                    $scope.btn[attr] = !$scope.btn[attr];
                },
                save: function(){
                    M.toast({ html: 'Saving', displayLength: 6000, classes: 'note' });

                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/setOrganizationAttributes',
                        data: {
                            organization: $scope.panel.organization
                        }
                    }).then(function (result) {
                        M.toast({ html: 'Succeessfully updated... !', displayLength: 4000, classes: 'success' });
                        $scope.panel.organization = result.data[0];
                        // success!
                    }).catch(function (err) {
                        // Materialize.toast( 'ACBAR Partner Organization Error!', 6000, 'error' );
                        M.toast({ html: 'Error !', displayLength: 6000, classes: 'error' });
                    });
                }
            };

            // assign data
            $scope.panel.organization_users = data ? data : false;
            
            // Merge defaults with config
            $scope.panel = angular.merge({}, $scope.panel, config);
            $scope.panel.url5W = '#/cluster/5w/' + $scope.panel.organization.adminRpcode.toLowerCase() + '/' + $scope.panel.organization.admin0pcode.toLowerCase() + '/all/all/all/all/all/' + $scope.panel.organization.organization_tag + '/all/2020-01-01/' + moment().format('YYYY-MM-DD');
            $scope.panel.urlTeam = '#/team/' + $scope.panel.organization.admin0pcode.toLowerCase() + '/' + $scope.panel.organization.organization_tag + '/all/all';
            $scope.panel.adminURL = '#/cluster/admin/' + $scope.panel.organization.adminRpcode.toLowerCase() + '/' + $scope.panel.organization.admin0pcode.toLowerCase() + '/all/all/' + $scope.panel.organization.organization_tag + '/activity/' + $scope.panel.start_date() + '/' + $scope.panel.end_date();
        }
    ]);


