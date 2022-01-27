/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectFormReportCtrl
 * @description
 * # ClusterProjectFormReportCtrl
 * Controller of the ngmReportHub
 */

angular.module( 'ngm.widget.project.report', [ 'ngm.provider' ])
	.config( function( dashboardProvider ){
		dashboardProvider
			.widget('project.report', {
				title: 'Cluster Reports Form',
				description: 'Cluster Reports Form',
				controller: 'ClusterProjectFormReportCtrl',
				templateUrl: '/scripts/modules/cluster/views/forms/report/form.html'
			});
	})
	.controller( 'ClusterProjectFormReportCtrl', [
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
		'ngmClusterHelper',
		'ngmClusterLists',
		'ngmClusterLocations',
		'ngmClusterBeneficiaries',
		'ngmClusterValidation',
		'ngmClusterDetails',
		'ngmClusterVulnerablePopulations',
		'ngmClusterHelperAf',
		'ngmClusterHelperNgWash',
		'ngmClusterHelperNgWashLists',
		'ngmClusterHelperNgWashValidation',
		'ngmClusterHelperCol',
		'ngmCbBeneficiaries',
		'ngmClusterDocument',
		'ngmClusterImportFile',
		// 'NgTableParams',
		'config','$translate',

		function(
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
			ngmClusterHelper,
			ngmClusterLists,
			ngmClusterLocations,
			ngmClusterBeneficiaries,
			ngmClusterValidation,
			ngmClusterDetails,
			ngmClusterVulnerablePopulations,
			ngmClusterHelperAf,
			ngmClusterHelperNgWash,
			ngmClusterHelperNgWashLists,
			ngmClusterHelperNgWashValidation,
			ngmClusterHelperCol,
			ngmCbBeneficiaries,
			ngmClusterDocument,
			ngmClusterImportFile,
			// NgTableParams,
			config,$translate ){


			/**** SERVICES ****/

			// these should be a directive - sorry Steve Jobs!
			$scope.scope = $scope;
			$scope.ngmClusterLists = ngmClusterLists;
			$scope.ngmClusterLocations = ngmClusterLocations;
			$scope.ngmClusterBeneficiaries = ngmClusterBeneficiaries;
			$scope.ngmClusterValidation = ngmClusterValidation;
			$scope.ngmClusterVulnerablePopulations = ngmClusterVulnerablePopulations;
			$scope.ngmClusterDetails = ngmClusterDetails;
			$scope.ngmClusterHelperNgWash = ngmClusterHelperNgWash;
			$scope.ngmClusterHelperNgWashLists = ngmClusterHelperNgWashLists;
			$scope.ngmClusterHelperNgWashValidation = ngmClusterHelperNgWashValidation;
			$scope.ngmClusterHelperCol = ngmClusterHelperCol;
			$scope.ngmCbBeneficiaries = ngmCbBeneficiaries;
			$scope.ngmClusterDocument = ngmClusterDocument;
			$scope.ngmClusterImportFile = ngmClusterImportFile;
			$scope.deactivedCopybutton = false;
			$scope.messageFromfile = [];
			$scope.inputString = false;

			// page scrolled
			$scope._top_scrolled = 0
			// Infinity Scroll
			//Infinite scroll implementation for monthlylocations
			const MONTHLY_LOCATION_COUNT = 3;
			$scope.countMonthlyLocation = MONTHLY_LOCATION_COUNT;
			$scope.startMonthlyLocation= 0;
			$scope.endMonthlyLocation = MONTHLY_LOCATION_COUNT;
			$scope.paginated_monthly_locations = [],
			$scope.isLoadingMonthlyLocation = false; 
			// project
			$scope.project = {

				/**** DEFAULTS ****/
				user: ngmUser.get(),
				style: config.style,
				definition: config.project,
				report: config.report,
				location_group: config.location_group,
				location_limit: config.report.locations.length,
				canEdit: ngmAuth.canDo( 'EDIT', { adminRpcode: config.project.adminRpcode, admin0pcode:config.project.admin0pcode, cluster_id: config.project.cluster_id, organization_tag:config.project.organization_tag } ),
				updatedAt: moment( config.report.updatedAt ).format( 'DD MMMM, YYYY @ h:mm:ss a' ),
				monthlyTitleFormat: moment.utc( [ config.report.report_year, config.report.report_month, 1 ] ).format('MMMM, YYYY'),
				monthNameFormat: moment.utc( [ config.report.report_year, config.report.report_month, 1 ] ).format('MMM'),
				previousMonth: moment.utc([config.report.report_year, config.report.report_month, 1]).subtract(1,'month').format("MMMM, YYYY"),
				nonProjectDates: moment.utc(config.project.project_start_date).startOf('month') > moment.utc(config.report.reporting_period).startOf('month')
													|| moment.utc(config.project.project_end_date).endOf('month') < moment.utc(config.report.reporting_period).startOf('month'),

				// lists ( project, mpc transfers )
				lists: ngmClusterLists.setLists( config.project, moment(config.report.reporting_period).startOf('month'), moment(config.report.reporting_period).endOf('month'), 10 ),


				/**** TEMPLATES ****/

				// url
				templatesUrl: '/scripts/modules/cluster/views/forms/report/',
				// templates
				locationsUrl: 'location/locations.html',
				addLocationUrl: 'location/add.location-reform.html',//'location/add.location.html',
				beneficiariesDefaultUrl: 'beneficiaries/2016/beneficiaries-health-2016.html',
				template_activity_date: 'beneficiaries/activity-details/activity-date.html',
				template_vulnerable_populations: 'beneficiaries/vulnerable-populations/vulnerable-populations.html',
				template_activity_details: 'beneficiaries/activity-details/activity-details.html',
				notesUrl: 'notes.html',
				uploadUrl: 'report-upload.html',
				text_input:'',
				messageWarning:'',

				// ######### FOR-TRAINING TEST
				// fsac_assessment: 'beneficiaries/AF/assessment_fsac_absnumber_v2.html',
				//percentage
				fsac_assessment: 'beneficiaries/AF/fsac_percentage.html',

				// init lists
				init: function() {
					// usd default currency
					if( !$scope.project.definition.project_budget_currency ){
						$scope.project.definition.project_budget_currency = 'usd';
					}

					// sort locations
					$scope.project.report.locations = $filter('orderBy')( $scope.project.report.locations, [ 'site_type_name','admin1name','admin2name','admin3name','admin4name','admin5name','site_name' ]);

					// reset form array on setup
					ngmClusterBeneficiaries.resetForm();

					// set location / beneficiaries limits
					// $scope.project.setLocationsLimit( $scope.project.lists, $scope.project.report.locations );
					// set beneficiaries form
					ngmClusterBeneficiaries.setLocationsForm( $scope.project.lists, $scope.project.report.locations );

					// set list users
					ngmClusterLists.setOrganizationUsersList($scope.project.lists, config.project);
					// documents upload
					$scope.project.setTokenUpload();
					// for minimize-maximize beneficiary form

					$scope.detailBeneficiaries = {};
					// to store activity beneficairy not correct
					$scope.beneficiaryIncorrectActivityChecking=[]
					$scope.project.beneficiary_search;
					$scope.beneficiary_search_input = false;

					// init search
					$scope.searchToogle = function () {
						$('#search_').focus();
						$scope.beneficiary_search_input = $scope.beneficiary_search_input ? false : true;;
					}

					// page limits
					angular.forEach($scope.project.report.locations,function(e,i){
						$scope.detailBeneficiaries[i] = $scope.project.report.locations[i].beneficiaries.length ?
																						new Array($scope.project.report.locations[i].beneficiaries.length).fill(false) : new Array(0).fill(false);
						if ($scope.project.report.locations[i].beneficiaries.length){
							$scope.detailBeneficiaries[i][0] = true;
						}
						// AF set disabled to general for beneficiary category id
						// if ($scope.project.report.locations[i].beneficiaries.length > 0 && $scope.project.definition.admin0pcode === 'AF') {
						// 	angular.forEach($scope.project.report.locations[i].beneficiaries, function (e, j) {
						// 		if (!ngmClusterBeneficiaries.form[i][j]['beneficiary_category_type_id'] && !e.beneficiary_category_id) {
						// 			e.beneficiary_category_id = $scope.project.lists.beneficiary_categories[0].beneficiary_category_id;
						// 			e.beneficiary_category_name = $scope.project.lists.beneficiary_categories[0].beneficiary_category_name;
						// 		}
						// 	})
						// }
					})

					// Set limited amount of locations
					$scope.paginated_monthly_locations = $scope.project.report.locations.slice($scope.startMonthlyLocation, $scope.endMonthlyLocation);

					if ($scope.project.report.report_type_id === 'bi-weekly'){
						var period_biweekly = (moment.utc($scope.project.report.reporting_period).format('D') <= 14) ? 'Biweekly Period 1' :'Biweekly Period 2';
						$scope.project.monthlyTitleFormat += " "+ period_biweekly;
					}
					
					
					// for assessed_households field to activate
					
					if ($scope.project.definition.project_details && $scope.project.definition.project_details.length && $scope.project.definition.admin0pcode === 'AF'){
						var winter_index = $scope.project.definition.project_details.findIndex(x => x.project_detail_id === "winterization");
						$scope.project.isNeedAssessedHouseholds = winter_index > -1 && $scope.project.definition.cluster_id === 'esnfi'? true:false;

						if ($scope.project.isNeedAssessedHouseholds) {
							var params = {
								project_id: $route.current.params.project,
								reporting_period: $scope.project.report.reporting_period
							}
							if ($scope.project.report.report_type_id && $scope.project.report.report_type_id === 'bi-weekly') {
								params.report_type_id = $scope.project.report.report_type_id
							}

							var reqAssessedHouseholds = {
								method: 'POST',
								url: ngmAuth.LOCATION + '/api/cluster/report/getAssessedHouseholds',
								data: params
							}
							ngmData.get(reqAssessedHouseholds).then(function (assessed) {
								ngmClusterValidation.beneficiariesPreviouseReport = assessed;
							}).catch(function (err) {
								
							})
						}
					}else{
						$scope.project.isNeedAssessedHouseholds = false;
					}
				},

				// sets title for each location / activity
				getBeneficiaryTitle: function( $locationIndex, $beneficiaryIndex ){
					// beneficiary
					var beneficiary = $scope.project.report.locations[ $locationIndex ].beneficiaries[ $beneficiaryIndex ];
					// title
					var title = beneficiary.activity_type_name;
					// activity_description_id
					if ( beneficiary.activity_description_id ) {
						title += ', ' + beneficiary.activity_description_name;
					}
					// activity_detail_id
					if ( beneficiary.activity_detail_id ) {
						title += ', ' + beneficiary.activity_detail_name;
					}
					return title;
				},

				// set location / beneficiaries limits
				setLocationsLimit: function(){

					// if beneficiaries, set init load limit to help rendering of elements on big forms
					var set_limit = true;
					$scope.project.limitToShowSearch=0
					angular.forEach( $scope.project.report.locations, function( l, i ){
						if( set_limit && l.beneficiaries.length ){
							set_limit = false;
							$scope.project.location_limit = i+1;
							$scope.project.limitToShowSearch = l.beneficiaries.length;
						}
					});

					// if rendered all locations
					if ($scope.project.report.locations.length === $scope.project.location_limit) {
            $scope.project.allRendered = true;
					}

					// onscroll, update incrementLocationLimit
					$window.onscroll = function() {

						// if form is not fully rendered
						if (!$scope.project.allRendered){

							// height, position
							var top = $(window).scrollTop();

							if (top > $scope._top_scrolled) {
								// scroll down
								// save total traversed from top
								$scope._top_scrolled = top;
								var scrollHeight = $(document).height();
								var scrollPosition = $(window).height() + top;

								// 0.50 of scrolling height, add location_limit
								if ( ( scrollHeight - scrollPosition ) / scrollHeight < 0.50 ) {
									// when scroll to bottom of the page
									$scope.project.incrementLocationLimitByOneAutoSelect();
								}
							}
						}

					}
				},

				// incrementLocationLimit by one location if using materializeSelect directive
				incrementLocationLimitByOneAutoSelect: function() {

					// increment
					if ( $scope.project.report.locations.length > $scope.project.location_limit ) {
						$scope.project.location_limit += 1;
						// timeout
						$timeout( function(){
							$scope.$apply();
							// expand beneficiaries form
							$scope.detailBeneficiaries[ $scope.project.report.locations.length-1 ] = [];
							$scope.detailBeneficiaries[ $scope.project.report.locations.length-1 ][ 0 ] = true;
						}, 0 );
					}

					// if all rendered
					if ($scope.project.report.locations.length === $scope.project.location_limit) {
						// and all last location beneficiaries rendered
						$scope.project.allRendered = true;
					}

				},

				// beneficairies template
				beneficiariesUrl: function() {
					var template;
					if ( $scope.project.report.report_year === 2016 ) {
						template = 'beneficiaries/2016/beneficiaries.html';
					// } else if ( $scope.project.report.admin0pcode === 'NG' ) {
					// 	template ='beneficiaries/NG/beneficiaries.html';
					} else {
						template ='beneficiaries/beneficiaries.html';
					}
					return template;
				},

				// cancel monthly report
				cancel: function() {
					$timeout(function() {
						if ( $scope.project.location_group ) {
							$location.path( '/cluster/projects/group/' + $scope.project.definition.id + '/' + $scope.project.report.id );
						} else {
							$location.path( '/cluster/projects/report/' + $scope.project.definition.id );
						}
					}, 400);
				},

				// save form on enter
				keydownSaveForm: function(){
					$timeout(function(){
						$('.editable-input').keydown(function (e) {
							var keypressed = e.keyCode || e.which;
							if (keypressed == 13) {
								$('.save').trigger('click');
							}
						});
					}, 0 );
				},

				// update inidcators ( place into array on update )
				updateInput: function( $parent, $index, indicator, $data ){
					$scope.project.report.locations[ $parent ].beneficiaries[ $index ][ indicator ] = $data;
				},

				/**** Afghanistan ****/

				reportingYear: function(){
					return moment().subtract(1,'M').year();
				},

				// preps for 2018 #TODO delete
				categoryShow2017: function(){
					return moment()<moment('2018-02-01')
				},

				// cofirm exit if changes
				modalConfirm: function( modal ){
					// if not pristine, confirm exit
					if ( modal === 'complete-modal' ) {
						// $( '#' + modal ).openModal( { dismissible: false } );
						$('#' + modal).modal({ dismissible: false });
						$('#' + modal).modal('open');
					} else {
						$scope.project.cancel();
					}
				},


				/**** BENEFICIARIES ****/

				// add beneficiary
				addBeneficiary: function( $parent ) {
					var beneficiary = ngmClusterBeneficiaries.addBeneficiary( $scope.project, $scope.project.report.locations[ $parent ].beneficiaries );
					$scope.project.setBeneficiary( $parent, beneficiary );
				},

				// add NG WASH beneficiary
				addNgWashBeneficiary: function( $parent ) {
					var beneficiary = ngmClusterHelperNgWash.addBeneficiary( $scope.project.report.locations[ $parent ].beneficiaries );
					$scope.project.setBeneficiary( $parent, beneficiary );
				},

				setBeneficiary: function( $parent, beneficiary ){
					// set implementing if location has set implementing partner;
					if($scope.project.report.locations[$parent].implementing_partners && $scope.project.report.locations[$parent].implementing_partners.length>0){
						beneficiary.implementing_partners = $scope.project.report.locations[$parent].implementing_partners;
					}
					$scope.project.report.locations[ $parent ].beneficiaries.push( beneficiary );
					// Open card panel detail beneficiaries form
					if(!$scope.detailBeneficiaries[$parent]){
						$scope.detailBeneficiaries[$parent]=[];
					}
					$scope.detailBeneficiaries[$parent][$scope.project.report.locations[$parent].beneficiaries.length-1] = true;
					// set form display for new rows
					ngmClusterBeneficiaries.setBeneficiariesInputs( $scope.project.lists, $parent, $scope.project.report.locations[ $parent ].beneficiaries.length-1, beneficiary );
					$scope.project.activePrevReportButton()
					// if project is winterization and actity has a winterization response then put it winterization
					if (ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'] &&
						ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'].length &&
						$scope.project.definition.project_details.length &&
						$scope.project.definition.project_details.findIndex(x => x.project_detail_id === 'winterization') > -1) {
						var winter = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'], { response_id: "winterization" }, true);
						if (winter.length && beneficiary.response.findIndex(x => x.response_id === 'winterization') < 0) {
							beneficiary.response.push(winter[0]);
						}
					}
					// if project is winterization and actity has a winterization response then put it winterization
					// if (ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'] && 
					// 	ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'].length &&
					// 	$scope.project.definition.project_details.length && 
					// 	$scope.project.definition.project_details.findIndex(x => x.project_detail_id === 'winterization') > -1) {
					// 	var winter = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'], { response_id: "winterization" }, true);
					// 	if (winter.length && beneficiary.response.findIndex(x => x.response_id === 'winterization') <0) {
					// 		beneficiary.response.push(winter[0]);
					// 	}
					// }
				},

				setBeneficiaryFromFile: function ($parent, beneficiary,$indexFile){
					// set implementing if location has set implementing partner;
					var beneficiary_default = ngmClusterBeneficiaries.addBeneficiaryFromFile($scope.project, $scope.project.report.locations[$parent].beneficiaries);
					delete beneficiary_default.cluster_id;
					delete beneficiary_default.cluster;
					delete beneficiary_default.activity_type_id;
					delete beneficiary_default.activity_type_name;
					delete beneficiary_default.activity_description_id;
					delete beneficiary_default.activity_description_name;
					delete beneficiary_default.activity_detail_id;
					delete beneficiary_default.activity_detail_name;
					delete beneficiary_default.indicator_id;
					delete beneficiary_default.indicator_name;
					delete beneficiary_default.beneficiary_type_id;
					delete beneficiary_default.beneficiary_type_name;
					delete beneficiary_default.beneficiary_category_id;
					delete beneficiary_default.beneficiary_category_name;
					delete beneficiary_default.delivery_type_id;
					delete beneficiary_default.delivery_type_name;
					delete beneficiary_default.hrp_beneficiary_type_id;
					delete beneficiary_default.hrp_beneficiary_type_name;
					delete beneficiary_default.site_type_id
					delete beneficiary_default.site_type_name
					delete beneficiary_default.site_implementation_id;
					delete beneficiary_default.site_implementation_name;
					delete beneficiary_default.transfer_type_id;
					delete beneficiary_default.transfer_type_value;
					delete beneficiary_default.package_type_id;
					delete beneficiary_default.package_type_name;
					delete beneficiary_default.unit_type_name;
					delete beneficiary_default.mpc_delivery_type_name;
					delete beneficiary_default.mpc_delivery_type_id;
					delete beneficiary_default.mpc_mechanism_type_id;

					if (beneficiary.transfer_category_name && beneficiary.grant_type_name) {
						delete beneficiary_default.transfer_category_id;
						delete beneficiary_default.transfer_category_name;
						delete beneficiary_default.grant_type_id;
						delete beneficiary_default.grant_type_name;
					}
					beneficiary= angular.merge({}, beneficiary_default, beneficiary )
					var message_implementing_partners=''
					if ($scope.project.report.locations[$parent].implementing_partners && $scope.project.report.locations[$parent].implementing_partners.length >0){
						$scope.project.report.locations[$parent].implementing_partners = $scope.project.report.locations[$parent].implementing_partners.filter(x=> x !== '');
					}

					if ($scope.project.report.locations[$parent].implementing_partners && $scope.project.report.locations[$parent].implementing_partners.length > 0) {
						if (beneficiary.implementing_partners && (typeof beneficiary.implementing_partners === 'string')){
							implementing_partners_string_array = beneficiary.implementing_partners.split(',').map(function (org) {
								return org.trim();
							});
							var temp =[];
							var missing_org =[];
							for(var index=0;index<implementing_partners_string_array.length; index++){
								selected_org = $filter('filter')($scope.project.report.locations[$parent].implementing_partners, { organization: implementing_partners_string_array[index] }, true);
								if(selected_org.length){
									temp.push(selected_org[0])
								}else{
									missing_org.push(implementing_partners_string_array[index])
								}
							}
							beneficiary.implementing_partners = temp;
							if(missing_org.length>0){
								var org = missing_org.join(',')
								message_implementing_partners = { label: false, property: 'implementing_partners', reason: '( ' + org + ' ) Organization Not in the Implementing Partners Lists for this location' };
								beneficiary.implementing_partners = $scope.project.report.locations[$parent].implementing_partners;
							}
						}else{
							 beneficiary.implementing_partners = $scope.project.report.locations[$parent].implementing_partners;
						}
					}
					// remove and add from this monthly report
					delete beneficiary.id;
					delete beneficiary.remarks;
					delete beneficiary.createdAt;
					delete beneficiary.updatedAt;
					beneficiary.report_id = config.report.id;
					beneficiary.location_id = $scope.project.report.locations[$parent].id;
					beneficiary.report_month = $scope.project.report.locations[$parent].report_month
					beneficiary.report_year = $scope.project.report.locations[$parent].report_year

					$scope.project.report.locations[$parent].beneficiaries.push(beneficiary);
					// Open card panel detail beneficiaries form
					if (!$scope.detailBeneficiaries[$parent]) {
						$scope.detailBeneficiaries[$parent] = [];
					}
					$scope.detailBeneficiaries[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1] = true;
					// set form display for new rows
					ngmClusterBeneficiaries.setBeneficiariesInputs($scope.project.lists, $parent, $scope.project.report.locations[$parent].beneficiaries.length - 1, beneficiary);


					// unit
					if (beneficiary.unit_type_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['unit_type_id']) {
						selected_unit = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['unit_type_id'], { unit_type_name: beneficiary.unit_type_name }, true);
						if (selected_unit.length){
							beneficiary.unit_type_id = selected_unit[0].unit_type_id;
						}
					}
					// if (beneficiary.mpc_delivery_type_id && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_delivery_type_id']){
					// 	selected_mpc_delivery = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_delivery_type_id'], { mpc_delivery_type_id: beneficiary.mpc_delivery_type_id},true);
					// 	if (selected_mpc_delivery.length){
					// 		beneficiary.mpc_delivery_type_name = selected_mpc_delivery[0].mpc_delivery_type_name;
					// 	}
					// }
					if (beneficiary.mpc_delivery_type_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_delivery_type_id']) {
						selected_mpc_delivery = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_delivery_type_id'], { mpc_delivery_type_name: beneficiary.mpc_delivery_type_name }, true);
						if (selected_mpc_delivery.length) {
							beneficiary.mpc_delivery_type_id = selected_mpc_delivery[0].mpc_delivery_type_id;
						}
					}

					if (beneficiary.mpc_mechanism_type_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_mechanism_type_id']){
						selected_mpc_mechanism = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_mechanism_type_id'], { mpc_mechanism_type_name: beneficiary.mpc_mechanism_type_name, mpc_delivery_type_id: beneficiary.mpc_delivery_type_id }, true);
						if (selected_mpc_mechanism.length) {
							beneficiary.mpc_mechanism_type_id = selected_mpc_mechanism[0].mpc_mechanism_type_id;
						}
					}

					if (beneficiary.transfer_category_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_transfer_category_id']) {
						selected_transfer_category = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_transfer_category_id'], { transfer_category_name: beneficiary.transfer_category_name }, true);
						if (selected_transfer_category.length) {
							beneficiary.transfer_category_id = selected_transfer_category[0].transfer_category_id;
						}
					}
					if (beneficiary.grant_type_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_grant_type_id']) {
						selected_grant = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['mpc_grant_type_id'], { grant_type_name: beneficiary.grant_type_name }, true);
						if (selected_grant.length) {
							beneficiary.grant_type_id = selected_grant[0].grant_type_id;
						}
					}

					if (beneficiary.beneficiary_type_name && ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['beneficiary_type_id']) {
						selected_beneficiary_type = $filter('filter')(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['beneficiary_type_id'], { beneficiary_type_name: beneficiary.beneficiary_type_name }, true);
						if (selected_beneficiary_type.length) {
							beneficiary.beneficiary_type_id = selected_beneficiary_type[0].beneficiary_type_id;
						}
					}

					var temp_indicator_name='';
					if (beneficiary.indicator_name) {
						temp_indicator_name = beneficiary.indicator_name
					}

					// validation for input from file
					if(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]){
						// $scope.messageFromfile[$indexFile] =[]
						$scope.messageFromfile[$indexFile] = ngmClusterValidation.validationInputFromFile(beneficiary, $parent, $scope.project.report.locations[$parent].beneficiaries.length - 1, $scope.project.definition.admin0pcode, $scope.project.definition.project_hrp_project);
						if (message_implementing_partners){
							$scope.messageFromfile[$indexFile].push(message_implementing_partners)
						}
					}

					if (!ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['display_activity_detail']) {
						if (beneficiary.activity_detail_name && !beneficiary.activity_detail_id) {
							delete beneficiary.activity_detail_name;
						}
					}

					if (!ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['display_indicator']) {
						// if (ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['indicator_id']) {
						// 	beneficiary.indicator_name = ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['indicator_name'];
						// 	beneficiary.indicator_id = ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['indicator_id'];
						// 	if (temp_indicator_name && (temp_indicator_name !== ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['indicator_name'])){
						// 		var notif = { label: false, property: 'indicator_id', reason: 'incorect indicator' };
						// 		$scope.messageFromfile[$indexFile].push(notif)
						// 	}
						// }
						if(beneficiary.indicator_name){
							_temp =$filter('filter')($scope.project.lists.activity_indicators, {
							   cluster_id: beneficiary.cluster_id,
							   activity_type_id: beneficiary.activity_type_id,
							   activity_description_id: beneficiary.activity_description_id,
							   activity_detail_name: beneficiary.activity_detail_name,
							   indicator_name: beneficiary.indicator_name
						   }, true);
							if ( !_temp.length||(temp_indicator_name && (temp_indicator_name !== _temp[0].indicator_name))) {
								var notif = { label: false, property: 'indicator_id', reason: 'incorect indicator' };
								$scope.messageFromfile[$indexFile].push(notif)
							}
						   
						}


					}

					if (ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response']) {
						var list_response = angular.copy(ngmClusterBeneficiaries.form[$parent][$scope.project.report.locations[$parent].beneficiaries.length - 1]['response'])
						if (beneficiary.response && beneficiary.response.length) {
							temp_response = [];
							arr_temp_string = beneficiary.response.split(',').map((x) => { return x.trim(); });
							arr_temp_string.forEach(function (r) {
								response_filter = $filter('filter')(list_response, { response_name: r }, true);
								if (response_filter.length) {
									temp_response.push(response_filter[0]);
								};
							});
							if(!temp_response.length){
								
								var id_response = "label[for='" + 'ngm-activity-response-' + $parent +'-'+($scope.project.report.locations[$parent].beneficiaries.length - 1) + "']";
								var notif = { label: id_response, property: 'response', reason: 'Activity response you put not match for this activity' };
								$scope.messageFromfile[$indexFile].push(notif)

							}
							if (temp_response.length && temp_response.length !== arr_temp_string.length) {
								var id_response = "label[for='" + 'ngm-activity-response-' + $parent + '-' + ($scope.project.report.locations[$parent].beneficiaries.length - 1) + "']";
								var notif = { label: id_response, property: 'response', reason: 'Some Activity response you put not match for this activity' };
								$scope.messageFromfile[$indexFile].push(notif)
							}
							
							beneficiary.response = temp_response;
						};
					}


					ngmClusterBeneficiaries.updateBeneficiaires(beneficiary)
				},

				// remove beneficiary nodal
				removeBeneficiaryModal: function( $parent, $index ) {
					// if ( ngmClusterValidation.validateBeneficiaries($scope.project.report.locations, $scope.detailBeneficiaries) ){
						if (!$scope.project.report.locations[$parent].beneficiaries[$index].id) {
							$scope.project.report.locations[$parent].beneficiaries.splice($index, 1);
							$scope.project.activePrevReportButton();
							if (ngmClusterHelperNgWashLists.details && ngmClusterHelperNgWashLists.details[$parent] && ngmClusterHelperNgWashLists.details[$parent][$index]) {
								ngmClusterHelperNgWashLists.details[$parent].splice($index, 1);
							}
						} else{
							if ( ngmClusterBeneficiaries.beneficiaryFormComplete( $scope.project.definition, $scope.project.report.locations ) ){
									$scope.project.locationIndex = $parent;
									$scope.project.beneficiaryIndex = $index;
								// $( '#beneficiary-modal' ).openModal({ dismissible: false });
								$('#beneficiary-modal').modal({ dismissible: false });
								$('#beneficiary-modal').modal('open');
							}
						}
					// }
				},

				// remove beneficiary
				removeBeneficiary: function() {
					var id = $scope.project.report.locations[ $scope.project.locationIndex ].beneficiaries[ $scope.project.beneficiaryIndex ].id;
					$scope.project.report.locations[ $scope.project.locationIndex ].beneficiaries.splice( $scope.project.beneficiaryIndex, 1 );
					// ngmClusterBeneficiaries.updateSelectById('ngm-' + $scope.project.locationIndex);
					$scope.project.activePrevReportButton();
					ngmClusterBeneficiaries.removeBeneficiary( $scope.project, id );
					if (ngmClusterHelperNgWashLists.details && ngmClusterHelperNgWashLists.details[$scope.project.locationIndex] && ngmClusterHelperNgWashLists.details[$scope.project.locationIndex][$scope.project.beneficiaryIndex]) {
						ngmClusterHelperNgWashLists.details[$scope.project.locationIndex].splice($scope.project.beneficiaryIndex, 1);
					}
				},


				// remove report modal
				removeReportModal: function() {
					$( '#remove-report-modal' ).openModal({ dismissible: false });
					$( '#remove-report-modal').modal({ dismissible: false });
					$( '#remove-report-modal').modal('open');
				},

				// remove report
				removeReport: function() {
					ngmClusterBeneficiaries.removeReport($scope.project, $scope.project.report.id, function (err) {
						if (!err) {
							$timeout(function () {
									$location.path('/cluster/projects/report/' + $scope.project.definition.id);
							}, 400);
						}
					});
				},

				/**** LOCATIONS ****/

				// return monthly report title for location
				getReportTitle: function( target_location ){

					// default admin 1,2
					var title = '';

					// location_type_id
					switch ( target_location.site_type_id ) {

						// refugee_camp
						case 'refugee_camp':

							// site_type_name
							if ( target_location.site_type_name ) {
								title += target_location.site_type_name + ': ';
							}

							// admin1, admin2
							title += target_location.admin1name + ', ' + target_location.admin2name;

							// site_name
							if (target_location.site_name !== null && target_location.site_name !==''){
								title += ', ' + target_location.site_name;
							}

							break;

						// food_distribution_point
						case 'food_distribution_point':

							// type + title
							title += target_location.site_type_name + ' ' + (target_location.site_name !== null && target_location.site_name !== ''?(target_location.site_name + ': '):': ');

							// admin1, admin2
							title += target_location.admin1name + ', ' + target_location.admin2name + ', ' + target_location.admin3name;

							break;

						// refugee_block
						case 'refugee_block':

							// site_type_name
							if ( target_location.site_type_name ) {
								title += target_location.site_type_name + ': ';
							}

							// admin1, admin2
							title += target_location.admin1name + ', ' + target_location.admin2name;

							// site_name
							if (target_location.site_name !== null && target_location.site_name !== '') {
								title += ', ' + target_location.site_name;
							}

							break;

						// default
						default:

							// site_type_name
							if ( target_location.site_type_name ) {
								title += target_location.site_type_name + ': ';
							}

							// admin1, admin2
							title += target_location.admin1name + ', ' + target_location.admin2name;

							// admin levels 3,4,5
							if ( target_location.admin3name ) {
								title += ', ' + target_location.admin3name;
							}
							if ( target_location.admin4name ) {
								title += ', ' + target_location.admin4name;
							}
							if ( target_location.admin5name ) {
								title += ', ' + target_location.admin5name;
							}

							// site_name
							if (target_location.site_name !== null && target_location.site_name !== '') {
								title += ', ' + target_location.site_name;
							}

							break;
					}

					return title;
				},

				// project focal point
				showReporter: function( $data, target_location ){
					return ngmClusterLocations.showReporter( $scope.project.lists, $data, target_location )
				},

				// site implementation
				showSiteImplementation: function( $data, target_location ){
					return ngmClusterLocations.showSiteImplementation( $scope.project.lists, $data, target_location );
				},

				// showadmin
				showAdmin: function( parent_pcode, list, pcode, name, $index, $data, target_location ){
					return ngmClusterLocations.showAdmin( $scope.project.lists, parent_pcode, list, pcode, name, $index, $data, target_location );
				},

				// fetch lists
				getAdminSites: function( pcode, $index, $data, target_location ){
					ngmClusterLocations.getAdminSites( $scope.project.lists, $scope.project.definition.admin0pcode, pcode, $index, $data, target_location );
				},

				// on change
				adminOnChange: function( pcode, $index, $data, target_location ){
					$timeout(function() {
						ngmClusterLocations.adminOnChange( $scope.project.lists, pcode, $index, $data, target_location );
					}, 0 );
				},

				// site_type
				showSiteType: function( $index, $data, target_location ){
					return ngmClusterLocations.showSiteType( $scope.project.lists, $index, $data, target_location );
				},

				// select from list?
				showListYesNo: function( $index, $data, target_location ){
					return ngmClusterLocations.showListYesNo( $scope.project.lists, $index, $data, target_location );
				},

				// yes/no
				yesNoOnChange: function( target_location ){
					target_location.site_id = null ;
				},

				// show sites
				showAdminSites: function( $index, $data, target_location ){
					return ngmClusterLocations.showAdminSites( $scope.project.lists, $index, $data, target_location );
				},

				// site_name
				showSiteName: function( $data, target_location ){
					return ngmClusterLocations.showSiteName( $data, target_location );
				},



				/**** ACTIVITIES ****/

					// fsac_assessment
					showFsacAssessment:function(b){
						if (b.activity_description_id){

							if (b.activity_type_id === 'fsac_assessments' &&
								(b.activity_description_id.indexOf('sess') > -1
								|| (b.activity_description_id) ==='fsac_pre_harvest_appraisal'))
								{
								return true
							}
						}
						return false
					},

				fsacAssessmentPercentage:function (b) {
					// version 1
					// if (b.hh_assements_poor_after>0){

					// 	b.hh_assements_percentage = (b.hh_assements_poor_after - b.hh_assements_poor_after / b.hh_assements)*100;
					// }
					// b.hh_assements_percentage =0;

					// version 2 absolute_number
					// $scope.fsac_assessment_disabled = false;
					// 	var total = b.hh_acceptable + b.hh_borderline + b.hh_poor;
					// 	var total_pmd = b.hh_acceptable_pmd + b.hh_borderline_pmd + b.hh_poor_pmd;
					// 	if (total > b.hh_surveyed || total_pmd > b.hh_surveyed){
					// 		$scope.fsac_assessment_disabled = true;

					// 	}

					// version 2 percentage
					$scope.fsac_assessment_invalid = false;
					$scope.fsac_assessment_overflow = false;
					$scope.fsac_assessment_disabled = false;
					var total = b.hh_acceptable + b.hh_borderline + b.hh_poor;
					var total_pmd = b.hh_acceptable_pmd + b.hh_borderline_pmd + b.hh_poor_pmd;

					if (total > 100 || total_pmd > 100) {
						$scope.fsac_assessment_overflow = true;
					}
					if ((b.hh_acceptable < 0 || b.hh_borderline < 0 || b.hh_poor < 0 || b.hh_acceptable_pmd < 0 || b.hh_borderline_pmd < 0 || b.hh_poor_pmd < 0) ||
						(b.hh_acceptable === undefined || b.hh_borderline === undefined || b.hh_poor === undefined || b.hh_acceptable_pmd === undefined || b.hh_borderline_pmd === undefined || b.hh_poor_pmd === undefined) || isNaN(total) || isNaN(total_pmd)) {
						$scope.fsac_assessment_invalid = true;
					}

					if ($scope.fsac_assessment_invalid ||
					$scope.fsac_assessment_overflow){
						$scope.fsac_assessment_disabled = true;
					}


				},

				fsacToPercentage:function(b,string){
					// b[string] = (b[string]/b.hh_surveyed)*100;
				},
				setAssessmentAtribute: function ($parent,$index){
					var beneficiary = $scope.project.report.locations[$parent].beneficiaries[$index]
					$scope.project.report.locations[$parent].beneficiaries[$index]=ngmClusterBeneficiaries.setAssessmentAtribute(beneficiary);
				},
				// disable save form
				// rowSaveDisabled: function( $data ){
				// 	return ngmClusterBeneficiaries.rowSaveDisabled( $scope.project.definition, $data );
				// },

				// remove from array if no id
				cancelEdit: function( $parent, $index ) {
					if ( !$scope.project.report.locations[ $parent ].beneficiaries[ $index ].id ) {
					 $scope.project.report.locations[ $parent ].beneficiaries.splice( $index, 1 );
					 ngmClusterBeneficiaries.form[ $parent ].splice( $index, 1 );
					//  remove details list if exists
						if (ngmClusterHelperNgWashLists.details[$parent] && ngmClusterHelperNgWashLists.details[$parent][$index]){
							ngmClusterHelperNgWashLists.details[$parent].splice($index, 1);
						}
					//  ngmClusterBeneficiaries.updateSelectById('ngm-' + $parent);
					}
				},

				// validate form ( ng wash )
				validateWashNgBeneficiariesForm: function( complete, display_modal ){
					if (ngmClusterValidation.validateBeneficiaries($scope.project.report.locations, $scope.detailBeneficiaries, $scope.project.definition.admin0pcode, $scope.project.definition.project_hrp_project, false)){
						if (ngmClusterHelperNgWashValidation.validateActivities($scope.project.report.locations, $scope.detailBeneficiaries)) {
							if (complete) {
								// $( '#complete-modal' ).openModal( { dismissible: false } );
								$('#complete-modal').modal({ dismissible: false });
								$('#complete-modal').modal('open');
							} else if (display_modal) {
								// $( '#save-modal' ).openModal( { dismissible: false } );
								$('#save-modal').modal({ dismissible: false });
								$('#save-modal').modal('open');
							} else {
								// arg1: set report status from 'todo' to 'complete' & re-direct
								// arg2: save & re-direct
								// arg3: alert admin via email of user edit of 'complete' report
								$scope.project.save(false, false, false);
							}
						}
					}
					
				},

				// validate form ( ng wash )
				validateBeneficiariesDetailsForm: function( complete, display_modal ){
					if ($scope.project.checkActiveAllActivities()){
						if (ngmClusterValidation.validateBeneficiaries($scope.project.report.locations, $scope.detailBeneficiaries, $scope.project.definition.admin0pcode, $scope.project.definition.project_hrp_project, $scope.project.isNeedAssessedHouseholds)){
							if ( complete ) {
								// $( '#complete-modal' ).openModal( { dismissible: false } );
								$('#complete-modal').modal({ dismissible: false });
								$('#complete-modal').modal('open');
							} else if ( display_modal ) {
								// $( '#save-modal' ).openModal( { dismissible: false } );
								$('#save-modal').modal({ dismissible: false });
								$('#save-modal').modal('open');
							} else {
								// arg1: set report status from 'todo' to 'complete' & re-direct
								// arg2: save & re-direct
								// arg3: alert admin via email of user edit of 'complete' report
								$scope.project.save( false, false, false );
							}
						}
					}
				},

				// copy previous month - backend
				copyPreviousMonth: function() {

					// set messages
					// Materialize.toast( $filter( 'translate' )( 'fetching_data' ), 4000, 'note' );
					M.toast({ html: $filter('translate')('fetching_data'), displayLength: 4000, classes: 'note' });
					$scope.deactivedCopybutton = true;
					$scope.addBeneficiaryDisable = true;

					// set param
					if ( $scope.project.report.report_month < 1) {
						var params = {
							project_id: $route.current.params.project,
							report_month: 11,
							report_year: $scope.project.report.report_year-1
						}
					} else {
						var params = {
							project_id: $route.current.params.project,
							report_month: $scope.project.report.report_month - 1,
							report_year: $scope.project.report.report_year
						}
					}

					if ($scope.project.report.report_type_id && $scope.project.report.report_type_id === 'bi-weekly'){
						var number_date_of_reporting_period = moment.utc($scope.project.report.reporting_period).format('D')
						params.report_month = (number_date_of_reporting_period <= 15) ? ($scope.project.report.report_month < 1? 11 : $scope.project.report.report_month - 1) : $scope.project.report.report_month;
						var _period = (number_date_of_reporting_period <= 15) ? moment($scope.project.report.reporting_period).subtract(1, 'M').set('date', 16).format() : moment($scope.project.report.reporting_period).set('date', 1).format();
						params.reporting_period = _period;
						params.report_type_id = $scope.project.report.report_type_id
					}



					// setReportRequest
					var get_prev_report = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/report/getReport',
						data: params
					}

					// get
					ngmData.get( get_prev_report ).then( function ( prev_report ) {

						var brows = 0;
						var info = $filter('translate')('save_to_apply_changes');
						
						// data returned?
						angular.forEach( prev_report.locations, function(l){
							brows += l.beneficiaries.length;
						});

						// if no data
						if( !brows ){

							// no data
							if ( Object.keys( prev_report ).length ){
								var msg = $filter( 'translate' )( 'no_data_in_previous_report' );
										typ = 'success';
							} else {
								var msg = $filter( 'translate' )( 'no_previous_report' );
										typ = 'success';
							}


							// deactive false
							$scope.addBeneficiaryDisable = false;
							$scope.deactivedCopybutton = false;

							// toast
							// Materialize.toast( msg, 4000, typ );
							M.toast({ html: msg, displayLength: 4000, classes: typ });

						} else {

							// init message
							// Materialize.toast( $filter( 'translate' )( 'copying' ), 6000, 'note' );
							M.toast({ html: $filter('translate')('copying'), displayLength: 6000, classes: 'note' });
							// if ( brows > 0 ){
							// 	var msg = "Copied Beneficiaries " + brows + ' rows';
							// 			typ = 'success';
							// }

							// // send message
							// // Materialize.toast( msg, 4000, typ );
							// M.toast({ html: msg, displayLength: 4000, classes: typ });


							var current_report = angular.copy( $scope.project.report );
							if (current_report.locations) {
								delete current_report.locations;
								delete current_report.cluster_id;
								delete current_report.cluster;
							}
							var copy_counter =0;
							// set last month
							angular.forEach($scope.project.report.locations, function (location, locationIndex ){

								// get reference_id
								var target_location_reference_id = location.target_location_reference_id
								var previous_location = prev_report.locations.find( function ( l ) {
									return l.target_location_reference_id === target_location_reference_id
								});

								// current location (for report defaults)

								// current month to last month
								// while ($scope.project.location_beneficiary_limit[locationIndex].beneficiary_limit < previous_location.beneficiaries.length) {
								// 	$scope.project.location_beneficiary_limit[locationIndex].beneficiary_limit += 6
								// }
								location.beneficiaries = previous_location.beneficiaries;
								$scope.detailBeneficiaries[locationIndex][0] = true;
								

								// forEach beneficiaries
								angular.forEach( location.beneficiaries, function( b , beneficiariesIndex){
										angular.merge( b, current_report );
										delete b.id;
										delete b.createdAt;
										delete b.updatedAt;
										delete b.report_submitted;
									
									ngmClusterBeneficiaries.setBeneficiariesInputs($scope.project.lists, locationIndex, beneficiariesIndex, b);

									if (!ngmClusterBeneficiaries.form[locationIndex][beneficiariesIndex]['display_activity_detail']) {
										if(b.activity_detail_name || b.activity_detail_id){
											b.activity_detail_name = '';
											b.activity_detail_id = '';
										}
									}

									var forFilter = {};
									var mark = { activity: false, hrp_beneficiary_type_id: false, beneficiary_type_id: false }
									forFilter.beneficiary_type_name = b.beneficiary_type_name;
									forFilter.cluster_id = b.cluster_id;
									isBeneficiaryTypeStillExist = $filter('filter')($scope.project.lists.beneficiary_types, forFilter, true)

									if (!isBeneficiaryTypeStillExist.length) { delete b.beneficiary_type_id; mark.beneficiary_type_id = true;}
										// if(!$scope.project.checkActiveBeneficiaryType(b,locationIndex,beneficiariesIndex)){
										// 	delete b.beneficiary_type_id;
										// }

									if (b.hrp_beneficiary_type_id || b.hrp_beneficiary_type_name){										
										var isHRPBeneficiaryTypeStillExist = [];
										var forFilterHRP = {};
										forFilterHRP.hrp_beneficiary_type_name = b.hrp_beneficiary_type_name;
										isHRPBeneficiaryTypeStillExist = $filter('filter')($scope.project.lists.hrp_beneficiary_types, forFilterHRP, true)
										if (!isHRPBeneficiaryTypeStillExist.length) { delete b.hrp_beneficiary_type_id; mark.hrp_beneficiary_type_id = true;};
									}
									
									if(!$scope.project.checkActiveActivities(b)) {mark.activity =true};
									if (Object.keys(mark).length) {
										if (!$scope.beneficiaryIncorrectActivityChecking[locationIndex]) $scope.beneficiaryIncorrectActivityChecking[locationIndex] = [];

										$scope.beneficiaryIncorrectActivityChecking[locationIndex].push(mark);
									}
									// 	if(!$scope.project.checkActiveHRP(b, locationIndex,beneficiariesIndex)){
									// 		delete b.hrp_beneficiary_type_id;
									// 	}

									
									
									// add +1 after done with the copy of beneficiary;
									copy_counter +=1;
									
								});

							});

							// reset form UI layout
							$timeout(function() {
								// ngmClusterBeneficiaries.setLocationsForm( $scope.project.lists, $scope.project.report.locations );
								if (brows > 0 && (copy_counter >0 && copy_counter <= brows)) {
									copied = copy_counter
									var msg = "Copied Beneficiaries " + copied + ' rows';
									typ = 'success';
								}

								// send message
								// Materialize.toast( msg, 4000, typ );
								M.toast({ html: msg, displayLength: 4000, classes: typ });
								M.toast({ html: info, displayLength: 8000, classes: 'note' });
								$scope.addBeneficiaryDisable = false;
							}, 10 );

							$scope.paginated_monthly_locations = $scope.project.report.locations;

							// final message
							// Materialize.toast( info, 8000, 'note' );
							// M.toast({ html: info, displayLength: 8000, classes: 'note' });
							// $scope.addBeneficiaryDisable = false;

						}

					}).catch(function (e){

						// error
						// Materialize.toast( $filter( 'translate' )( 'error_not_copied' ), 6000, 'error' );
						M.toast({ html: $filter('translate')('error_not_copied'), displayLength: 6000, classes: 'error' });
						$scope.addBeneficiaryDisable = false;
						$scope.deactivedCopybutton = false;

					})

				},

				// active deactivate copy previoust month
				activePrevReportButton: function(){

					$scope.beneficiariesCount= 0;
					$scope.project.report.locations.forEach(function(l){
						if ( l.beneficiaries && l.beneficiaries.length ) {
							 $scope.beneficiariesCount += l.beneficiaries.length;
						 }
					});

					if ($scope.project.definition.project_status === 'complete' || $scope.project.report.report_status !== 'todo' || (( $scope.beneficiariesCount >0 ) )){
						$scope.deactivedCopybutton = true;
						return $scope.deactivedCopybutton
					} else{
						$scope.deactivedCopybutton = false;
						return $scope.deactivedCopybutton;
					}

				},

				// check Copied Beneficiaries
				checkActiveActivities:function(b){
					var active =true;
					if (!b.id && b.activity_type_id && b.activity_description_id ){
						var isActivityStillExist =[];
						var forfilter ={};
						if(b.activity_type_id){
							forfilter.activity_type_id = b.activity_type_id;
							isActivityStillExist = $filter('filter')($scope.project.definition.activity_type, forfilter, true)
						}
						if(b.activity_description_id){
							forfilter.activity_description_id = b.activity_description_id;
							isActivityStillExist = $filter('filter')($scope.project.lists.activity_descriptions, forfilter, true);
						}
						if(b.activity_detail_id){
							forfilter.activity_detail_id = b.activity_detail_id;
							isActivityStillExist = $filter('filter')($scope.project.lists.activity_details, forfilter, true);
						}
						if(b.indicator_id){
							forfilter.indicator_id = b.indicator_id;
							isActivityStillExist = $filter('filter')($scope.project.lists.activity_indicators, forfilter, true);
						}
						if (!isActivityStillExist.length){
							active = false;
						}
						
					}
					return active
				},
				checkActiveBeneficiaryType: function (b,$locationIndex, $beneficiaryIndex){
					var active = true;
					if(!b.id && b.beneficiary_type_name){
						var isBeneficiaryTypeStillExist = [];
						var forFilter = {};
						forFilter.beneficiary_type_name = b.beneficiary_type_name;
						forFilter.cluster_id = b.cluster_id;
						isBeneficiaryTypeStillExist = $filter('filter')($scope.project.lists.beneficiary_types, forFilter, true)
						
						if(!isBeneficiaryTypeStillExist.length){
							active = false;
							
							// if (!$scope.detailBeneficiaries[$locationIndex][$beneficiaryIndex]) {
							// 	$scope.detailBeneficiaries[$locationIndex][$beneficiaryIndex] = true;
							// };
							// id = "label[for='" + 'ngm-beneficiary_type_id-' + $locationIndex + '-' + $beneficiaryIndex + "']";
							// $(id).addClass('error');
						}
					};

					return active
				},
				checkActiveHRP:function(b,$locationIndex,$beneficiaryIndex){
					var active = true;
					if (!b.id && b.hrp_beneficiary_type_name && ($scope.project.definition.admin0pcode === 'AF') && $scope.project.definition.project_hrp_project) {
						var isHRPBeneficiaryTypeStillExist = [];
						var forFilter = {};
						forFilter.hrp_beneficiary_type_name = b.hrp_beneficiary_type_name;
						isHRPBeneficiaryTypeStillExist = $filter('filter')($scope.project.lists.hrp_beneficiary_types, forFilter, true)

						if (!isHRPBeneficiaryTypeStillExist.length) {
							active = false;
							// if (!$scope.detailBeneficiaries[$locationIndex][$beneficiaryIndex]) {
							// 	$scope.detailBeneficiaries[$locationIndex][$beneficiaryIndex] = true;
							// }
							// id = "label[for='" + 'ngm-hrp_beneficiary_type_id-' + $locationIndex + '-' + $beneficiaryIndex + "']";
							// $(id).addClass('error');
						}
					};

					return active
				},
				checkActiveAllActivities:function(){
					var active = true;
					var count =0;
					var count_beneficiary_type =0;
					var count_hrp_beneficiary_type=0;
					var scrollDiv;
					var elementcheckactivities = []
					angular.forEach($scope.project.report.locations, function (l, i) {
						angular.forEach(l.beneficiaries, function (b, j) {
							if(l.beneficiaries.length){
								var mark = { activity: false, hrp_beneficiary_type_id: false, beneficiary_type_id:false}
								if (!$scope.project.checkActiveHRP(b, i, j)){
									count_hrp_beneficiary_type = count_hrp_beneficiary_type+1;
									scrollDiv = $('#need_tochange-hrp_beneficiary-type-' + i + '-' + j);
									elementcheckactivities.push({id:'#need_tochange-hrp_beneficiary-type-' + i + '-' + j,location:i,beneficiaries:j})
									mark.hrp_beneficiary_type_id = true;
									// if (!$scope.detailBeneficiaries[i][j]) {
									// 	$scope.detailBeneficiaries[i][j] = true;
									// };
								}
								if (!$scope.project.checkActiveBeneficiaryType(b, i, j)) {
									count_beneficiary_type = count_beneficiary_type + 1;
									scrollDiv = $('#need_tochange-beneficiary-type-' + i + '-' + j);
									elementcheckactivities.push({id:'#need_tochange-beneficiary-type-' + i + '-' + j,location:i,beneficiaries:j})
									mark.beneficiary_type_id = true;
									// if (!$scope.detailBeneficiaries[i][j]) {
									// 	$scope.detailBeneficiaries[i][j] = true;
									// };
								}
								if(!$scope.project.checkActiveActivities(b)){
									count = count +1;
									scrollDiv = $('#need_tochange-'+i+'-'+j);
									elementcheckactivities.push({id:'#need_tochange-' + i + '-' + j,location:i,beneficiaries:j})
									mark.activity = true;
									// if (!$scope.detailBeneficiaries[i][j]) {
									// 	$scope.detailBeneficiaries[i][j] = true;
									// };
								};
								
								if (!$scope.beneficiaryIncorrectActivityChecking[i]) $scope.beneficiaryIncorrectActivityChecking[i]=[];
								if (Object.keys(mark).length){

									$scope.beneficiaryIncorrectActivityChecking[i][j] = mark;

								}
								
							}
						})
					})
					if (count > 0 || count_beneficiary_type > 0 || count_hrp_beneficiary_type > 0){
						active = false;

						// $timeout(function(){
							// scrollDiv.scrollHere();
						$(elementcheckactivities[0].id).scrollHere()
						if (!$scope.detailBeneficiaries[elementcheckactivities[0].location][elementcheckactivities[0].beneficiaries]) {
							$scope.detailBeneficiaries[elementcheckactivities[0].location][elementcheckactivities[0].beneficiaries] = true;
						};
						// },1000)
						
						if(count>0){
							M.toast({ html: "There's some activities need to be changed!", displayLength: 6000, classes: 'error' });
						}
						if (count_beneficiary_type > 0){
							M.toast({ html: "There's some beneficiary type need to be changed!", displayLength: 6000, classes: 'error' });
							id = "label[for='" + 'ngm-beneficiary_type_id-' + elementcheckactivities[0].location + '-' + elementcheckactivities[0].beneficiaries + "']";
							$timeout(function(){
								$(id).addClass('error');
							},0)
						}
						if (count_hrp_beneficiary_type > 0) {
							M.toast({ html: "There's some HRP beneficiary type need to be changed!", displayLength: 6000, classes: 'error' });
							id = "label[for='" + 'ngm-hrp_beneficiary_type_id-' + elementcheckactivities[0].location + '-' + elementcheckactivities[0].beneficiaries + "']";
							$timeout(function () {
								$(id).addClass('error');
							}, 0)
						}
					}

					return active
				},

				setTokenUpload: function () {
					ngmClusterDocument.setParam($scope.project.user.token);
				},
				uploadDocument: ngmClusterDocument.uploadDocument({
						project_id:config.project.id,
						report_id: config.report.id,
						username: ngmUser.get().username,
						organization_tag: config.report.organization_tag,
						cluster_id: config.report.cluster_id,
						admin0pcode: config.report.admin0pcode,
						adminRpcode: config.report.adminRpcode,
						reporting_period: config.report.reporting_period,
						project_start_date: config.project.project_start_date,
						project_end_date: config.project.project_end_date
					}),
				getDocument:function(){
					ngmData.get({
						method: 'GET',
						url: ngmAuth.LOCATION + '/api/listReportDocuments/' + $route.current.params.report
					}).then(function (data) {
						// assign data
						// set for grid view
						$scope.listUpload = data;
						$scope.listUpload.id = 'ngm-paginate-' + Math.floor((Math.random() * 1000000))
						$scope.listUpload.itemsPerPage= 12,
						$scope.listUpload.itemsPerListPage = 6;
					});
				},
				// validate report monthly by who incharge after report submitted
				validateReport:function(status){

					// Materialize.toast('Validating ... ', 3000, 'note');
					M.toast({ html: 'Validating... ', displayLength: 3000, classes: 'note' });
					obj={report_validation:status}
					var setRequest = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/report/updateReportValidation',
						data: {
							report_id: $scope.project.report.id,
							update: obj
						}
					};
					$http(setRequest).then(function (report) {
						if (report.data.err) {
							// update
							// Materialize.toast('Error! something went wrong', 6000, 'error');
							M.toast({ html: 'Error! something went wrong', displayLength: 6000, classes: 'error' });
						}
						if (!report.data.err) {
							$timeout(function () {
								// Materialize.toast('Submitted Monthly Report is ' + status, 4000, 'success');
								M.toast({ html: 'Submitted Monthly Report is', displayLength: 4000, classes: 'success' });
								$location.path('/cluster/projects/report/' + $scope.project.definition.id);
							},3000)
						}

					})
				},
				// openClose: true,
				openCloseDetailBeneficiaries: function ($parent, $index) {
					$scope.detailBeneficiaries[$parent][$index] = !$scope.detailBeneficiaries[$parent][$index];
				},
				totalBeneficiary: function (beneficiary) {
					total = 0;
					total += beneficiary.boys +
						beneficiary.men +
						beneficiary.elderly_men + beneficiary.girls +
						beneficiary.women +
						beneficiary.elderly_women;
					return total
				},
				// upload file monthly report
				uploadFileReport:{
					openModal: function (modal) {
						// $('#' + modal).openModal({ dismissible: false });
						$('#' + modal).modal({ dismissible: false });
						$('#' + modal).modal('open');
					},
					closeModal: function (modal) {
						drop_zone.removeAllFiles(true);
						M.toast({ html: $filter('translate')('cancel_to_upload_file'), displayLength: 2000, classes: 'note' });
					},
					uploadFileConfig:{
						previewTemplate: ngmClusterImportFile.templatePreview(),
						completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">' + $filter('translate')('complete') + '</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
						acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
						maxFiles: 1,
						parallelUploads: 1,
						url: ngmAuth.LOCATION + '/api/uploadGDrive',
						dictDefaultMessage:
							`<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !',
						notSupportedFile: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + $filter('translate')('not_supported_file_type') + ' ',
						errorMessage: `<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>Error`,
						addRemoveLinks: false,
						autoProcessQueue: false,
						init: function () {
							drop_zone = this;
							// upload_file and delete_file is ID for button upload and cancel
							$("#upload_file").attr("disabled", true);
							$("#delete_file").attr("disabled", true);

							document.getElementById('upload_file').addEventListener("click", function () {
								$("#upload_file").attr("disabled", true);
								$("#delete_file").attr("disabled", true);
								$("#switch_btn_file").attr("disabled", true);
								var ext = drop_zone.getAcceptedFiles()[0].name.split('.').pop();
								var attribute_headers_obj = ngmClusterImportFile.listheaderAttributeInFile('monthly_report');
								if(ext === 'csv'){
									var file = drop_zone.getAcceptedFiles()[0],
										read = new FileReader();

									read.readAsBinaryString(file);

									read.onloadend = function () {
										var csv_string = read.result
										csv_array= Papa.parse(csv_string).data;
										if(csv_array[0].indexOf('Activity Type')<0){
											var previews = document.querySelectorAll(".dz-preview");
											previews.forEach(function (preview) {
												preview.style.display = 'none';
											})
											document.querySelector(".dz-default.dz-message").style.display = 'none';
											document.querySelector(".percent-upload").style.display = 'block';
											$scope.project.report.messageWarning = 'Incorect Input! \n' + 'Header is Not Found';
											$timeout(function () {
												$('#upload-monthly-file').modal('close');
												document.querySelector(".dz-default.dz-message").style.display = 'block';
												document.querySelector(".percent-upload").style.display = 'none';
												$('#message-monthly-file').modal({ dismissible: false });
												$('#message-monthly-file').modal('open');
												$("#switch_btn_file").attr("disabled", false);
											},1000)
											return
										};
										var values=[];
										values_obj=[];
										// get value and change to object
										values_obj = ngmClusterImportFile.setCsvValueToArrayofObject(csv_array);
										// map the header to the attribute name
										for (var index = 0; index < values_obj.length; index++) {
											obj_true = {};
											angular.forEach(values_obj[index], function (value, key) {

												atribute_name = attribute_headers_obj[key];
												obj_true[atribute_name] = value;

											})
											obj_true = $scope.project.addMissingAttributeFromFile(obj_true);
											values.push(obj_true);
										}

										if(values.length >0 ){
												var previews = document.querySelectorAll(".dz-preview");
												previews.forEach(function (preview) {
													preview.style.display = 'none';
												})
												document.querySelector(".dz-default.dz-message").style.display = 'none';
												document.querySelector(".percent-upload").style.display = 'block';
												var count_error = 0;
												for (var x = 0; x < values.length; x++) {
													var index = $scope.project.report.locations.findIndex(j => ((j.site_implementation_name ? j.site_implementation_name : "") === values[x].site_implementation_name) &&
																									((j.site_type_name ? j.site_type_name : "") === values[x].site_type_name) &&
																									 (j.site_name === values[x].site_name) &&
																									 (j.admin1name === values[x].admin1name) &&
																									 (j.admin2name === values[x].admin2name) &&
																									 (j.admin3name? (j.admin3name === values[x].admin3name): true));
													if (values[x].target_location_reference_id) {
														var index_by_target_location_reference_id = $scope.project.report.locations.findIndex(l => l.target_location_reference_id === values[x].target_location_reference_id);
														index = (index >= index_by_target_location_reference_id) ? index : index_by_target_location_reference_id;
													}
													if (index < 0 || (!values[x].activity_type_id) || (!values[x].activity_description_id) || (!values[x].cluster_id)) {
														if (!$scope.messageFromfile[x]) {
															$scope.messageFromfile[x] = []
														}
														obj = {}
														if (index < 0) {
															obj = { label: false, property: 'location', reason: '' }
															obj.reason = 'Location not Found : '+values[x].admin1name + ', ' +values[x].admin2name;
															if (values[x].admin3name){
																obj.reason += ', '+values[x].admin3name
															}
															if (values[x].site_name){
																obj.reason += ', ' + values[x].site_name
															}
															obj.reason += ', ' + values[x].site_implementation_name + ', ' + values[x].site_type_name

															$scope.messageFromfile[x].push(obj)
														}
														if (!values[x].cluster_id){
															obj = { label: false, property: 'cluster_id', reason: '' }
															obj.reason = values[x].cluster
															$scope.messageFromfile[x].push(obj)
														}
														if (!values[x].activity_type_id) {
															obj = { label: false, property: 'activity_type_id', reason: '' }
															obj.reason = values[x].activity_type_name
															$scope.messageFromfile[x].push(obj)
														}
														if (!values[x].activity_description_id) {
															obj = { label: false, property: 'activity_description_id', reason: '' }
															obj.reason = values[x].activity_description_name
															$scope.messageFromfile[x].push(obj)
														}
														count_error += 1;

													} else {
														$scope.project.setBeneficiaryFromFile(index, values[x],x);
													}
												}

										}

										$timeout(function () {
											document.querySelector(".percent-upload").style.display = 'none';
											$('#upload-monthly-file').modal('close');
											drop_zone.removeAllFiles(true);
											$scope.project.activePrevReportButton();

											var message_temp = '';


											message_temp = ngmClusterImportFile.setMessageFromFile($scope.messageFromfile, ngmClusterValidation.fieldNameBeneficiaryMonthlyReport(), 'report', 'message-monthly-file')

											if (message_temp !== '') {

												$scope.project.report.messageWarning = message_temp;
												$timeout(function () {
													$('#message-monthly-file').modal({ dismissible: false });
													$('#message-monthly-file').modal('open');
												})

											}
											// perlu diperbaiki
											if (count_error > 0 || values.length < 1) {
												if ((count_error === values.length) || (values.length < 1)) {
													M.toast({ html: 'Import Fail!', displayLength: 2000, classes: 'error' });
												} else {
													var info = $filter('translate')('save_to_apply_changes');
													M.toast({ html: 'Some Row Succeccfully added !', displayLength: 2000, classes: 'success' });
													M.toast({ html: info, displayLength: 4000, classes: 'note' });
												}

											} else {
												var info = $filter('translate')('save_to_apply_changes');
												M.toast({ html: 'Import File Success!', displayLength: 2000, classes: 'success' });
												M.toast({ html: info, displayLength: 4000, classes: 'note' });
											}


											// reset error message
											$scope.messageFromfile = [];
											$("#upload_file").attr("disabled", true);
											$("#delete_file").attr("disabled", true);
											$("#switch_btn_file").attr("disabled", false);
										}, 2000)
									}


								}else{
									file = drop_zone.getAcceptedFiles()[0]
									const wb = new ExcelJS.Workbook();
									drop_zone.getAcceptedFiles()[0].arrayBuffer().then((data) => {
										var result = []
										wb.xlsx.load(data).then(workbook => {
											const book = [];
											var book_obj = [];

											workbook.eachSheet((sheet,index) => {
												// get only the first sheet
												if(index === 1){
													const sh = [];
													sheet.eachRow(row => {
														sh.push(row.values);
													});
													book.push(sh);
												}
											});

											if (book[0][0].indexOf('Activity Type')<0) {
												var previews = document.querySelectorAll(".dz-preview");
												previews.forEach(function (preview) {
													preview.style.display = 'none';
												})
												document.querySelector(".dz-default.dz-message").style.display = 'none';
												document.querySelector(".percent-upload").style.display = 'block';
												$scope.project.report.messageWarning = 'Incorect Input! \n' + 'Header is Not Found';
												$timeout(function () {
													$('#upload-monthly-file').modal('close');
													document.querySelector(".dz-default.dz-message").style.display = 'block';
													document.querySelector(".percent-upload").style.display = 'none';
													$('#message-monthly-file').modal({ dismissible: false });
													$('#message-monthly-file').modal('open');
												}, 1000)
												return
											};
											// get value and change to object
											book_obj = ngmClusterImportFile.setExcelValueToArrayofObject(book);
											// map the header to the attribute name
											for(var index=0;index<book_obj.length;index++){
												obj_true ={};
												angular.forEach(book_obj[index],function(value,key){

													atribute_name = attribute_headers_obj[key];
													obj_true[atribute_name] = value;

												})
												obj_true = $scope.project.addMissingAttributeFromFile(obj_true);
												result.push(obj_true);
											}

											var previews = document.querySelectorAll(".dz-preview");
											previews.forEach(function (preview) {
												preview.style.display = 'none';
											})
											document.querySelector(".dz-default.dz-message").style.display = 'none';
											document.querySelector(".percent-upload").style.display = 'block';
											// $scope.answer = result;
											if (result.length > 0) {
												var count_error = 0
												for (var x = 0; x < result.length; x++) {
													var index = $scope.project.report.locations.findIndex(j => ((j.site_implementation_name ? j.site_implementation_name : "") === result[x].site_implementation_name) &&
																									((j.site_type_name ? j.site_type_name : "") === result[x].site_type_name) &&
																									 (j.site_name === result[x].site_name) &&
																									 (j.admin1name === result[x].admin1name) &&
																									 (j.admin2name === result[x].admin2name) &&
																									 (j.admin3name? (j.admin3name === result[x].admin3name): true));
													if (result[x].target_location_reference_id) {
														var index_by_target_location_reference_id = $scope.project.report.locations.findIndex(l => l.target_location_reference_id === result[x].target_location_reference_id);
														index = (index >= index_by_target_location_reference_id) ? index : index_by_target_location_reference_id;
													}

													if (index < 0 || (!result[x].activity_type_id) || (!result[x].activity_description_id) || (!result[x].cluster_id)) {
														if(!$scope.messageFromfile[x]){
															$scope.messageFromfile[x]=[]
														}
														obj = {}
														if(index <0){
															obj= { label: false, property: 'location', reason: '' }
															obj.reason = 'Location not Found : ' + result[x].admin1name + ', ' + result[x].admin2name;
															if (result[x].admin3name) {
																obj.reason += ', ' + result[x].admin3name
															}
															if (result[x].site_name) {
																obj.reason += ', ' + result[x].site_name
															}
															obj.reason += ', ' + result[x].site_implementation_name + ', ' + result[x].site_type_name
															$scope.messageFromfile[x].push(obj)
														}
														if (!result[x].cluster_id) {
															obj = { label: false, property: 'cluster_id', reason: '' }
															obj.reason = result[x].cluster
															$scope.messageFromfile[x].push(obj)
														}
														if (!result[x].activity_type_id){
															obj = { label: false, property: 'activity_type_id', reason: '' }
															obj.reason = result[x].activity_type_name
															$scope.messageFromfile[x].push(obj)
														}
														if (!result[x].activity_description_id){
															obj = { label: false, property: 'activity_description_id', reason: '' }
															obj.reason = result[x].activity_description_name
															$scope.messageFromfile[x].push(obj)
														}
														count_error +=1;
													} else {
														$scope.project.setBeneficiaryFromFile(index, result[x],x);
													}
												}
											}
											$timeout(function () {
													document.querySelector(".percent-upload").style.display = 'none';
													$('#upload-monthly-file').modal('close');
													drop_zone.removeAllFiles(true);
													$scope.project.activePrevReportButton();

													var message_temp ='';

													message_temp = ngmClusterImportFile.setMessageFromFile($scope.messageFromfile, ngmClusterValidation.fieldNameBeneficiaryMonthlyReport(), 'report', 'message-monthly-file')
													if(message_temp !== ''){

														$scope.project.report.messageWarning = message_temp;
														$timeout(function(){
															$('#message-monthly-file').modal({ dismissible: false });
															$('#message-monthly-file').modal('open');
														})

													}
													// perlu diperbaiki
												if (count_error>0 || result.length <1){
														if ((count_error === result.length) || (result.length <1)){
															M.toast({ html: 'Import Fail!', displayLength: 2000, classes: 'error' });
														}else{
															var info = $filter('translate')('save_to_apply_changes');
															M.toast({ html: 'Some Row Succeccfully added !', displayLength: 2000, classes: 'success' });
															M.toast({ html: info, displayLength: 4000, classes: 'note' });
														}

													}else{
														var info = $filter('translate')('save_to_apply_changes');
														M.toast({ html: 'Import File Success!', displayLength: 2000, classes: 'success' });
														M.toast({ html: info, displayLength: 4000, classes: 'note' });
													}
												// reset error message
												$scope.messageFromfile =[];
												$("#upload_file").attr("disabled", true);
												$("#delete_file").attr("disabled", true);
												$("#switch_btn_file").attr("disabled", false);
												}, 2000)

										})
									})
								}
							});

							document.getElementById('delete_file').addEventListener("click", function () {
								drop_zone.removeAllFiles(true);
							});

							// when add file
							drop_zone.on("addedfile", function (file) {

								document.querySelector(".dz-default.dz-message").style.display = 'none';
								var ext = file.name.split('.').pop();
								//change preview if not image/*
									$(file.previewElement).find(".dz-image img").attr("src", "images/elsedoc.png");
									$("#upload_file").attr("disabled", false);
									$("#delete_file").attr("disabled", false);

							});

							// when remove file
							drop_zone.on("removedfile", function (file) {

								if (drop_zone.files.length < 1) {
									// upload_file and delete_file is ID for button upload and cancel
									$("#upload_file").attr("disabled", true);
									$("#delete_file").attr("disabled", true);

									document.querySelector(".dz-default.dz-message").style.display = 'block';
									$('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">publish</i> <br/>` + $filter('translate')('drag_files_here_or_click_button_to_upload') + ' <br/> Please upload file with extention .csv or xlxs !');
								}

								if ((drop_zone.files.length < 2) && (drop_zone.files.length > 0)) {
									document.querySelector(".dz-default.dz-message").style.display = 'none';
									$("#upload_file").attr("disabled", false);
									$("#delete_file").attr("disabled", false);
									document.getElementById("upload_file").style.pointerEvents = "auto";
									document.getElementById("delete_file").style.pointerEvents = "auto";

								}
							});

							drop_zone.on("maxfilesexceeded", function (file) {
								document.querySelector(".dz-default.dz-message").style.display = 'none';
								$('.dz-default.dz-message').html(`<i class="medium material-icons" style="color:#009688;">error_outline</i> <br/>` + 'Please, import just one file at the time and remove exceeded file');
								document.querySelector(".dz-default.dz-message").style.display = 'block'
								// Materialize.toast("Too many file to upload", 6000, "error")
								M.toast({ html: "Too many file to upload", displayLength: 2000, classes: 'error' });
								$("#upload_file").attr("disabled", true);
								document.getElementById("upload_file").style.pointerEvents = "none";
								$("#delete_file").attr("disabled", true);
								document.getElementById("delete_file").style.pointerEvents = "none";
							});

							// reset
							this.on("reset", function () {
								// upload_file and delete_file is ID for button upload and cancel
								document.getElementById("upload_file").style.pointerEvents = 'auto';
								document.getElementById("delete_file").style.pointerEvents = 'auto';
							});
						},

					},
					uploadText:function(){

						document.querySelector("#ngm-input-string").style.display = 'none';
						document.querySelector(".percent-upload").style.display = 'block';
						$("#input_string").attr("disabled", true);
						$("#close_input_string").attr("disabled", true);
						$("#switch_btn_text").attr("disabled", true);
						var attribute_headers_obj = ngmClusterImportFile.listheaderAttributeInFile('monthly_report');
						if ($scope.project.report.text_input){
							csv_array = Papa.parse($scope.project.report.text_input).data;
							if (csv_array[0].indexOf('Activity Type') < 0) {


								$timeout(function () {
									$scope.project.report.messageWarning = 'Incorect Input! \n' + 'Header is Not Found';
									$('#upload-monthly-file').modal('close');
									document.querySelector("#ngm-input-string").style.display = 'block';
									document.querySelector(".percent-upload").style.display = 'none';
									$('#message-monthly-file').modal({ dismissible: false });
									$('#message-monthly-file').modal('open');
									$scope.project.report.text_input = '';
									document.querySelector("#input-string-area").style.display = 'block';
									$scope.inputString = false;
								}, 1000)
								return
							};
							var values = [];
							values_obj = [];
							// get value and change to object
							values_obj = ngmClusterImportFile.setCsvValueToArrayofObject(csv_array);
							// map the header to the attribute name
							for (var index = 0; index < values_obj.length; index++) {
								obj_true = {};
								angular.forEach(values_obj[index], function (value, key) {

									atribute_name = attribute_headers_obj[key];
									obj_true[atribute_name] = value;

								})
								obj_true = $scope.project.addMissingAttributeFromFile(obj_true);
								values.push(obj_true);
							}

							if (values.length > 0) {

								var count_error = 0;
								for (var x = 0; x < values.length; x++) {
									var index = $scope.project.report.locations.findIndex(j => ((j.site_implementation_name ? j.site_implementation_name : "") === values[x].site_implementation_name) &&
									 ((j.site_type_name ? j.site_type_name : "") === values[x].site_type_name) &&
										(j.site_name === values[x].site_name) &&
										(j.admin1name === values[x].admin1name) &&
										(j.admin2name === values[x].admin2name) &&
										(j.admin3name ? (j.admin3name === values[x].admin3name) : true));
									if (values[x].target_location_reference_id) {
										var index_by_target_location_reference_id = $scope.project.report.locations.findIndex(l => l.target_location_reference_id === values[x].target_location_reference_id);										
										index = (index >= index_by_target_location_reference_id)? index : index_by_target_location_reference_id;
									}
									if (index < 0 || (!values[x].activity_type_id) || (!values[x].activity_description_id) || (!values[x].cluster_id)) {
										if (!$scope.messageFromfile[x]) {
											$scope.messageFromfile[x] = []
										}
										obj = {}
										if (index < 0) {
											obj = { label: false, property: 'location', reason: '' }
											obj.reason = 'Location not Found : ' + values[x].admin1name + ', ' + values[x].admin2name;
											if (values[x].admin3name) {
												obj.reason += ', ' + values[x].admin3name
											}
											if (values[x].site_name) {
												obj.reason += ', ' + values[x].site_name
											}
											obj.reason += ', ' + values[x].site_implementation_name + ', ' + values[x].site_type_name

											$scope.messageFromfile[x].push(obj)
										}
										if (!values[x].cluster_id) {
											obj = { label: false, property: 'cluster_id', reason: '' }
											obj.reason = values[x].cluster
											$scope.messageFromfile[x].push(obj)
										}
										if (!values[x].activity_type_id) {
											obj = { label: false, property: 'activity_type_id', reason: '' }
											obj.reason = values[x].activity_type_name
											$scope.messageFromfile[x].push(obj)
										}
										if (!values[x].activity_description_id) {
											obj = { label: false, property: 'activity_description_id', reason: '' }
											obj.reason = values[x].activity_description_name
											$scope.messageFromfile[x].push(obj)
										}
										count_error += 1;

									} else {
										$scope.project.setBeneficiaryFromFile(index, values[x], x);
									}
								}

							}

							var message_temp = '';
							message_temp = ngmClusterImportFile.setMessageFromFile($scope.messageFromfile, ngmClusterValidation.fieldNameBeneficiaryMonthlyReport(), 'report', 'message-monthly-file')
							$timeout(function () {
								document.querySelector("#ngm-input-string").style.display = 'block';
								document.querySelector(".percent-upload").style.display = 'none';
								$('#upload-monthly-file').modal('close');
								$scope.project.report.text_input ='';

								$scope.project.activePrevReportButton();

								if (message_temp !== '') {

									$scope.project.report.messageWarning = message_temp;
									$timeout(function () {
										$('#message-monthly-file').modal({ dismissible: false });
										$('#message-monthly-file').modal('open');
									})

								}
								// need to fix
								if (count_error > 0 || values.length < 1) {
									if ((count_error === values.length) || (values.length < 1)) {
										M.toast({ html: 'Import Fail!', displayLength: 2000, classes: 'error' });
									} else {
										var info = $filter('translate')('save_to_apply_changes');
										M.toast({ html: 'Some Row Succeccfully added !', displayLength: 2000, classes: 'success' });
										M.toast({ html: info, displayLength: 4000, classes: 'note' });
									}

								} else {
									var info = $filter('translate')('save_to_apply_changes');
									M.toast({ html: 'Import File Success!', displayLength: 2000, classes: 'success' });
									M.toast({ html: info, displayLength: 4000, classes: 'note' });
								}


								document.querySelector("#input-string-area").style.display = 'block';
								$("#close_input_string").attr("disabled", false);
								$("#input_string").attr("disabled", false);
								$("#switch_btn_text").attr("disabled", false);
								$scope.inputString = false;
							}, 2000)



						}else{
							$timeout(function(){
								document.querySelector("#ngm-input-string").style.display = 'block';
								document.querySelector(".percent-upload").style.display = 'none';
								$("#close_input_string").attr("disabled", false);
								$("#input_string").attr("disabled", false);
								$("#switch_btn_text").attr("disabled", false);
								M.toast({ html: 'Please Type something!', displayLength: 2000, classes: 'success' });
							},2000)

						}
						// reset error message
						$scope.messageFromfile = [];
					}

				},
				addMissingAttributeFromFile: function (obj) {
					// cluster
					if(obj.cluster){
						selected_cluster = $filter('filter')($scope.project.lists.clusters, { cluster: obj.cluster }, true)
						if (obj.cluster === 'MPC' && !selected_cluster.length) { obj.cluster_id = 'cvwg' };
						if (selected_cluster.length){
							obj.cluster_id = selected_cluster[0].cluster_id;
						}
					}

					// activity
					if (obj.activity_type_name){
						selected_act = $filter('filter')($scope.project.definition.activity_type, { activity_type_name: obj.activity_type_name }, true);
						if(selected_act.length){
							obj.activity_type_id = selected_act[0].activity_type_id;
						}
					}
					// activity description
					if (obj.activity_description_name){
						selected_desc = $filter('filter')($scope.project.lists.activity_descriptions, {
							cluster_id: obj.cluster_id,
							activity_description_name: obj.activity_description_name,
							activity_type_id: obj.activity_type_id
						}, true);
						if (selected_desc.length){
							obj.activity_description_id = selected_desc[0].activity_description_id;
						}
					}
					// activity_detail
					if (obj.activity_detail_name){
						selected_activity_detail = $filter('filter')($scope.project.lists.activity_details,{
							cluster_id: obj.cluster_id,
							activity_type_id: obj.activity_type_id,
							activity_description_id: obj.activity_description_id,
							activity_detail_name: obj.activity_detail_name
						},true);
						if (selected_activity_detail.length){
							obj.activity_detail_id = selected_activity_detail[0].activity_detail_id
							obj.display_activity_detail =true;
						}
					}
					// indicator
					if (obj.indicator_name){
						selected_indicator = $filter('filter')($scope.project.lists.activity_indicators, { indicator_name: obj.indicator_name }, true);
						if (selected_indicator.length){
							obj.indicator_id = selected_indicator[0].indicator_id;
							obj.display_indicator = true;
						}
					}

					// beneficiary_type_name
					if (obj.beneficiary_type_name){
						selected_beneficiary = $filter('filter')($scope.project.lists.beneficiary_types, { beneficiary_type_name: obj.beneficiary_type_name, cluster_id: obj.cluster_id}, true);
						if (selected_beneficiary.length) {
							obj.beneficiary_type_id = selected_beneficiary[0].beneficiary_type_id;
						}
					}

					// beneficiary_category_id
					if (obj.beneficiary_category_name){
						selected_beneficiary_category = $filter('filter')($scope.project.lists.beneficiary_categories, { beneficiary_category_name: obj.beneficiary_category_name })
						if (selected_beneficiary_category.length){
							obj.beneficiary_category_id = selected_beneficiary_category[0].beneficiary_category_id;
						}
					}

					// delivery type
					if (obj.delivery_type_name){
						selected_delivery = $filter('filter')($scope.project.lists.delivery_types, { delivery_type_name: obj.delivery_type_name }, true)
						if (selected_delivery.length) {
							obj.delivery_type_id = selected_delivery[0].delivery_type_id
						}
					}
					// hrp beneficiary
					if (obj.hrp_beneficiary_type_name){
						selected_hrp = $filter('filter')($scope.project.lists.hrp_beneficiary_types, { hrp_beneficiary_type_name: obj.hrp_beneficiary_type_name }, true)
						if (selected_hrp.length) {
							obj.hrp_beneficiary_type_id = selected_hrp[0].hrp_beneficiary_type_id;
						}
					}
					// site_type
					if (obj.site_type_name){
						selected_site = $filter('filter')($scope.project.lists.site_type, { site_type_name: obj.site_type_name }, true)
						if (selected_site.length) {
							obj.site_type_id = selected_site[0].site_type_id
						}
					}
					if (obj.site_implementation_name) {
						selected_site_implementation = $filter('filter')($scope.project.lists.site_implementation, { site_implementation_name: obj.site_implementation_name }, true);
						if (selected_site_implementation[0]){
							obj.site_implementation_id = selected_site_implementation[0].site_implementation_id;
						}
					}


					// transfer value
					if (obj.transfer_type_value) {
						selected_transfer = $filter('filter')($scope.project.lists.transfers, { transfer_type_value: obj.transfer_type_value }, true)

						if (selected_transfer.length){
							obj.transfer_type_id = selected_transfer[0].transfer_type_id;
						}
					}

					if (obj.package_type_name){
						var package_list = [{
							'package_type_id': 'standard',
							'package_type_name': 'Standard'
						}, {
							'package_type_id': 'non-standard',
							'package_type_name': 'Non-standard'
						}];
						selected_package = $filter('filter')(package_list, { package_type_name: obj.package_type_name},true);
						if (selected_package.length){
							obj.package_type_id = selected_package[0].package_type_id;
						}
					}
					return obj

				},
				switchInputFile: function () {
					$scope.inputString = !$scope.inputString;
					$scope.project.report.messageWarning ='';
				},

				addLocationGroupingsforNewLocation: function () {
					// function to save Location
					var saveLocation = function(){
						// update project details of report + locations + beneficiaries
						$scope.project.report =
							ngmClusterHelper.getCleanReport($scope.project.definition, $scope.project.report);



						// msg
						// Materialize.toast( $filter('translate')('processing_report') , 6000, 'note');
						M.toast({ html: "Adding Location", displayLength: 6000, classes: 'note' });

						// setReportRequest
						var setReportRequest = {
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/cluster/report/setReport',
							data: { email_alert: false, report: $scope.project.report }
						}

						// set report
						$http(setReportRequest).then(function (report) {
							$scope.project.report = report.data;
						})
					};

					// function to add new Group
					var saveNewGroup = function(){
						$http({
							method: 'POST',
							url: ngmAuth.LOCATION + '/api/cluster/project/setProject',
							data: { project: $scope.project.definition }
						}).then(function (project) {
							// add id to client json
							M.toast({ html: "Please Wait ... we will redirect you to Group,</br> Because New Location not Match with this Group ", displayLength: 6000, classes: 'note' });
							$scope.project.definition = angular.merge($scope.project.definition, project.data);
							var path = '/cluster/projects/group/' + $scope.project.definition.id + '/' + $scope.project.report.id;
							$location.path(path)
						})
					};

					if ($scope.project.definition.location_grouping_by) {
						var newGroupCount = 0;
						if ($scope.project.definition.location_grouping_by === 'admin1pcode') {
							angular.forEach($scope.project.report.locations, function (location, i) {
								// location group
								if (!location.id) {
									location.location_group_id = location.admin1pcode;
									location.location_group_type = location.admin1type_name;
									location.location_group_name = location.admin1name;
									// location.beneficiaries =[];

									if ($scope.project.definition.location_groups.findIndex(group => group.location_group_id === location.admin1pcode) < 0) {

										var new_group = {
											location_group_id: location.admin1pcode,
											location_group_type: location.admin1type_name,
											location_group_name: location.admin1name
										}
										newGroupCount += 1
										$scope.project.definition.location_groups.push(new_group);
									}
								}

							});
							// saveLocation();


						} else if ($scope.project.definition.location_grouping_by === 'admin2pcode') {

							angular.forEach($scope.project.report.locations, function (location, i) {
								// location group
								if (!location.id) {
									location.location_group_id = location.admin2pcode;
									location.location_group_type = location.admin2type_name;
									location.location_group_name = location.admin2name;
									// location.beneficiaries = [];

									if ($scope.project.definition.location_groups.findIndex(group => group.location_group_id === location.admin2pcode) < 0) {
										var new_group = {
											location_group_id: location.admin2pcode,
											location_group_type: location.admin2type_name,
											location_group_name: location.admin2name
										}
										newGroupCount += 1
										$scope.project.definition.location_groups.push(new_group);
									}
								}
							});

							// saveLocation();

						} else {
							// show modal
							angular.forEach($scope.project.report.locations, function (location, i) {
								// location group
								if (!location.id) {
									// location group
									location.location_group_id = 'default_custom_group_' + $scope.project.user.username;
									location.location_group_type = 'Custom';
									location.location_group_name = 'Default Custom';
									// location.beneficiaries = []; 
								}
							});

							// saveLocation();

						}

						if (newGroupCount > 0) {
							saveNewGroup();
						}


					}
				},

				validateAddNewLocation:function(){
					var result = ngmClusterValidation.validateAddNewLocationMonthlyReport(ngmClusterLocations.new_location)
					if (result.complete){
						ngmClusterLocations.addNewLocation($scope.project, ngmClusterLocations.new_location);
						// $scope.project.incrementLocationLimitByOneAutoSelect()

						$scope.project.addLocationGroupingsforNewLocation()
						// add to paginated location
						var lengthLocation = $scope.project.report.locations.length
						$scope.paginated_monthly_locations.push($scope.project.report.locations[lengthLocation-1]);
						// updated $scope.endMonthly location
						$scope.endMonthlyLocation = $scope.project.updatePaginatedPageCount($scope.endMonthlyLocation, $scope.project.report.locations, $scope.countMonthlyLocation);
						// if ($scope.endMonthlyLocation === $scope.project.report.locations.length) {
						// 	$scope.endMonthlyLocation += $scope.countMonthlyLocation;
						// }
						$scope.detailBeneficiaries[lengthLocation-1] = [];
						$scope.detailBeneficiaries[lengthLocation-1][0] = true;
					}else{
						var elements = result.divs
						// $(elements[0]).animatescroll();
						$(elements[0]).scrollHere();
					};

				},
				addMoreMonthlyLocation: function () {
					if ($scope.paginated_monthly_locations.length < $scope.project.report.locations.length){
						$scope.startMonthlyLocation = $scope.endMonthlyLocation;
						$scope.endMonthlyLocation += $scope.countMonthlyLocation;
						var paginated = $scope.project.report.locations.slice($scope.startMonthlyLocation, $scope.endMonthlyLocation);
						paginated.forEach(function (loc, index) {
							$scope.paginated_monthly_locations.push(loc);
						});
					}
					// Control loading notification
					$scope.isLoadingMonthlyLocation = $scope.endMonthlyLocation >= $scope.project.report.locations.length - 1 ? false : true;
				},
				updatePaginatedPageCount: function (end, original_array, count) {
					// end => $scope.end, $scope.end_beneficiaries
					// original array is array that paginated =>$scope.project.definition.target_locations,$scope.project.definition.target_beneficiaries
					// count => $scope.count, $scope.count_beneficiaries
					if (end === original_array.length) {

						end += count
					}
					return end;
				},
				// save
				save: function( complete, display_modal, email_alert ){
					$scope.project.isSaving = true;
					// set labels to active (green)
					$( 'label' ).removeClass( 'invalid' ).addClass( 'active' );
					$( 'input' ).removeClass( 'invalid' ).addClass( 'active' );
					// if textarea
					$( 'textarea[name="notes"]' ).removeClass( 'invalid' ).addClass( 'active' );

					// report
					// $scope.project.report.submit = true;
					$scope.project.report.report_status = complete ? 'complete' : 'todo';
					$scope.project.report.report_submitted = moment().toISOString();//moment().format();
					// set validation to null after click button edit report
					if(!complete){
						if ($scope.project.report.report_validation){
							$scope.project.report.report_validation = null;
						}
					}
					// update project details of report + locations + beneficiaries
					$scope.project.report =
							ngmClusterHelper.getCleanReport( $scope.project.definition, $scope.project.report );



					// msg
					// Materialize.toast( $filter('translate')('processing_report') , 6000, 'note');
					M.toast({ html: $filter('translate')('processing_report'), displayLength: 6000, classes: 'note' });

					// setReportRequest
					var setReportRequest = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/report/setReport',
						data: { email_alert: email_alert, report: $scope.project.report }
					}

					// set report
					$http( setReportRequest ).then( function( report ){

						if ( report.data.err ) {
							// update
							$scope.project.isSaving = false;
							M.toast({ html: 'Error! ' + $filter('translate')('please_correct_the_row_and_try_again'), displayLength: 6000, classes: 'error' });
						}

						if ( !report.data.err ) {

							// updated report
							$scope.project.report = report.data;
							$scope.project.report.submit = false;

							// sort locations
							$scope.project.report.locations = $filter('orderBy')( $scope.project.report.locations, [ 'site_type_name','admin1name','admin2name','admin3name','admin4name','admin5name','site_name' ]);
							$scope.paginated_monthly_locations = $scope.project.report.locations;

							$scope.project.isSaving = false;

							// user msg
							var msg = $filter('translate')('project_report_for')+'  ' + moment.utc( $scope.project.report.reporting_period ).format('MMMM, YYYY') + ' ';
									msg += complete ? $filter('translate')('submitted')+'!' : $filter('translate')('saved_mayus1')+'!';

							// msg
							$timeout(function() {
								// Materialize.toast( msg , 6000, 'success');
								M.toast({ html: msg, displayLength: 6000, classes: 'success' });
							}, 400 );

							// set trigger
							// $('.modal-trigger').leanModal();
							$('.modal-trigger').modal();

							// Re-direct to summary
							if ( $scope.project.report.report_status !== 'complete' ) {

								// notification modal
								if( display_modal ){
									$timeout(function() {
										if ( $scope.project.location_group ) {
											$location.path( '/cluster/projects/group/' + $scope.project.definition.id + '/' + $scope.project.report.id );
										} else {
											$location.path( '/cluster/projects/report/' + $scope.project.definition.id );
										}
									}, 400);
								} else {
									// reset when edit saved report
									ngmClusterBeneficiaries.setLocationsForm( $scope.project.lists, $scope.project.report.locations );
								}

							} else {
								$timeout(function() {
									if ( $scope.project.location_group ) {
										$location.path( '/cluster/projects/group/' + $scope.project.definition.id + '/' + $scope.project.report.id );
									} else {
										$location.path( '/cluster/projects/report/' + $scope.project.definition.id );
									}
								}, 400);
							}
						}
					}).catch(function( err ) {
						// update
						$scope.project.isSaving = false;
						M.toast({ html: 'Error', displayLength: 6000, classes: 'error' });
					});;

				}

			}

			// init project
			$scope.project.init();
			$scope.project.activePrevReportButton();
			$scope.project.getDocument();
			// update list  if there are upload file or remove file
			$scope.$on('refresh:listUpload', function () {
				$scope.project.getDocument();
			})


	}

]);
