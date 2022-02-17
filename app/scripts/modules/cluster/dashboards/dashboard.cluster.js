/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:DashboardClusterCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('DashboardClusterCtrl', [
			'$scope',
			'$q',
			'$http',
			'$location',
			'$route',
			'$rootScope',
			'$window',
			'$timeout',
			'$filter',
			'ngmUser',
			'ngmAuth',
			'ngmData',
			'ngmClusterHelper',
			'ngmClusterLists',
			'ngmLists',
			'$translate',
		function ( $scope, $q, $http, $location, $route, $rootScope, $window, $timeout, $filter, ngmUser, ngmAuth, ngmData, ngmClusterHelper, ngmClusterLists, ngmLists, $translate ) {
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

				// when 'hq'
				pageLoadTime: 18900,

				// report start
				startDate: moment( $route.current.params.start ) .format( 'YYYY-MM-DD' ),

				// report end
				endDate: moment( $route.current.params.end ).format( 'YYYY-MM-DD' ),

				// last update
				updatedAt: '',

				// current report
				report: $location.$$path.replace(/\//g, '_') + '-extracted-',

				// lists
				lists: {
					clusters: ngmClusterLists.getClusters( $route.current.params.admin0pcode ).filter(cluster=>cluster.filter!==false),
					admin1: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin1List : [],
					admin2: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin2List : [],
					admin3: ngmLists.getObject( 'lists' ) ? ngmLists.getObject( 'lists' ).admin3List : []
				},

				// filtered data
				data: {
					cluster: false,
					admin1: false,
					admin2: false,
					admin3: false
				},

				menu_items: ngmAuth.getMenuParams('DASHBOARD'),

				menu: [{
					'search': true,
					'id': 'search-region',
					'icon': 'person_pin',
					'title': $filter('translate')('region'),
					'class': 'teal lighten-1 white-text',
					'rows': [{
						'title': 'HQ',
						'param': 'adminRpcode',
						'active': 'hq',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/hq/all'
					},{
						'title': 'AFRO',
						'param': 'adminRpcode',
						'active': 'afro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/afro/all'
					},{
						'title': 'AMER',
						'param': 'adminRpcode',
						'active': 'amer',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/amer/all'
					},{
						'title': 'EMRO',
						'param': 'adminRpcode',
						'active': 'emro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/emro/all'
					},{
						'title': 'SEARO',
						'param': 'adminRpcode',
						'active': 'searo',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/searo/all'
					},{
						'title': 'WPRO',
						'param': 'adminRpcode',
						'active': 'wpro',
						'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						'href': '/desk/#/cluster/5w/wpro/all'
					}
					]
				}],

				// admin
				// getPath: function (cluster_id, activity_type_id, activity_description_id, organization_tag, admin1pcode, admin2pcode, hrp, project_detail,response ){
				// getPath: function (cluster_id, activity_type_id, activity_description_id, organization_tag, admin1pcode, admin2pcode, hrp,report_type_id ){
				getPath: function (cluster_id, activity_type_id, activity_description_id, organization_tag, admin1pcode, admin2pcode, hrp, project_detail, response, report_type_id) {

					if ( cluster_id !== 'rnr_chapter' ) {
						var path = '/cluster/5w/' + $scope.dashboard.adminRpcode +
																	'/' + $scope.dashboard.admin0pcode +
																	'/' + admin1pcode +
																	'/' + admin2pcode +
																	'/' + cluster_id +
																	'/' + activity_type_id +
																	'/' + activity_description_id +
																	'/' + organization_tag +
																	'/' + $scope.dashboard.beneficiaries.join('+') +
																	'/' + $scope.dashboard.startDate +
																	'/' + $scope.dashboard.endDate +
																	// '/' + hrp +
																	// '/' + project_detail +
																	// '/' + response;
																	// '/' + hrp+'/'+report_type_id;
																	'/' + hrp +
																	'/' + project_detail +
																	'/' + response+'/'+report_type_id;
					} else {
						var path = '/cluster/5w/' + $scope.dashboard.adminRpcode +
																	'/' + $scope.dashboard.admin0pcode +
																	'/' + admin1pcode +
																	'/' + admin2pcode +
																	'/' + cluster_id +
																	'/' + activity_type_id +
																	'/' + activity_description_id +
																	'/' + organization_tag +
																	'/returnee_undocumented+returnee_documented+refugee_pakistani' +
																	'/' + $scope.dashboard.startDate +
																	'/' + $scope.dashboard.endDate+
																	// '/' + hrp +
																	// '/' + project_detail +
																	// '/' + response;
																	// '/' + hrp+'/'+report_type_id;
																	'/' + hrp +
																	'/' + project_detail +
																	'/' + response+'/'+report_type_id;
					}

					return path;
				},
				getPathWithDate: function (cluster_id, activity_type_id, activity_description_id, organization_tag, admin1pcode, admin2pcode, hrp,start_date,end_date) {

					if (cluster_id !== 'rnr_chapter') {
						var path = '/cluster/5w/' + $scope.dashboard.adminRpcode +
							'/' + $scope.dashboard.admin0pcode +
							'/' + admin1pcode +
							'/' + admin2pcode +
							'/' + cluster_id +
							'/' + activity_type_id +
							'/' + activity_description_id +
							'/' + organization_tag +
							'/' + $scope.dashboard.beneficiaries.join('+') +
							'/' + start_date +
							'/' + end_date +
							'/' + hrp;
					} else {
						var path = '/cluster/5w/' + $scope.dashboard.adminRpcode +
							'/' + $scope.dashboard.admin0pcode +
							'/' + admin1pcode +
							'/' + admin2pcode +
							'/' + cluster_id +
							'/' + activity_type_id +
							'/' + activity_description_id +
							'/' + organization_tag +
							'/returnee_undocumented+returnee_documented+refugee_pakistani' +
							'/' + start_date +
							'/' + end_date +
							'/' + hrp;
					}

					return path;
				},

        // set URL based on user rights
				setUrl: function(){

					// get url
					// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail,$scope.dashboard.response );
					var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, $scope.dashboard.response, $scope.dashboard.report_type_id );

					// if current location is not equal to path
					if ( path !== $location.$$path ) {
						$location.path( path );
					}

				},

				//
				getRequest: function( obj ){
					var request = {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/cluster/indicator',
						data: {
							adminRpcode: $scope.dashboard.adminRpcode,
							admin0pcode: $scope.dashboard.admin0pcode,
							admin1pcode: $scope.dashboard.admin1pcode,
							admin2pcode: $scope.dashboard.admin2pcode,
							cluster_id: $scope.dashboard.cluster_id,
							activity_type_id: $scope.dashboard.activity_type_id,
							activity_description_id: $scope.dashboard.activity_description_id,
							organization_tag: $scope.dashboard.organization_tag,
							beneficiaries: $scope.dashboard.beneficiaries,
							start_date: $scope.dashboard.startDate,
							end_date: $scope.dashboard.endDate,
							hrp: $scope.dashboard.hrp,
							hide_contact: $scope.dashboard.hide_contact_for_download,
							project_detail: $scope.dashboard.project_detail,
							response: $scope.dashboard.response,
							report_type_id: $scope.dashboard.report_type_id,
							hide_contact: $scope.dashboard.hide_contact_for_download
						}
					}

					request.data = angular.merge(request.data, obj);
					return request;
				},

				// metrics
				getMetrics: function( theme, format ){
					return {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/metrics/set',
						data: {
							organization: $scope.dashboard.user.organization,
							username: $scope.dashboard.user.username,
							email: $scope.dashboard.user.email,
							dashboard: 'cluster_dashboard',
							theme: theme,
							format: format,
							url: $location.$$path
						}
					}
				},

				// downloads
				getDownloads: function(){
					var _type = '';
					if ($scope.dashboard.report_type_id !== 'all') {
						_type = '-'+$scope.dashboard.report_type_id;
						
					}
					
					var downloads = [
					// {
					// 	id: 'cluster_dashboard_pdf',
					// 	type: 'pdf',
					// 	color: 'blue',
					// 	icon: 'picture_as_pdf',
					// 	hover: $filter('translate')('download_dashboard_as_pdf'),
					// 	request: {
					// 		method: 'POST',
					// 		url: ngmAuth.LOCATION + '/api/print',
					// 		data: {
					// 			report:  $scope.dashboard.cluster_id + '_cluster_dashboard-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ),
					// 			printUrl: $location.absUrl(),
					// 			downloadUrl: ngmAuth.LOCATION + '/report/',
					// 			user: $scope.dashboard.user,
					// 		}
					// 	},
					// 	metrics: $scope.dashboard.getMetrics( 'cluster_dashboard_pdf', 'pdf' )
					// },
					{
						id:'cluster_contact_list',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'call',
						hover: $filter('translate')('download_cluster_contact_list_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'contacts', report: $scope.dashboard.cluster_id_filename + '_contacts_list-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_contact_list', 'csv' )
					},{
						id:'download_ocha_hrp_report_as_csv',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'assignment_turned_in',
						not_show:['COL','ET','NG', 'CB'],
						hover: $filter('translate')('download_ocha_hrp_report_as_csv'),
							request: $scope.dashboard.getRequest({ csv: true, indicator: 'ocha_report', report: $scope.dashboard.cluster_id_filename + '_ocha_hrp' + _type + '_report-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_ocha_report', 'csv' )
					},{
						id:'download_ocha_financial_report_as_csv',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'attach_money',
						not_show:['CB','ET'],
						hover: $filter('translate')('download_ocha_financial_report_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'financial_report', report: $scope.dashboard.cluster_id_filename + '_ocha_financial_report-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cluster_financial_report', 'csv' )
					},{
						id:'download_beneficiary_data_as_csv',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'group',
						hover: $filter('translate')('download_beneficiary_data_as_csv'),
							request: $scope.dashboard.getRequest({ csv: true, indicator: 'beneficiaries', report: $scope.dashboard.activity_filename + $scope.dashboard.cluster_id_filename + '_beneficiary_data' + _type + '-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') } ),
						metrics: $scope.dashboard.getMetrics( 'beneficiary_data', 'csv' )
					},{
						id:'download_sector_iscg_as_excel',
						type: 'pdf',
						color: 'teal darken-3',
						icon: 'library_books',
						not_show:[ 'ALL','HQ','AF','COL','ET','NG','SO' ],
						hover: $filter('translate')('download_sector_iscg_as_excel'),
						request: $scope.dashboard.getRequest( { indicator: 'sector_iscg_excel', downloadUrl: ngmAuth.LOCATION + '/report/', report: '-' + $scope.dashboard.cluster_id + '-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'sector_iscg_excel', 'excel' )
					},{
						id: 'download_stock_data_as_csv',
						type: 'csv',
						color: 'blue lighten-2',
						icon: 'show_chart',
						not_show:['CB','COL','ET','NG'],
						hover: $filter('translate')('download_stock_data_as_csv'),
							request: $scope.dashboard.getRequest({ csv: true, indicator: 'stocks', report: $scope.dashboard.cluster_id_filename + '_stock_data' + _type + '-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format('YYYY-MM-DDTHHmm') } ),
						metrics: $scope.dashboard.getMetrics( 'stocks', 'csv' )
					}];

					// ng wash dls
					var ng_wash_dl = [{
						id: 'download_accountability_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'compare_arrows',
						hover: $filter('translate')('download_accountability_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'accountability', report: $scope.dashboard.activity_filename + $scope.dashboard.cluster_id_filename + '_accountability_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'accountability_data', 'csv' )
					},{
						id: 'download_borehol_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'radio_button_checked',
						hover: $filter('translate')('download_borehol_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'boreholes', report: $scope.dashboard.cluster_id_filename + '_boreholes_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'borehole_data', 'csv' )
					},{
						id: 'download_cash_programming_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'local_activity',
						hover: $filter('translate')('download_cash_programming_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'cash', report: $scope.dashboard.cluster_id_filename + '_cash_programming-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'cash_programming', 'csv' )
					},{
						id: 'download_hygiene_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'spa',
						hover: $filter('translate')('download_hygiene_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'hygiene', report: $scope.dashboard.cluster_id_filename + '_hygiene_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'hygiene_data', 'csv' )
					},{
						id: 'download_sanitarian_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'wc',
						hover: $filter('translate')('download_sanitarian_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'sanitation', report: $scope.dashboard.cluster_id_filename + '_sanitation_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'sanitation_data', 'csv' )
					},{
						id: 'download_water_data_as_csv',
						type: 'csv',
						color: 'teal lighten-3',
						icon: 'local_drink',
						hover: $filter('translate')('download_water_data_as_csv'),
						request: $scope.dashboard.getRequest( { csv: true, indicator: 'water', report: $scope.dashboard.cluster_id_filename + '_water_data-extracted-from-' + $scope.dashboard.startDate + '-to-' + $scope.dashboard.endDate + '-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' ) } ),
						metrics: $scope.dashboard.getMetrics( 'water_data', 'csv' )
					}];

					// NG, wash and Admin
					if ( $scope.dashboard.admin0pcode === 'ng' &&
								$scope.dashboard.cluster_id === 'wash' &&
							(	$scope.dashboard.user.roles.indexOf( 'ADMIN' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'COUNTRY_ADMIN' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'CLUSTER' ) !== -1 ||
								$scope.dashboard.user.roles.indexOf( 'SUPERADMIN' ) !== -1
							)
						) {
						downloads = downloads.concat ( ng_wash_dl );
					}

					// blocking download
					const canDownload = ngmAuth.canDo( 'DASHBOARD_DOWNLOAD', {
															adminRpcode: $scope.dashboard.adminRpcode ? $scope.dashboard.adminRpcode.toUpperCase():'',
															admin0pcode: $scope.dashboard.admin0pcode ? $scope.dashboard.admin0pcode.toUpperCase():'',
															cluster_id: $scope.dashboard.cluster_id,
															organization_tag: $scope.dashboard.organization_tag } )
					// filter downloads list
					if (!canDownload){
						downloads = downloads.filter(x => x.id === 'cluster_dashboard_pdf')
					}
					// remove download that not relate to country
					angular.forEach(downloads,function(d,i){
						if (d.not_show && (d.not_show.indexOf($scope.dashboard.admin0pcode.toUpperCase()) > -1)){
							downloads.splice(i,1);
						}
					})
					
					if ($scope.dashboard.hide_contact_for_download){
						downloads = downloads.filter(x => x.id !== 'cluster_contact_list')
					}
					// hide stock data when $scope.dashboard.report_type_id or $route.current.params.report_type_id is bi-weekly
					if ($scope.dashboard.report_type_id === 'bi-weekly'){
						downloads = downloads.filter(x => x.id !== 'download_stock_data_as_csv')
					}
					return downloads;
				},

				//
				setMenu: function(){

					// rows
					var orgRows = [],
							clusterRows = [],
							provinceRows = [],
							districtRows = [],
							activityRows =[]
							actDescriptionRows=[];
							request = $scope.dashboard.getRequest( { list: true, indicator: 'organizations' } );
							requestAct = $scope.dashboard.getRequest( { list: true, indicator: 'activities' } );

					if ($scope.dashboard.menu_items.includes('adminRpcode')){
						$scope.model.menu = $scope.dashboard.menu;
					}

					if ($scope.dashboard.menu_items.includes('admin0pcode')){
						if ( $scope.dashboard.adminRpcode !== 'hq' ) {

							var menu = {
								'afro': {
									'search': true,
									'id': 'search-afro',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Democratic Republic of Congo',
										'param': 'admin0pcode',
										'active': 'cd',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/afro/cd'
									},{
										'title': 'Ethiopia',
										'param': 'admin0pcode',
										'active': 'et',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/afro/et'
									},{
										'title': 'Nigeria',
										'param': 'admin0pcode',
										'active': 'ng',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/afro/ng'
									},{
										'title': 'South Sudan',
										'param': 'admin0pcode',
										'active': 'ss',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/afro/ss'
									}]
								},
								'emro': {
									'search': true,
									'id': 'search-emro',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Afghanistan',
										'param': 'admin0pcode',
										'active': 'af',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/emro/af'
									},{
										'title': 'Iraq',
										'param': 'admin0pcode',
										'active': 'iq',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/emro/iq'
									},{
										'title': 'Somalia',
										'param': 'admin0pcode',
										'active': 'so',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/emro/so'
									},{
										'title': 'Syria',
										'param': 'admin0pcode',
										'active': 'sy',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/emro/sy'
									},{
										'title': 'Yemen',
										'param': 'admin0pcode',
										'active': 'ye',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/emro/ye'
									}]
								},
								'searo': {
									'search': true,
									'id': 'search-searo',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),
									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Bangladesh',
										'param': 'admin0pcode',
										'active': 'bd',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/searo/bd'
									},{
										'title': 'Cox Bazar',
										'param': 'admin0pcode',
										'active': 'cb',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/searo/cb'
									}]
								},
								'amer': {
									'search': true,
									'id': 'search-amer',
									'icon': 'person_pin',
									'title': $filter('translate')('country'),

									'class': 'teal lighten-1 white-text',
									'rows': [{
										'title': 'Colombia',
										'param': 'admin0pcode',
										'active': 'col',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/amer/col'
									}]
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
										'href': '/desk/#/cluster/5w/wpro/pg'
									},{
										'title': 'Philippines',
										'param': 'admin0pcode',
										'active': 'phl',
										'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
										'href': '/desk/#/cluster/5w/wpro/phl'
									}]
								}
							}
							$scope.model.menu.push(menu[$scope.dashboard.adminRpcode]);
						}
					}

					// get orgs
					ngmData.get( request ).then( function( organizations  ){

						// set organization
						if ( $scope.dashboard.organization_tag !== 'all' ) {
							var org = $filter( 'filter' )( organizations, { organization_tag: $scope.dashboard.organization_tag } );
							if ( org.length ) {
								$scope.dashboard.organization = org[0].organization;
								$scope.dashboard.setTitle();
								$scope.dashboard.setSubtitle();
							}
						}

						// clusters
						$scope.dashboard.lists.clusters.unshift({ cluster_id: 'all', cluster: 'ALL' });
						angular.forEach( $scope.dashboard.lists.clusters, function(d,i){
							// var path = $scope.dashboard.getPath(d.cluster_id, 'all', 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all','all');
							// var path = $scope.dashboard.getPath(d.cluster_id, 'all', 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.report_type_id);
							var path = $scope.dashboard.getPath(d.cluster_id, 'all', 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all', 'all', $scope.dashboard.report_type_id);
							clusterRows.push({
								'title': d.cluster,
								'param': 'cluster_id',
								'active': d.cluster_id,
								'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
								'href': '/desk/#' + path
							});
						});

						// add to menu
						$scope.model.menu.push({
							'search': true,
							'id': 'search-cluster-cluster',
							'icon': 'camera',
							'title': $filter('translate')('cluster'),
							'class': 'teal lighten-1 white-text',
							'rows': clusterRows
						});

						// activity menu
						// if ( $scope.dashboard.cluster_id === 'protection' ) {

						// 	$scope.model.menu.push({
						// 		'search': false,
						// 		'id': 'search-cluster-activity',
						// 		'icon': 'assignment_turned_in',
						// 		'title': $filter('translate')('activity'),
						// 		'class': 'teal lighten-1 white-text',
						// 		'rows': [{
						// 			'title': $filter('translate')('all_mayus'),
						// 			'param': 'activity_type_id',
						// 			'active': 'all',
						// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 			'href': '/desk/#' + $scope.dashboard.getPath( $scope.dashboard.cluster_id, 'all',$scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode )
						// 		},{
						// 			'title': 'CPiE',
						// 			'param': 'activity_type_id',
						// 			'active': 'cpie',
						// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 			'href': '/desk/#' + $scope.dashboard.getPath( $scope.dashboard.cluster_id, 'cpie',$scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode )
						// 		},{
						// 			'title': 'GBV',
						// 			'param': 'activity_type_id',
						// 			'active': 'gbv',
						// 			'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
						// 			'href': '/desk/#' + $scope.dashboard.getPath( $scope.dashboard.cluster_id, 'gbv',$scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode )
						// 		}]
						// 	});
						// }
						if ($scope.dashboard.cluster_id !== 'all') {
							// get activiy type name
								ngmData.get(requestAct).then(function (act) {
									act.unshift({
										activity_type_name: 'ALL',
										activity_type_id: 'all',
									});
									angular.forEach(act, function (a, i) {
										
										// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, a.activity_type_id, 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, $scope.dashboard.response);
										// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, a.activity_type_id, 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.report_type_id);
										var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, a.activity_type_id, 'all', $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, $scope.dashboard.response, $scope.dashboard.report_type_id);
										
										if(activityRows.findIndex(x => x.active === a.activity_type_id)<0){
											activityRows.push({
												'title': a.activity_type_name,
												'param': 'activity_type_id',
												'active': a.activity_type_id,
												'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
												'href': '/desk/#' + path
											});
										}
									});

									$scope.model.menu.push({
										'search': true,
										'id': 'search-act-name',
										'icon': 'assignment_turned_in',
										'title': 'Activity',
										'class': 'teal lighten-1 white-text',
										'rows': activityRows
									});
									if ($scope.dashboard.activity_type_id !== 'all') {
										var act_descr = $filter('filter')(act, { activity_type_id: $scope.dashboard.activity_type_id });
										act_descr.unshift({
											activity_description_name: 'ALL',
											activity_description_id: 'all',
										});
										angular.forEach(act_descr, function (a, i) {
											// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, a.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, $scope.dashboard.response);
											// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, a.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.report_type_id);
											var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, a.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, $scope.dashboard.response, $scope.dashboard.report_type_id);
											actDescriptionRows.push({
												'title': a.activity_description_name,
												'param': 'activity_description_id',
												'active': a.activity_description_name,
												'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
												'href': '/desk/#' + path
											});
										});
										$scope.model.menu.push({
											'search': true,
											'id': 'search-act-desct-name',
											'icon': 'text_fields',
											'title': 'Activity Description',
											'class': 'teal lighten-1 white-text',
											'rows': actDescriptionRows
										});
									}
								})
						};

						// organizations
						organizations.forEach(function( d, i ){
							if ( d ) {
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, d.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all','all' );
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, d.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.report_type_id );
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, d.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all', 'all', $scope.dashboard.report_type_id);
								orgRows.push({
									'title': d.organization,
									'param': 'organization_tag',
									'active': d.organization_tag,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								});
							}
						});

						// organization & disable if public
						if ($scope.dashboard.menu_items.includes('organization_tag') && $scope.dashboard.user.username !== 'welcome') {

							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-organization',
								'icon': 'supervisor_account',
								'title': $filter('translate')('organization'),
								'class': 'teal lighten-1 white-text',
								'rows': orgRows
							});

					    }
						// if country selected
						if ( $scope.dashboard.admin0pcode !== 'all' ) {

							// admin1
							var admin1List = $filter( 'filter' )( $scope.dashboard.lists.admin1, { admin0pcode: $scope.dashboard.admin0pcode.toUpperCase() }, true );
							// add all
							admin1List.unshift({
								admin1pcode: 'all',
								admin1name: $filter('translate')('all_mayus'),
							});
							angular.forEach( admin1List, function(d,i){
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, d.admin1pcode, 'all', $scope.dashboard.hrp, 'all','all' );
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, d.admin1pcode, 'all', $scope.dashboard.hrp, $scope.dashboard.report_type_id );
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, d.admin1pcode, 'all', $scope.dashboard.hrp, 'all', 'all', $scope.dashboard.report_type_id);
								provinceRows.push({
									'title': d.inactive ? d.admin1name + ' (Old)' : d.admin1name,
									'param': 'admin1pcode',
									'active': d.admin1pcode,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								});
							});
							var title = $filter( 'filter' )( $scope.dashboard.lists.admin1, { admin0pcode: $scope.dashboard.admin0pcode.toUpperCase() }, true )[0];
							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-admin1',
								'icon': 'location_on',
								'title': title.admin1type_name,
								'class': 'teal lighten-1 white-text',
								'rows': provinceRows
							});

						}

						// if country selected
						if ( $scope.dashboard.admin1pcode !== 'all' ) {

							// admin1
							var admin2List = $filter( 'filter' )( $scope.dashboard.lists.admin2, { admin1pcode: $scope.dashboard.admin1pcode.toUpperCase() }, true );
							// add all
							admin2List.unshift({
								admin2pcode: 'all',
								admin2name: $filter('translate')('all_mayus'),
							});
							angular.forEach( admin2List, function(d,i){
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, d.admin2pcode, $scope.dashboard.hrp, 'all','all' );
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, d.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.report_type_id );
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, d.admin2pcode, $scope.dashboard.hrp, 'all', 'all', $scope.dashboard.report_type_id);
								districtRows.push({
									'title': d.inactive ? d.admin2name + ' (Old)' : d.admin2name,
									'param': 'admin2pcode',
									'active': d.admin2pcode,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								});
							});
							var title = $filter( 'filter' )( $scope.dashboard.lists.admin2, { admin1pcode: $scope.dashboard.admin1pcode.toUpperCase() }, true )[0];
							$scope.model.menu.push({
								'search': true,
								'id': 'search-cluster-admin2',
								'icon': 'location_on',
								'title': title.admin2type_name,
								'class': 'teal lighten-1 white-text',
								'rows': districtRows
							});

						}

						if ($scope.dashboard.admin0pcode === 'af') {
							var project_detail_list = [{ project_detail: 'all', project_detail_title: 'ALL' }, { project_detail: 'winterization', project_detail_title: 'Winterization' }];
							projectDetailRows = [];
							angular.forEach(project_detail_list, function (p, i) {
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, p.project_detail, $scope.dashboard.response, $scope.dashboard.report_type_id);
								projectDetailRows.push({
									'title': p.project_detail_title,
									'param': 'project_detail',
									'active': p.project_detail,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								})
							})
							$scope.model.menu.push({
								'id': 'project_detail',
								'icon': 'playlist_add_check',
								'title': 'Project Response',
								'class': 'teal lighten-1 white-text',
								'rows': projectDetailRows
							});
							var response_list = [{ response: 'all', response_title: 'ALL' },{ response: 'winterization', response_title: 'Winterization' }];

							responseRows =[];
							angular.forEach(response_list, function (r, i) {
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, $scope.dashboard.project_detail, r.response, $scope.dashboard.report_type_id);
								responseRows.push({
									'title': r.response_title,
									'param': 'response',
									'active': r.response,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								})
							})

							$scope.model.menu.push({
								'id': 'activity_reponse',
								'icon': 'track_changes',
								'title': 'Activity Response',
								'class': 'teal lighten-1 white-text',
								'rows': responseRows
							});
						}
						if ( $scope.dashboard.user.email === 'rafinkanisaw@gmail.com' || $scope.dashboard.user.email === 'farifin@immap.org'){
							var hrp_list = [{ hrp: true, hrp_title:'HRP'},{hrp:false, hrp_title:'TIMESTAMP'}]
							hrpRows=[];
							angular.forEach(hrp_list, function (h, i) {
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, h.hrp, $scope.dashboard.project_detail,$scope.dashboard.response);
								// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, h.hrp, $scope.dashboard.report_type_id);
								var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, h.hrp, $scope.dashboard.project_detail, $scope.dashboard.response, $scope.dashboard.report_type_id);
								hrpRows.push({
									'title': h.hrp_title,
									'param': 'hrp',
									'active': h.hrp,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + path
								})
							})
							$scope.model.menu.push({
								'search': true,
								'icon': 'access_time',
								'title': 'HRP/TIMESTAMP',
								'class': 'teal lighten-1 white-text',
								'rows': hrpRows
							});
						}

						setProjectReportPeriodMenu = function () {

							// rows
							// var rows = [];

							// // for each week
							// for (var x = 0; x <= 11; x++) {
							// 	var firstPeriodTitle = moment().month(x).format('MMM') + ' Biweekly Period 1';
							// 	var secondPeriodTitle = moment().month(x).format('MMM') + ' Biweekly Period 2';
							// 	var startDateofBiweeklyFirstPeriod = moment().month(x).set('date', 1).format('YYYY-MM-DD');
							// 	var endDateofBiweeklyFirstPeriod = moment().month(x).set('date', 14).format('YYYY-MM-DD');
							// 	var startDateofBiweeklySecondPeriod = moment().month(x).set('date', 15).format('YYYY-MM-DD')
							// 	var endDateofBiweeklySecondPeriod = moment(startDateofBiweeklySecondPeriod).endOf('month').format('YYYY-MM-DD');
							// 	var pathFirstPeriod = $scope.dashboard.getPathWithDate($scope.dashboard.cluster_id, 
							// 														    $scope.dashboard.activity_type_id,
							// 															$scope.dashboard.activity_description_id,
							// 															$scope.dashboard.organization_tag,
							// 															$scope.dashboard.admin1pcode,
							// 															$scope.dashboard.admin2pcode,
							// 															$scope.dashboard.hrp,
							// 															startDateofBiweeklyFirstPeriod,
							// 															endDateofBiweeklyFirstPeriod
							// 															)

							// 	var pathSecondPeriod = $scope.dashboard.getPathWithDate($scope.dashboard.cluster_id, 
							// 														    $scope.dashboard.activity_type_id,
							// 															$scope.dashboard.activity_description_id,
							// 															$scope.dashboard.organization_tag,
							// 															$scope.dashboard.admin1pcode,
							// 															$scope.dashboard.admin2pcode,
							// 															$scope.dashboard.hrp,
							// 															startDateofBiweeklySecondPeriod,
							// 															endDateofBiweeklySecondPeriod
							// 															)

							// 	rows.push({
							// 		'title': firstPeriodTitle,
							// 		'param': 'start',
							// 		'active': startDateofBiweeklyFirstPeriod,
							// 		'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							// 		'href': '/desk/#' + pathFirstPeriod
							// 	}, {
							// 		'title': secondPeriodTitle,
							// 		'param': 'start',
							// 		'active': startDateofBiweeklySecondPeriod,
							// 		'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
							// 		'href': '/desk/#' + pathSecondPeriod
							// 	})
							// }

							// // push to menu
							// $scope.model.menu.push({
							// 	'id': '5w-bi-weekly',
							// 	'icon': 'date_range',
							// 	'title': 'Biweekly',//'Report Week',
							// 	'class': 'teal lighten-1 white-text',
							// 	'rows': rows
							// });


							var report_types = [{ title: "ALL", active: 'all' }, { title: "MONTHLY", active: 'monthly' }, { title: "BIWEEKLY", active: 'bi-weekly' }];
							var rows = []
							for (i in report_types) {

								var url = $scope.dashboard.getPath($scope.dashboard.cluster_id,
									$scope.dashboard.activity_type_id,
									$scope.dashboard.activity_description_id,
									$scope.dashboard.organization_tag,
									$scope.dashboard.admin1pcode,
									$scope.dashboard.admin2pcode,
									$scope.dashboard.hrp,
									$scope.dashboard.project_detail,
									$scope.dashboard.response,
									report_types[i].active
								)
								rows.push({
									'title': report_types[i].title,
									'param': 'report_type_id',
									'active': report_types[i].active,
									'class': 'grey-text text-darken-2 waves-effect waves-teal waves-teal-lighten-4',
									'href': '/desk/#' + url
								})
							}

							// push to menu
							$scope.model.menu.push({
								'id': '5w-report-type',
								'icon': 'date_range',
								'title': 'Project Report Period',//'Report Week',
								'class': 'teal lighten-1 white-text',
								'rows': rows
							});

						};

						if (($scope.dashboard.admin0pcode === 'af') && ($scope.dashboard.cluster_id === 'esnfi')){
							setProjectReportPeriodMenu();
							
						}


					});

					

					

					

				},

				setCluster: function(){
					if ( $scope.dashboard.cluster_id === 'cvwg' ) {
						$scope.dashboard.cluster = { cluster_id: 'cvwg', cluster: 'MPC' };
					} else {
						$scope.dashboard.cluster = $filter( 'filter' )( $scope.dashboard.lists.clusters,
														{ cluster_id: $scope.dashboard.cluster_id }, true )[0];
					}
				},

				// filter
				setAdmin1: function(){
					$scope.dashboard.data.admin1 = $filter( 'filter' )( $scope.dashboard.lists.admin1,
														{ admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
															admin1pcode: $scope.dashboard.admin1pcode }, true )[0];
				},

				setAdmin2: function(){
					$scope.dashboard.data.admin2 = $filter( 'filter' )( $scope.dashboard.lists.admin2,
														{ admin0pcode: $scope.dashboard.admin0pcode.toUpperCase(),
															admin1pcode: $scope.dashboard.admin1pcode,
															admin2pcode: $scope.dashboard.admin2pcode }, true )[0];
				},

				//
				setTitle: function(){
					// title
					$scope.dashboard.title = $filter('translate')('5W');


					// admin0
					if ( $scope.dashboard.admin0pcode === 'all' ) {
						$scope.dashboard.title = $filter('translate')('5W')+' | ' + $scope.dashboard.adminRpcode.toUpperCase()
					}

					if ( $scope.dashboard.admin0pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.admin0pcode.toUpperCase();
					}
					// cluster
					if ( $scope.dashboard.cluster_id !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.cluster.cluster.toUpperCase();
					}
					// activity
					if ( $scope.dashboard.activity_type_id !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.activity_type_id.toUpperCase();
					}
					// org
					if ( $scope.dashboard.organization_tag !== 'all' ) {
						var org = $scope.dashboard.organization ? ' | ' + $scope.dashboard.organization : '';
						$scope.dashboard.title += org;
					}
					// admin1
					if ( $scope.dashboard.admin1pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.data.admin1.admin1name;
					}
					// admin2
					if ( $scope.dashboard.admin2pcode !== 'all' ) {
						$scope.dashboard.title += ' | ' + $scope.dashboard.data.admin2.admin2name;
					}
					// update of rendered title
					if ( $scope.model.header && $scope.model.header.title ){
						$scope.model.header.title.title = $scope.dashboard.title;
					}
				},

				// subtitle
				setSubtitle: function(){


					// subtitle
					$scope.dashboard.subtitle = $filter('translate')('5wdashboard')+' '+ $filter('translate')('for')+' ';
					// admin0
					if ( $scope.dashboard.admin0pcode === 'all' ) {
						$scope.dashboard.subtitle = $filter('translate')('5wdashboard')+' ' + $filter('translate')('for') + ' ' + $scope.dashboard.adminRpcode.toUpperCase();
					}

					if ( $scope.dashboard.admin0pcode !== 'all' ) {
						$scope.dashboard.subtitle +=  $scope.dashboard.admin0pcode.toUpperCase();
					}
					// cluster
					if ( $scope.dashboard.cluster_id === 'all' ) {
						$scope.dashboard.subtitle += ', '+$filter('translate')('all_clusters');
					}	else {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.cluster.cluster.toUpperCase() + ' cluster';
					}
					// activity
					if ( $scope.dashboard.activity_type_id !== 'all' ) {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.activity_type_id.toUpperCase();
					}
					// org
					if ( $scope.dashboard.organization_tag === 'all' ) {
						$scope.dashboard.subtitle += ', '+ $filter('translate')('all_organizations');
					} else {
						var org =  $scope.dashboard.organization ? ', ' + $scope.dashboard.organization + ' ' + $filter('translate')('organization') : '';
						$scope.dashboard.subtitle += org;
					}
					// admin1
					if ( $scope.dashboard.admin1pcode === 'all' ) {
						$scope.dashboard.subtitle += ', '+ $filter('translate')('all_provinces');
					} else {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin1.admin1name.toUpperCase() + ' '+ $filter('translate')('province');
					}
					// admin2
					if ( $scope.dashboard.admin2pcode !== 'all' ) {
						$scope.dashboard.subtitle += ', ' + $scope.dashboard.data.admin2.admin2name.toUpperCase() + ' ' + $filter('translate')('district');
					}
					// update of rendered title
					if ( $scope.model.header && $scope.model.header.subtitle ){
						$scope.model.header.subtitle.title = $scope.dashboard.subtitle;
					}
				},

				// set dashboard
				init: function(){

					// variables
					$scope.dashboard.adminRpcode = $route.current.params.adminRpcode;
					$scope.dashboard.admin0pcode = $route.current.params.admin0pcode;
					$scope.dashboard.admin1pcode = $route.current.params.admin1pcode;
					$scope.dashboard.admin2pcode = $route.current.params.admin2pcode;
					$scope.dashboard.cluster_id = $route.current.params.cluster_id;
					$scope.dashboard.organization_tag = $route.current.params.organization_tag;
					$scope.dashboard.beneficiaries = $route.current.params.beneficiaries.split('+');
					$scope.dashboard.activity_type_id = $route.current.params.activity_type_id;
					$scope.dashboard.activity_description_id = $route.current.params.activity_description_id;
					$scope.dashboard.hrp = $route.current.params.hrp ? $route.current.params.hrp : true;
					$scope.dashboard.response = $route.current.params.response ? $route.current.params.response : 'all';
					$scope.dashboard.project_detail = $route.current.params.project_detail ? $route.current.params.project_detail : 'all';
					// $scope.dashboard.report_type_id = $route.current.params.report_type_id ? $route.current.params.report_type_id : 'all';
					$scope.dashboard.report_type_id = $route.current.params.report_type_id && $scope.dashboard.cluster_id === 'esnfi' ? $route.current.params.report_type_id : 'all';
					



					// hide contact on download file
					$scope.dashboard.hide_contact_for_download = ngmAuth.hideContactOnDownload();



					// plus dashboard_visits
					$scope.dashboard.user.dashboard_visits++;
					localStorage.setObject( 'auth_token', $scope.dashboard.user );
					ngmLists.setObject( 'auth_token', $scope.dashboard.user );

					// report name
					$scope.dashboard.report += moment().format( 'YYYY-MM-DDTHHmm' );

					// filename cluster needs to be mpc for cvwg
					// TODO refactor/update cvwg
					$scope.dashboard.cluster_id_filename = $scope.dashboard.cluster_id !== 'cvwg' ? $scope.dashboard.cluster_id : 'mpc'

					if ($route.current.params.activity_type_id!=='all'){
						$scope.dashboard.activity_filename = $route.current.params.activity_type_id + '_';
					}

					if ($route.current.params.activity_type_id==='all'){
						$scope.dashboard.activity_filename = '';
					}

					$scope.dashboard.beneficiaries_row = [{
						styleClass: 's12 m12 l4',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('individual_households'),
								request: $scope.dashboard.getRequest({ indicator: 'households_population' })
							}
						}]
					}, {
						styleClass: 's12 m12 l4',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('individual_beneficiaries'),
								request: $scope.dashboard.getRequest({ indicator: 'beneficiaries_population' })
							}
						}]
					}, {
						styleClass: 's12 m12 l4',
						widgets: [{
							type: 'stats',
							style: 'text-align: center;',
							card: 'card-panel stats-card white grey-text text-darken-2',
							config: {
								title: $filter('translate')('services_to_beneficiaries'),
								request: $scope.dashboard.getRequest({ indicator: 'beneficiaries' })
							}
						}]
					}];

					if ($scope.dashboard.admin0pcode.toUpperCase() === 'AF') {
						$scope.dashboard.beneficiaries_row = [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'stats',
								style: 'text-align: center;',
								card: 'card-panel stats-card white grey-text text-darken-2',
								config: {
									title: $filter('translate')('services_to_beneficiaries'),
									request: $scope.dashboard.getRequest({ indicator: 'beneficiaries' })
								}
							}]
						}]
					}

					// model
					$scope.model = {
						name: 'cluster_dashboard',
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
									style: 'float:left;',
									label: $filter('translate')('from'),
									format: 'd mmm, yyyy',
									min: '2017-01-01',
									max: $scope.dashboard.endDate,
									currentTime: $scope.dashboard.startDate,
									onClose: function(){
										// set date
										var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
										if ( date !== $scope.dashboard.startDate ) {
											// set new date
											$scope.dashboard.startDate = date;
											// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all','all' );
											var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all', 'all',$scope.dashboard.report_type_id );
											$location.path( path );
										}
									}
								},{
									style: 'float:right',
									label: $filter('translate')('to'),
									format: 'd mmm, yyyy',
									min: $scope.dashboard.startDate,
									currentTime: $scope.dashboard.endDate,
									onClose: function(){
										// set date
										var date = moment(new Date(this.currentTime)).format('YYYY-MM-DD')
										if ( date !== $scope.dashboard.endDate ) {
											// set new date
											$scope.dashboard.endDate = date;
											// var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all','all' );
											var path = $scope.dashboard.getPath($scope.dashboard.cluster_id, $scope.dashboard.activity_type_id, $scope.dashboard.activity_description_id, $scope.dashboard.organization_tag, $scope.dashboard.admin1pcode, $scope.dashboard.admin2pcode, $scope.dashboard.hrp, 'all', 'all', $scope.dashboard.report_type_id );
											$location.path( path );
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
										id: 'dashboard-btn',
										request: $scope.dashboard.getRequest( { indicator: 'latest_update' } ),
										templateUrl: '/scripts/widgets/ngm-html/template/cluster.dashboard.html'
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('active_organizations'),
										request: $scope.dashboard.getRequest( { indicator: 'organizations' } )
									}
								}]
							},{
								styleClass: 's12 m6',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('active_projects'),
										request: $scope.dashboard.getRequest( { indicator: 'projects' } )
									}
								}]
							}]
						},{
							columns: $scope.dashboard.beneficiaries_row
						},{
							columns: [{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('children'),
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('children'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for:'children'})
																						}]
										}
									}
								}]
							},{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('adult')
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('adult'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'adult' })
											}]
										}
									}
								}]
							},{
								styleClass: 's12 m12 l4',
								widgets: [{
									type: 'highchart',
									style: 'height: 180px;',
									card: 'card-panel chart-stats-card white grey-text text-darken-2',
									config: {
										title: {
											text: $filter('translate')('elderly')
										},
										display: {
											label: true,
											fractionSize: 1,
											subLabelfractionSize: 0,
											postfix: '%'
										},
										templateUrl: '/scripts/widgets/ngm-highchart/template/promo.html',
										style: '"text-align:center; width: 100%; height: 100%; position: absolute; top: 40px; left: 0;"',
										chartConfig: {
											options: {
												chart: {
													type: 'pie',
													height: 140,
													margin: [0,0,0,0],
													spacing: [0,0,0,0]
												},
												tooltip: {
													enabled: false
												}
											},
											title: {
													text: '',
													margin: 0
											},
											plotOptions: {
													pie: {
															shadow: false
													}
											},
											series: [{
												name: $filter('translate')('elderly'),
												size: '100%',
												innerSize: '80%',
												showInLegend:false,
												dataLabels: {
													enabled: false
												},
												request: $scope.dashboard.getRequest({ indicator: 'pieChart', chart_for: 'elderly' })
											}]
										}
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										html: '<h2 class="col s12 report-title" style="margin-top: 20px; padding-bottom: 5px; font-size: 2.2rem; color: #2196F3; border-bottom: 3px #2196F3 solid;">'+$filter('translate')('project_locations')+'</h2>'
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'stats',
									style: 'text-align: center;',
									card: 'card-panel stats-card white grey-text text-darken-2',
									config: {
										title: $filter('translate')('active_locations'),
										request: $scope.dashboard.getRequest( { indicator: 'locations' } )
									}
								}]
							}]
						},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'leaflet',
									card: 'card-panel',
									style: 'padding:0px;',
									config: {
										height: '490px',
										display: {
											type: 'marker',
											zoomToBounds: true,
										},
										defaults: {
											zoomToBounds: true
										},
										layers: {
											baselayers: {
												osm: {
													name: 'Mapbox',
													type: 'xyz',
													url: 'https://api.mapbox.com/styles/v1/reporthub/ckg6rf3um0w2319qom5jnv1nd/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVwb3J0aHViIiwiYSI6ImNrZzZxeDhwYTAwMW4ydXBtbWp0ZzhseGEifQ.uRwnl0E6kRZZhducGRK6vQ',
													layerOptions: {
														continuousWorld: true
													}
												}
											},
											overlays: {
												projects: {
													name: 'Projects',
													type: 'markercluster',
													visible: true,
													layerOptions: {
															maxClusterRadius: 90
													}
												}
											}
										},
										request: $scope.dashboard.getRequest( { indicator: 'markers' } )
									}
								}]
							}]
						},{
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

					// remove training participants for AF
					if ($scope.dashboard.admin0pcode.toUpperCase() === 'AF'){
						$scope.model.header.download.downloads = $scope.model.header.download.downloads.filter(function( obj ) {
							return obj.id !== 'training_participants';
						  });
					}

					// disallow public download
					if ($scope.dashboard.user.username === 'welcome'){
						$scope.model.header.download.downloads = $scope.model.header.download.downloads.filter(function( obj ) {
							return obj.id === 'cluster_dashboard_pdf';
						  });
					}

					// set
					$scope.dashboard.setUrl();
					$scope.dashboard.setMenu();
					$scope.dashboard.setCluster();
					$scope.dashboard.setAdmin1();
					$scope.dashboard.setAdmin2();
					$scope.dashboard.setTitle();
					$scope.dashboard.setSubtitle();

					// dashboard metrics
					var visit = angular.merge( $scope.dashboard.getMetrics( $scope.dashboard.cluster_id + '_cluster_dashboard', 'view' ), { async: true } );
					$http( visit ).then( function( data ) {;
		         // success
		      }).catch( function( data ) {;
		         console.log('error!');
		      });

					setTimeout(() => {
						$('.fixed-action-btn').floatingActionButton({ direction: 'left' });
					}, 0);
				}

			};

			// if lists
			if ( $scope.dashboard.lists.admin1.length ) {

				// set dashboard
				$scope.dashboard.init();

				// assign to ngm app scope ( for menu )
				$scope.dashboard.ngm.dashboard.model = $scope.model;

			}

			// if none
			if ( !$scope.dashboard.lists.admin1.length ) {

				// lists
				var requests = {
					getAdmin1List: ngmAuth.LOCATION + '/api/list/getAdmin1List',
					getAdmin2List: ngmAuth.LOCATION + '/api/list/getAdmin2List'
				}

				// send request
				$q.all([
					$http.get( requests.getAdmin1List ),
					$http.get( requests.getAdmin2List ) ]).then( function( results ) {

					// set dashboard lists
					$scope.dashboard.lists.admin1 = results[0].data;
					$scope.dashboard.lists.admin2 = results[1].data;

					// set in localstorage
					localStorage.setObject( 'lists', { admin1List: results[0].data, admin2List: results[1].data } );
					ngmLists.setObject( 'lists', { admin1List: results[0].data, admin2List: results[1].data } );

					// set dashboard
					$scope.dashboard.init();

					// assign to ngm app scope ( for menu )
					$scope.dashboard.ngm.dashboard.model = $scope.model;

				});

			}
			// setTimeout(() => {
			// 	$('.fixed-action-btn').floatingActionButton({ direction: 'left' });
			// }, 0);

		}

	]);
