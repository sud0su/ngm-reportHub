/**
 * @ngdoc overview
 * @name ngmReportHubApp
 * @description
 * # ngmReportHubApp
 *
 * Main module of the application.
 */
angular
	.module('ngmEpr', [])
	.config([ '$routeProvider', '$compileProvider', function ( $routeProvider, $compileProvider ) {

		// https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476#.ufea9sjt1
		$compileProvider.debugInfoEnabled( false )

		const year_dashboards = moment().subtract(2, 'M').year();
		const start_date_dashboards = moment([year_dashboards]).format('YYYY-MM-DD');

		// app routes with access rights
		$routeProvider
			// epr
			.when( '/epr', {
				redirectTo: '/epr/' + year_dashboards + '/all/all/all/' + start_date_dashboards+'/' + moment().format('YYYY-MM-DD')
			})
			// epr dashboard
			.when( '/epr/:year/:region/:province/:week/:start/:end', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardEprCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.grantPublicAccess();
					}],
				}
			})
			// epr
			.when( '/epr/admin', {
				redirectTo: '/epr/admin/' + year_dashboards + '/all/all/all/' + start_date_dashboards+'/' + moment().format('YYYY-MM-DD')
			})
			// epr admin
			.when( '/epr/admin/:year/:region/:province/:week/:start/:end', {
				templateUrl: '/views/app/dashboard.html',
				controller: 'DashboardEprAdminCtrl',
				resolve: {
					access: [ 'ngmAuth', function(ngmAuth) {
						return ngmAuth.grantPublicAccess();
					}],
				}
			});

	}]);
