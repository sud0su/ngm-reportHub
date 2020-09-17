/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomProjectFormDetailCtrl
 * @description
 * # CustomProjectFormDetailCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.custom.project.detail', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('custom.project.detail', {
                title: 'Custom Project Details  Form',
                description: 'Display Custom Project Details Form',
                controller: 'CustomProjectFormDetailCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/details/form.html'
            });
    })
    .controller('CustomProjectFormDetailCtrl', [
        '$scope',
        '$location',
        '$timeout',
        '$filter',
        '$route',
        'ngmUser',
        'ngmAuth',
        'ngmCustomHelper',
        'config',
        '$q',
        '$http',
        '$sce',
        'ngmData',
        'ngmCustomValidation',
        'ngmCustomLists',
        'ngmCustomConfig',
        '$translate',
        '$rootScope',

        function (
            $scope,
            $location,
            $timeout,
            $filter,
            $route,
            ngmUser,
            ngmAuth,
            ngmCustomHelper,
            config,
            $q,
            $http,
            $sce,
            ngmData,
            ngmCustomValidation,
            ngmCustomLists,
            ngmCustomConfig,
            $translate,
            $rootScope) {
            // set to $scope
            $scope.ngmCustomHelper = ngmCustomHelper;

            $scope.isLoading = false;

            // project
            $scope.project = {


                // defaults
                user: ngmUser.get(),
                style: config.style,
                submit: true,
                newProject: $route.current.params.project_id === 'new' ? true : false,
                definition: config.project,
                updatedAt: moment(config.project.updatedAt).format('DD MMMM, YYYY @ h:mm:ss a'),
                canEdit: ngmAuth.canDo('EDIT', { adminRpcode: config.project.adminRpcode, admin0pcode: config.project.admin0pcode, cluster_id: config.project.cluster_id, organization_tag: config.project.organization_tag }),

                lists: ngmCustomLists.setLists(config.project, config.project.project_start_date, config.project.project_end_date, 30),

                config_project: ngmCustomConfig.getCustomProjectConfig($route.current.params.report_type_id),

                // datepicker
                datepicker: {
                    onClose: function () {
                        // set new start / end date
                        $scope.project.definition.project_start_date =
                            moment(new Date($scope.project.definition.project_start_date)).format('YYYY-MM-DD');
                        $scope.project.definition.project_end_date =
                            moment(new Date($scope.project.definition.project_end_date)).format('YYYY-MM-DD');
                    }
                },


                /**** TEMPLATES ****/

                // url
                templatesUrl: '/scripts/modules/custom/views/forms/details/',
                settingUrl: 'detail.html',
                contactUrl: 'contact.html',
                period_types: [
                    // { reporting_period_type: 'week', reporting_period_name:'Week'},
                    // { reporting_period_type: '2week', reporting_period_name: 'Two Week' },
                    // { reporting_period_type: 'month', reporting_period_name: 'Month' },
                    // { reporting_period_type: 'semi_year', reporting_period_name: 'Semi Year' },
                    // { reporting_period_type: 'quarter', reporting_period_name: 'Quarter Year' },
                    // { reporting_period_type: 'Year', reporting_period_name: 'Year' }

                    { reporting_period_type: 'monthly', reporting_period_name: 'Monthly' },
                    { reporting_period_type: '2monthly', reporting_period_name: '2 Monthly' },
                    { reporting_period_type: 'weekly', reporting_period_name: 'Weekly' },
                    { reporting_period_type: '2weekly', reporting_period_name: '2 Weekly' },
                    { reporting_period_type: 'quarterly', reporting_period_name: 'Quarterly' },
                    { reporting_period_type: 'semiyearly', reporting_period_name: 'Semi-Yearly' },
                    { reporting_period_type: 'yearly', reporting_period_name: 'Yearly' }
                ],
                // init lists
                init: function () {

                    ngmCustomLists.setOrganizationUsersList($scope.project.lists, config.project);

                    if (!$scope.project.newProject && $scope.project.definition.version ){
                        $scope.project.config_project = ngmCustomConfig.getCustomProjectConfigWithVersion($route.current.params.report_type_id, $scope.project.definition.version);
                    }
                    // usd default currency

                },
                // cofirm exit if changes
                modalConfirm: function (modal) {
                    if (modal === 'summary-modal') {
                        // check for project changes
                    }
                    $scope.project.cancel();
                },

                // cancel and delete empty project
                cancel: function () {
                    // update
                    $timeout(function () {
                        // path / msg
                        var path = $scope.project.definition.project_status === 'new' ? '/custom/custom-project-lists/' + $scope.project.user.adminRpcode.toLowerCase() + '/' + $scope.project.user.admin0pcode.toLowerCase() + '/' + $scope.project.user.organization_tag.toLowerCase() + '/' + $route.current.params.report_type_id : '/custom/custom-projects-summary/' + $scope.project.definition.id;
                        var msg = $scope.project.definition.project_status === 'new' ? $filter('translate')('create_project_cancelled') : $filter('translate')('create_project_cancelled');
                        // redirect + msg
                        $location.path(path);
                        $timeout(function () {
                            // Materialize.toast( msg, 4000, 'note' );
                            M.toast({ html: msg, displayLength: 4000, classes: 'note' });
                        }, 400);
                    }, 400);
                },


                /**** FORM ( ngmCustomValidation.js ) ****/
                // validate form
                validate: function (display_modal) {
                    valid = true
                    divs = []
                    if ($scope.project.definition.project_title === '' || $scope.project.definition.project_title === undefined) {
                        id = "label[for='" + 'ngm-project-title' + "']";
                        divs.push(id)
                        valid = false;
                        $(id).addClass('error');
                        divs.push(id)
                    }

                    if (!$scope.project.definition.project_start_date || $scope.project.definition.project_start_date === 'Invalid date') {
                        id = "label[for='" + 'ngm-start-date' + "']";
                        valid = false;
                        $(id).addClass('error');
                        divs.push(id);
                    }
                    if (!$scope.project.definition.project_end_date || $scope.project.definition.project_end_date === 'Invalid date') {
                        id = "label[for='" + 'ngm-end-date' + "']";
                        valid = false;
                        $(id).addClass('error');
                        divs.push(id);
                    }


                    if ($scope.project.definition.project_title === '' || $scope.project.definition.project_title === undefined) {
                        id = "label[for='" + 'ngm-project_period' + "']";
                        valid = false;
                        $(id).addClass('error');
                        divs.push(id)
                    }

                    if (!valid) {
                        $(divs[0]).animatescroll();

                    } else {
                        if (display_modal) {
                            $('#save-modal').modal({ dismissible: false });
                            $('#save-modal').modal('open');
                        }
                    }
                },


                updateProjectDetails: function (id) {
                    var list_project = $scope.project.config_project.project_details;

                    if (!$scope.project.definition.project_details) {
                        $scope.project.definition.project_details = [];
                    }
                    if (document.getElementById(id).checked) {
                        selected = $filter('filter')(list_project, { project_detail_id: id }, true);
                        $scope.project.definition.project_details.push(selected[0]);

                    } else {
                        if ($scope.project.definition.project_details.length > 0) {
                            index = $scope.project.definition.project_details.findIndex(value => value.project_detail_id === id);
                            if (index > -1) {
                                $scope.project.definition.project_details.splice(index, 1);
                            }
                        } else {
                            $scope.project.definition.project_details = [];

                        }
                    }

                },
                checkProjectDetail: function (id) {
                    if (!$scope.project.definition.project_details) {
                        return false
                    } else {
                        // check if project_detail_id in details is exist on the list
                        if ($scope.project.definition.project_details.length) {
                            var temp_list = $scope.project.config_project.project_details;
                            var count_missing = 0;
                            angular.forEach($scope.project.definition.project_details, (e) => {
                                missing_index = temp_list.findIndex(value => value.project_detail_id === e.project_detail_id);
                                // if project_detail_id is not in the temp list then push missing project_detail_id to temp list
                                if (missing_index < 0) {
                                    temp_list.push(e);
                                    count_missing += 1;
                                }
                            });

                            if (count_missing > 0) {
                                // set project.config_project.project_details same as temp list if some of project_detail_id is missing
                                $scope.project.config_project.project_details = temp_list;
                            }
                        };

                        index = $scope.project.definition.project_details.findIndex(value => value.project_detail_id === id);
                        if (index > -1) {
                            return true
                        } else {
                            return false
                        }
                    }
                },
                updateMultiCluster: function (id) {
                    var list_project = $scope.project.lists.clusters;

                    if (!$scope.project.definition.cluster_ids) {
                        $scope.project.definition.cluster_ids = [];
                    }
                    if (document.getElementById(id).checked) {
                        selected = $filter('filter')(list_project, { cluster_id: id }, true);
                        // $scope.project.definition.cluster_ids.push(selected[0]);
                        $scope.project.definition.cluster_ids.push(selected[0].cluster_id);

                    } else {
                        if ($scope.project.definition.cluster_ids.length > 0) {
                            // index = $scope.project.definition.cluster_ids.findIndex(value => value.cluster_id === id);
                            index = $scope.project.definition.cluster_ids.indexOf(id);
                            if (index > -1) {
                                $scope.project.definition.cluster_ids.splice(index, 1);
                            }
                        } else {
                            $scope.project.definition.cluster_ids = [];

                        }
                    }
                },
                checkMultiCluster:function(id){
                    if (!$scope.project.definition.cluster_ids) {
                        return false
                    } else {
                        // check if project_detail_id in details is exist on the list
                        if ($scope.project.definition.cluster_ids.length) {
                            var temp_list = $scope.project.config_project.cluster_ids;
                            var count_missing = 0;
                            angular.forEach($scope.project.definition.cluster_ids, (e) => {
                                missing_index = temp_list.indexOf(e);
                                // if project_detail_id is not in the temp list then push missing project_detail_id to temp list
                                if (missing_index < 0) {
                                    temp_list.push(e);
                                    count_missing += 1;
                                }
                            });

                            if (count_missing > 0) {
                                // set project.config_project.cluster_ids same as temp list if some of project_detail_id is missing
                                $scope.project.config_project.cluster_ids = temp_list;
                            }
                        };
                        index = $scope.project.definition.cluster_ids.indexOf(id);
                        if (index > -1) {
                            return true
                        } else {
                            return false
                        }
                    }
                },

                // set new project user
                updateContactUser: function ($data) {
                    var user = $filter('filter')($scope.project.lists.users, { username: $data.username }, true)[0];
                    $scope.project.updateContact(user);
                },

                // update project user values
                updateContact: function (touser) {
                    if (touser) {
                        $scope.project.definition.username = touser.username;
                        $scope.project.definition.name = touser.name;
                        $scope.project.definition.email = touser.email;
                        $scope.project.definition.position = touser.position;
                        $scope.project.definition.phone = touser.phone;
                    }
                },


                /**** SAVE ****/

                // save project
                save: function (display_modal, save_msg) {



                    // disable btn
                    $scope.project.submit = false;

                    // project_status
                    if ($scope.project.definition.project_status === 'new') {
                        $scope.project.definition.project_status = 'active';
                    }

                    // inform
                    // Materialize.toast( $filter('translate')('processing'), 6000, 'note' );
                    M.toast({ html: $filter('translate')('processing'), displayLength: 6000, classes: 'note' });

                    // details update
                    // $http({
                    $http({
                        method: 'POST',
                        url: ngmAuth.LOCATION + '/api/custom/project/setProject',
                        data: { project: $scope.project.definition }
                    }).success(function (project) {

                        // enable
                        $scope.project.submit = true;

                        // error
                        if (project.err) {
                            // Materialize.toast( $filter('translate')('save_failed_the_project_contains_error')+'!', 4000, 'error' );
                            M.toast({ html: $filter('translate')('save_failed_the_project_contains_error') + '!', displayLength: 4000, classes: 'error' });
                        }

                        // if success
                        if (!project.err) {

                            // add id to client json
                            $scope.project.definition = angular.merge($scope.project.definition, project);

                            // save
                            if (save_msg) {
                                // Materialize.toast( save_msg , 4000, 'success' );
                                M.toast({ html: save_msg, displayLength: 4000, classes: 'success' });
                            }

                            // notification modal
                            if (display_modal) {

                                $('.modal-trigger').modal();

                                // save msg
                                var msg = $scope.project.newProject ? $filter('translate')('project_created') + '!' : $filter('translate')('project_updated');

                                // save, redirect + msg
                                $timeout(function () {
                                    $location.path('/custom/custom-projects-summary/' + $scope.project.definition.id);
                                    $timeout(function () {
                                        // Materialize.toast( msg, 4000, 'success' );
                                        M.toast({ html: msg, displayLength: 4000, classes: 'success' });
                                    }, 400);
                                }, 400);
                            }
                        }

                    }).error(function (err) {
                        // error
                        // Materialize.toast( 'Error!', 4000, 'error' );
                        M.toast({ html: 'Error', displayLength: 4000, classes: 'error' });
                        // unblock save button in case of any backend / no internet errors
                        $timeout(function () {
                            $scope.project.submit = true;
                        }, 4000);
                    });

                }

            }

            // init project
            $scope.project.init();
            // for loading mask
            $scope.loading = true;
            $scope.$on('$includeContentLoaded', function (eve, htmlpath) {
                // Emitted every time the ngInclude content is reloaded
                // use this '/scripts/modules/cluster/views/forms/details/project-upload.html' because the last loaded
                if ($scope.project.definition.project_status === 'new') {
                    $timeout(function () {
                        $scope.loading = false;
                    }, 1000);
                } else if (htmlpath === '/scripts/modules/custom/views/forms/details/detail.html') {
                    // setTimeout(() => {
                    $timeout(function () {
                        $scope.loading = false;
                    }, 100);
                }
            });
        }

    ]);
