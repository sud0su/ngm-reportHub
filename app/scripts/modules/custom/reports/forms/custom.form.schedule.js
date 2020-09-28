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

                    $scope.schedule.report_types =[{ scheduled_report_type: 'beneficiaries', scheduled_report_name: 'Beneficiaries', type: 'csv' }, { scheduled_report_type: 'indicators_summary', scheduled_report_name: 'Indicators Summary', type: 'excel' }]
                    $scope.schedule.types = [{ type_id: 'every', type_name: 'Every' },
                                             { type_id: 'once', type_name: 'Once' }];
                    $scope.schedule.types = ['every','once']
                    $scope.schedule.periodes = [{ period_id: 'year', period_name: 'Year' },
                                                { period_id: 'quarter', period_name: 'Quarter' },
                                                { period_id: 'month', period_name: 'Month' },
                                                { period_id: 'week', period_name: 'Week' },
                                                { period_id: 'day', period_name: 'Day' },
                                                { period_id: 'custom', period_name: 'Custom' }]
                    $scope.schedule.schedule_periodes= ['year',
                        'quarter',
                        'month',
                        'week',
                        'day',
                        'custom'];

                    $scope.detailSchedule = [];
                    $scope.detailSchedule = $scope.schedule.list_schedules.length ? new Array($scope.schedule.list_schedules.length).fill(false):new Array(0).fill(false);
                    $scope.schedule.lists = ngmCustomConfig.getCustomScheduleConfigLists($route.current.params.report_type_id)

                    
                },

                addSchedule: function () {

                    // inserted
                    // $scope.inserted = {
                    //    indicator_id:'',
                    //    type_id:'',
                    //    step:0,
                    //    shift:0,
                    //    time:'',
                    //    date: moment().format('YYYY-MM-DD')
                    // };

                    $scope.inserted = ngmCustomConfig.getCustomScheduleConfigAttribute($route.current.params.report_type_id)


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
                    $scope.schedule.initTimePicker()
                   
                },

                initTimePicker:function(){
                    $timeout(function(){
                        const myInput = document.getElementById('timepicker');
                        const timeInstance = M.Timepicker.init(myInput);
                    },100)
                   

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
                        // if (!s.indicator_id) {
                        //     id = "label[for='" + 'ngm-indicator_id-' + i + "']";
                        //     $(id).addClass('error');
                        //     divs.push(id);
                        //     complete = false;
                        // }
                        // if (!s.date) {
                        //     id = "label[for='" + 'ngm-date-' + i + "']";
                        //     $(id).addClass('error');
                        //     divs.push(id);
                        //     complete = false;

                        // }
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
                    onClose: function ($schedule,prop) {
                        // format date on selection
                        $schedule[prop] =
                            moment(new Date($schedule[prop])).format('YYYY-MM-DD');
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
                    $scope.schedules.initTimePicker()
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
