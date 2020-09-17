angular.module('ngmReportHub')
    .factory('ngmCustomConfig',
        ['$location',
            '$q',
            '$http',
            '$filter',
            '$timeout',
            'ngmAuth', '$translate', '$filter',
            function ($location,
                $q,
                $http,
                $filter,
                $timeout,
                ngmAuth,$translate, $filter) {

                var ngmCustomConfig = {

                    listCustomConfig:function(){
                        var lists_config = [{
                            admin0pcode: "AF",
                            // cluster_id: "heatlh",
                            report_type_id: "winterization20",
                            report_type_name: "Winterization 2020",
                            version: 'v1',
                            status: 'active',
                            // status: 'completed',
                            // disabled: false,
                            description: 'Dolor', // optional
                            project: {
                                defaults: {
                                    cluster_id: "esnfi",
                                    cluster: "ESNFI",
                                    cluster_ids: ['esnfi'],
                                    select_clusters: true
                                },
                                v1: {
                                    description: 'Dolor v1', // optional

                                    set_reporting_period_start: '2020-09-01', // optional to restrict/set project start end dates
                                    set_reporting_period_end: '2021-03-01', // optional to restrict/set project start end dates
                                    min_reporting_period: '2020-10-01', // optional to restrict/set project start end dates
                                    max_reporting_period: '2021-03-01', // optional to restrict/set project start end dates

                                    reporting_period_types: [{ reporting_period_type: 'monthly', reporting_period_name: 'Monthly' },
                                                             { reporting_period_type: 'weekly', reporting_period_name: 'Weekly' },
                                                             { reporting_period_type: '2weekly', reporting_period_name: '2 Weekly'}
                                                            ],
                                    project_details: [{ project_detail_id: 'covid19', project_detail_name: 'Covid 19' }],
                                    project_defaults: {
                                        project_status: 'new',
                                        project_title: '',//'Enter New ' + user.organization + ' Project Title...',
                                        project_description: 'Please, add the project description...',
                                        project_details: [],
                                        project_start_date: moment.utc().startOf('M').format('YYYY-MM-DD'),
                                        project_end_date: moment.utc().add(8, 'M').endOf('M').format('YYYY-MM-DD'),
                                        reporting_period_type: 'monthly',
                                        notes: '',
                                        version:'',
                                        cluster_id: "esnfi",
                                        cluster: "ESNFI",
                                        cluster_ids: ['esnfi'],
                                        report_type_id: "winterization20",
                                        report_type_name: "Winterization 2020",
                                        version: 'v1',
                                    },
                                    project_download: {
                                        fields: ['planned_families'],
                                        fieldNames: false,
                                        overwriteFields: false
                                    },
                                    beneficiaries: {
                                        template: 'winterization.v1.beneficiaries.html',
                                        defaults: {
                                            planned_families: 0,
                                            assisted_returnee_families: 0,
                                            assisted_idp_families: 0,
                                            assisted_other_families: 0,
                                            total_assisted_families: 0,
                                            package_returnee_families: 0,
                                            package_idp_families: 0,
                                            package_other_families: 0,
                                            total_package_families: 0,
                                            cash: 0,
                                            blanket: 0,
                                            heating_material: 0,
                                            winter_clothes: 0,
                                            remarks: '',
                                            progress: 0,
                                            beneficiary_type_id: 'b1',
                                            beneficiary_type_name: 'B1',
                                            cluster_id: "esnfi", 
                                            cluster: "ESNFI"
                                        },
                                        validate: ['planned_families', 'beneficiary_type_id', 'assisted_returnee_families', 'assisted_idp_families'],
                                        // or
                                        // validate: {
                                        //     planned_families: true,
                                        //     assisted_returnee_families: { 'gte': 0, 'lte': 100 }
                                        // },
                                        // if custom activities
                                        // activities: [
                                        //     { 
                                        //         activity_type_id: 'test1',
                                        //         activity_type_name: 'Test 1',
                                        //         activity_description_id: 'subtest1',
                                        //         activity_description_name: 'Sub Test 1',
                                        //         defaults: {
                                        //             'families': 0
                                        //         },
                                        //         validate: {
                                        //                 families: { 'gte': 0, 'lte': 100 }
                                        //         },
                                        //         template: 'tes1.beneficiaries.html'
                                        //     }
                                        // ],
                                        lists: {
                                            // beneficiary_types: [
                                            //     {
                                            //         beneficiary_type_id: 'b1',
                                            //         beneficiary_type_name: 'B1'
                                            //     }
                                            // ],
                                            // to count atrribute that needed to coun 
                                            count: [
                                                {   total: 'total_assisted_families', 
                                                      property_count: ['assisted_returnee_families', 'assisted_idp_families', 'assisted_other_families']
                                                    },
                                                {
                                                    total: 'total_package_families',
                                                    property_count: ['package_returnee_families', 'package_idp_families', 'package_other_families']
                                                }
                                            ]
                                                
                                            
                                        },
                                        location:{
                                            total:'total_package_families'
                                        },
                                        download:{
                                            fields: ['planned_families'],
                                            fieldNames: false, 
                                            overwriteFields: false
                                        }
                                    },
                                    admin: { fields: ['planned_families'], fieldNames: false, overwriteFields: false, defaultPeriod: 'month' ,filter_clusters: ['esnfi']},
                                    dashboard: {
                                        min_date: '2020-09-01', indicator: [{ id: 'beneficiaries', name: 'Total Assisted Families', calculate_indicator: ["$total_assisted_families"] }], fields: ['planned_families'], fieldNames: false, overwriteFields: false, filter_clusters: ['esnfi']  }
                                }
                            }
                        }]
                        return lists_config
                    },


                    getCustomConfig: function (admin0pcode) {
                        return ngmCustomConfig.listCustomConfig().filter(x=>x.admin0pcode === admin0pcode);

                    },

                    getReportTypesList: function (admin0pcode){
                        var list = ngmCustomConfig.listCustomConfig()
                        if (admin0pcode){
                            list = list.filter(x => x.admin0pcode === admin0pcode).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } });
                        }
                        return list;
                    },
                    getCustomProjectConfig: function(report_type_id){
                        
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        var report_type =  ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } })[0];
                        var config_project_version = config_project[version];

                        config_project_version = angular.merge({}, config_project.defaults, config_project_version,report_type);

                        if (config_project_version && config_project_version.beneficiaries){
                            delete config_project_version.beneficiaries; 
                        }

                        return config_project_version ? config_project_version:{};

                    },
                    setNewProjectDefault: function (report_type_id){
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;

                        var default_project = angular.merge({}, config[0].project.defaults, config_project[version].project_defaults);

                        return default_project
                    
                    },
                    getCustomProjectConfigWithVersion: function (report_type_id,version) {
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var report_type = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id).map((x) => { return { report_type_id: x.report_type_id, report_type_name: x.report_type_name } })[0];
                        var config_project_version = config_project[version];

                        config_project_version = angular.merge({}, config_project.defaults, config_project_version, report_type);

                        if (config_project_version && config_project_version.beneficiaries) {
                            delete config_project_version.beneficiaries;
                        }

                        return config_project_version ? config_project_version : {};

                    },
                    getCustomConfigProjectDownload:function(report_type_id, version){
                        var download ={};
                        if(version){
                           download = ngmCustomConfig.getCustomProjectConfigWithVersion(report_type_id, version).project_download;
                        }else{
                            download = ngmCustomConfig.getCustomProjectConfig(report_type_id).project_download;
                        }
                        return download;

                    },
                    getCustomBeneficiariesConfig: function (report_type_id,version){
                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        // var version = config[0].version;
                        var config_beneficiaries_version = config_project[version].beneficiaries;

                        return config_beneficiaries_version

                    },
                    // get attribute for Beneficiaries
                    getCustomBeneficiariesConfigAttribute: function (report_type_id,version){

                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).defaults;

                    },
                    // get validate for Beneficiaries
                    getCustomBeneficiariesConfigValidate: function (report_type_id,version) {

                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).validate;

                    },
                    // get List for Beneficiaries 
                    getCustomBeneficiariesConfigLists: function (report_type_id,version) {
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).lists;

                    },
                    // get template for Beneficiaries
                    getCustomBeneficiariesConfigTemplate: function (report_type_id,version) {

                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id,version).template;

                    },

                    getCustomBeneficiariesConfigTotal: function (report_type_id, version){
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).location.total;
                    },

                    getCustomBeneficiariesConfigDownload: function (report_type_id, version){
                        return ngmCustomConfig.getCustomBeneficiariesConfig(report_type_id, version).download;
                    },

                    // get dashboard config
                    getCustomDashboardConfig:function(report_type_id){

                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        var config_dashboard_version = config_project[version].dashboard;

                        return config_dashboard_version

                    },

                    getCustomAdminDashboardConfig: function (report_type_id){

                        var config = ngmCustomConfig.listCustomConfig().filter(x => x.report_type_id === report_type_id);
                        var config_project = config[0].project;
                        var version = config[0].version;
                        var config_admin_version = config_project[version].admin;

                        return config_admin_version

                    }

                };

                return ngmCustomConfig;

            }]);
