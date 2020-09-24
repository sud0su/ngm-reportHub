/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:CustomReportCtrl
 * @description
 * # CustomReportCtrl
 * Controller of the ngmReportHub
 */

angular.module('ngm.widget.custom.schedule', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('custom.schedule', {
                title: 'Custom Schedule Form',
                description: 'Custom Schedule Form',
                controller: 'CustomScheduleFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/schedule/form.html'
            });
    })
    .controller('CustomScheduleFormCtrl', [
        '$scope',
        '$window',
        '$location',
        '$timeout',
        '$filter',
        '$q',
        '$http',
        '$route',
        '$sce',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        'ngmCustomHelper',
        'ngmCustomLists',
        'ngmCustomConfig',
        'ngmCustomLocations',
        'ngmCustomBeneficiaries',
        'ngmCustomValidation',
        // 'NgTableParams',
        'config', '$translate', '$filter',

        function (
            $scope,
            $window,
            $location,
            $timeout,
            $filter,
            $q,
            $http,
            $route,
            $sce,
            ngmUser,
            ngmAuth,
            ngmData,
            ngmCustomHelper,
            ngmCustomLists,
            ngmCustomConfig,
            ngmCustomLocations,
            ngmCustomBeneficiaries,
            ngmCustomValidation,
            // NgTableParams,
            config, $translate, $filter) {


            /**** SERVICES ****/

            // these should be a directive - sorry Steve Jobs!
            $scope.scope = $scope;
            $scope.ngmCustomLists = ngmCustomLists;
            $scope.ngmCustomLocations = ngmCustomLocations;
            $scope.ngmCustomBeneficiaries = ngmCustomBeneficiaries;
            $scope.ngmCustomValidation = ngmCustomValidation;

            // project
            $scope.schedule = {

                /**** DEFAULTS ****/
                user: ngmUser.get(),
                style: config.style,
                list_schedules:[],

                /**** TEMPLATES ****/

                // init lists
                init: function () {

                    $scope.schedule.report_types =[{ indicator_id: 'beneficiaries', indicator_name: 'Beneficiaries', type: 'csv' }, { indicator_id: 'indicators_summary', indicator_name: 'Indicators Summary', type: 'excel' }]

                    $scope.detailSchedule = [];
                    $scope.detailSchedule = $scope.schedule.list_schedules.length ? new Array($scope.schedule.list_schedules.length).fill(false):new Array(0).fill(false);

                    
                },

                addSchedule: function () {

                    // inserted
                    $scope.inserted = {
                       indicator_id:'',
                        date: moment().format('YYYY-MM-DD')
                    };


                    // clone
                    var length = $scope.schedule.list_schedules.length;
                    if (length) {
                        var b = angular.copy($scope.schedule.list_schedules[length - 1]);
                        delete b.id
                        $scope.inserted = angular.merge(b, $scope.inserted);
                    }

                    // push
                    $scope.schedule.list_schedules.push($scope.inserted);
                    $scope.detailSchedule[$scope.schedule.list_schedules.length - 1] = true;
                },

                updateName: function (list, key, name, schedule){
                    var obj = {}
                    obj[key] = schedule[key];
                    var select = $filter('filter')(list, obj, true);

                    // set name
                    if (select.length) {
                        // name
                        // beneficiary[name] = select[0][name];
                        schedule = angular.merge({}, schedule, select[0])
                    }
                    // clear name
                    if (schedule[key] === null) {
                        schedule[name] = null;
                    }
                },
                validate: function(){
                    divs=[]
                    complete = true
                    angular.forEach($scope.schedule.list_schedules,function(s,i){
                        if (!s.indicator_id) {
                            id = "label[for='" + 'ngm-indicator_id-' + i + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;
                        }
                        if (!s.date) {
                            id = "label[for='" + 'ngm-date-' + i + "']";
                            $(id).addClass('error');
                            divs.push(id);
                            complete = false;

                        }
                    })
                    
                    if(!complete){
                        $(divs[0]).animatescroll();
                    }else{
                        $scope.schedule.save();
                    }
                    

                },

                // datepicker
                datepicker: {
                    maxDate: moment().format('YYYY-MM-DD'),
                    onClose: function ($schedule) {
                        // format date on selection
                        $schedule.date =
                            moment(new Date($schedule.date)).format('YYYY-MM-DD');
                    }
                },

                cancelEdit: function ($index) {
                    if (!$scope.schedule.list_schedules[$index].id) {
                        $scope.schedule.list_schedules.splice($index, 1);
                    }
                },

                removeSchedule: function ($index) {
                    
                    $scope.schedule.isSaving = true;
                    M.toast({ html: 'Removing...', displayLength: 3000, classes: 'note' });
                    $timeout(function () {
                        $scope.schedule.list_schedules.splice($index, 1);
                        M.toast({ html: 'Schedule Remove' + '!', displayLength: 3000, classes: 'success' });
                        $scope.schedule.isSaving = false;
                    }, 2000);
                    
                },

                openCloseDetailSchedule:function($index){
                    $scope.detailSchedule[$index] = !$scope.detailSchedule[$index];
                },

                save: function(){
                    $scope.schedule.isSaving = true;
                    M.toast({ html: 'Saving...', displayLength: 3000, classes: 'note' });
                    angular.forEach($scope.schedule.list_schedules,(x)=>{
                        x.id = Math.random(100000);
                    })

                    $timeout(function () {
                        M.toast({ html: 'Schedule Added' + '!', displayLength: 3000, classes: 'success' });
                        $scope.schedule.isSaving = false;
                    }, 2000);

                }


            }

            // init project
            $scope.schedule.init();


        }

    ]);
