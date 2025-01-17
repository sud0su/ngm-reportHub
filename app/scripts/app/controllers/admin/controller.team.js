/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:DashboardTeamCtrl
 * @description
 * # LoginCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('DashboardTeamCtrl', ['$scope', '$route', '$location', 'ngmAuth', 'ngmData', '$translate', '$filter', '$rootScope', 'ngmClusterLists', '$http', function ($scope, $route, $location, ngmAuth, ngmData, $translate, $filter, $rootScope, ngmClusterLists, $http) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// assign to ngm app scope
		$scope.model = $scope.$parent.ngm.dashboard.model;

		// login object
		$scope.dashboard = {

			// parent
			ngm: $scope.$parent.ngm,

			// user
			user: $scope.$parent.ngm.getUser(),

			// admin0pcode
			admin0pcode: $route.current.params.admin0pcode,

			// admin0name
			admin0name: $scope.$parent.ngm.getUser().admin0name,

			// organization
			organization: $scope.$parent.ngm.getUser().organization,

			// organization_tag
			organization_tag: $route.current.params.organization_tag,

			// project
			project: $route.current.params.project,

			// cluster_id
			cluster_id: $route.current.params.cluster_id,

			// menu items
			menu_items: ngmAuth.getMenuParams('TEAM'),

			// dashboard fixed route params by user permissions
			userRestrictedRouteParams: ngmAuth.getRouteParams('TEAM'),

			// MD5 hash
			MD5: function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()},

			// set path based on user
			getPath: function() {

				// set
				// $scope.dashboard.adminRpcode = $route.current.params.adminRpcode;
				$scope.dashboard.admin0pcode = $route.current.params.admin0pcode;
				$scope.dashboard.cluster_id = $route.current.params.cluster_id;
				$scope.dashboard.organization_tag = $route.current.params.organization_tag;

				// override route params to user permitted zone params if any
				if ( $scope.dashboard.userRestrictedRouteParams ) {
					for (const key of $scope.dashboard.userRestrictedRouteParams){
						$scope.dashboard[key] = $scope.dashboard.user[key]
					}
				}

				// if iMMAP
				if ( $scope.dashboard.user.organization === 'iMMAP' ) {
					$scope.dashboard.project = $route.current.params.project;
				} else {
					$scope.dashboard.project = 'all'
				}

				// go with URL
				var path = '/team/' + $scope.dashboard.admin0pcode +
																	'/' + $scope.dashboard.organization_tag +
																	'/' + $scope.dashboard.project +
																	'/' + $scope.dashboard.cluster_id;
				// return path
				return path;

			},

			// set
			setPath: function( path ) {
				// if current location is not equal to path
				if ( path !== $location.$$path ) {
					$location.path( path );
				}

			},

			// request
			getRequest: function( indicator, status ){
				return {
						method: 'POST',
						url: ngmAuth.LOCATION + '/api/getOrganizationIndicator',
						data: {
							indicator: indicator,
							status: status,
							admin0pcode: $scope.dashboard.admin0pcode,
							organization_tag: $scope.dashboard.organization_tag,
							project: $scope.dashboard.project,
							cluster_id: $scope.dashboard.cluster_id
						}
					}
			},

			// set menu based on URL
			setMenu: function() {

				// menu, by role
				var menu_items = $scope.dashboard.menu_items || []

				// if iMMAP
				if ( $scope.dashboard.user.organization === 'iMMAP' ) {
					menu_items.push( 'project');
				}
				// add sector
				menu_items.push( 'cluster_id');

				// request
				var request = angular.merge( $scope.dashboard.getRequest( 0, 0 ), { url: ngmAuth.LOCATION + '/api/getOrganizationMenu', data: { menu_items: menu_items } } )

				// ngmData
				ngmData
					.get( request )
					.then( function( result  ){
						// set titles
						$scope.dashboard.admin0name = result.admin0name;
						$scope.dashboard.organization = result.organization;
						$scope.dashboard.setTitles();
						// set menu
						$scope.dashboard.ngm.dashboard.model.menu = result.menu;
					});

			},

			// set title
			setTitles: function () {
				if ( $scope.dashboard.ngm.dashboard.model.header ) {
					$scope.dashboard.ngm.dashboard.model.header.title.title = $scope.dashboard.organization + ' | ' +  $scope.dashboard.admin0name + ' | '+$filter('translate')('team');
					$scope.dashboard.ngm.dashboard.model.header.subtitle.title = $scope.dashboard.organization  + ' | ' +  $scope.dashboard.admin0name + ' | '+$filter('translate')('team')+ ' | ' + $scope.dashboard.user.username;
				}
			},

			// set stats
			setStats: function() {

				// 235

				var stats = [{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'html',
						config: {
							user: $scope.dashboard.user,
							style: $scope.dashboard.ngm.style,
							profileHref: $scope.dashboard.profileHref,
							templateUrl: '/scripts/app/views/authentication/profile-card.html'
						}
					}]
				}];

				// stats USER, ORG ( active staff )
				var stats_org_level = [{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'stats',
						style: 'text-align:center; height:235px; padding-top:90px;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('active_staff'),
							request: $scope.dashboard.getRequest( 'total', 'active' )
						}
					}]
				}];

				// stats CLUSTER, ADMIN ( orgs, active staff )
				var stats_cluster_level = [{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('organizations'),
							request: $scope.dashboard.getRequest( 'organizations', 'active' )
						}
					}]
				},{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('active_partners'),
							request: $scope.dashboard.getRequest( 'total', 'active' )
						}
					}]
				}];

				// country level
				var stats_country_level = [{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('sectors_mayus'),
							request: $scope.dashboard.getRequest( 'sectors', 'active' )
						}
					}]
				},{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('organizations'),
							request: $scope.dashboard.getRequest( 'organizations', 'active' )
						}
					}]
				},{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('active_partners'),
							request: $scope.dashboard.getRequest( 'total', 'active' )
						}
					}]
				}];

				// above county level ORG
				var stats_country_level_above_org = [{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('countries_mayus'),
							request: $scope.dashboard.getRequest( 'countries', 'active' )
						}
					}]
				},{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('sectors_mayus'),
							request: $scope.dashboard.getRequest( 'sectors', 'active' )
						}
					}]
				},{
					styleClass: 's12 m12 l6',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('active_partners'),
							request: $scope.dashboard.getRequest( 'total', 'active' )
						}
					}]
				}];

				// above county level above
				var stats_country_level_above = [{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('countries_mayus'),
							request: $scope.dashboard.getRequest( 'countries', 'active' )
						}
					}]
				},{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('sectors_mayus'),
							request: $scope.dashboard.getRequest( 'sectors', 'active' )
						}
					}]
				},{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('organizations'),
							request: $scope.dashboard.getRequest( 'organizations', 'active' )
						}
					}]
				},{
					styleClass: 's12 m6 l3',
					widgets: [{
						type: 'stats',
						style: 'text-align: center;',
						card: 'card-panel stats-card white grey-text text-darken-2',
						config: {
							title: $filter('translate')('active_partners'),
							request: $scope.dashboard.getRequest( 'total', 'active' )
						}
					}]
				}];

				// region / hq
				if ( $scope.dashboard.user.roles.indexOf( 'HQ' ) > -1 ||
										$scope.dashboard.user.roles.indexOf( 'REGION' ) > -1 ) {
					stats = stats.concat( stats_country_level_above );
				}

				// region / hq ORG
				else if ( $scope.dashboard.user.roles.indexOf( 'HQ_ORG' ) > -1 ||
										$scope.dashboard.user.roles.indexOf( 'REGION_ORG' ) > -1 ) {
					stats = stats.concat( stats_country_level_above_org );
				}

				// country
				else if ( $scope.dashboard.user.roles.indexOf( 'COUNTRY' ) > -1 ) {
					stats = stats.concat( stats_country_level );
				}

				// cluster
				else if ( $scope.dashboard.user.roles.indexOf( 'CLUSTER' ) > -1 ||
										$scope.dashboard.user.roles.indexOf( 'ADMIN' ) > -1 ) {
					stats = stats.concat( stats_country_level );
				}
				// user / org
				else if ( $scope.dashboard.user.roles.indexOf( 'USER' ) > -1 ||
										$scope.dashboard.user.roles.indexOf( 'ORG' ) > -1 ) {
					stats = stats.concat( stats_org_level );
				}

				return stats;

			},

			// init
			init: function(){

				// add padding
				$scope.dashboard.ngm.style.paddingHeight = 20;

				// get user email HASH
				$scope.dashboard.user.emailHash = $scope.dashboard.user.email ? $scope.dashboard.MD5($scope.dashboard.user.email.trim().toLowerCase()) : '';

				// url href
				// $scope.dashboard.profileHref = ( $scope.dashboard.user.organization === 'iMMAP'
				// 	&& ( $scope.dashboard.user.admin0pcode === 'CD' || $scope.dashboard.user.admin0pcode === 'ET' ) ) ? '/immap/profile' : '/profile';
				$scope.dashboard.profileHref = '/profile';

				// dews dashboard model
				$scope.model = {
					name: 'dashboard_team',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.dashboard.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m12 l12 report-title truncate',
							style: 'color: ' + $scope.dashboard.ngm.style.defaultPrimaryColor,
							title: $scope.dashboard.organization + ' | ' +  $scope.dashboard.admin0name + ' | '+$filter('translate')('team')
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle',
							html: true,
							title: $scope.dashboard.organization  + ' | ' +  $scope.dashboard.admin0name + ' | '+ $filter('translate')('team') +' | ' + $scope.dashboard.user.username
						}
					},
					rows: [{
						columns: $scope.dashboard.setStats()

					},{
						columns: [{
							styleClass: 's12',
							widgets: [{
								type: 'table',
								card: 'panel',
								style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
								config: {
									style: $scope.dashboard.ngm.style,
									headerClass: 'collection-header lighten-2',
									headerStyle: 'background-color:' + $scope.dashboard.ngm.style.defaultPrimaryColor,
									headerText: 'white-text',
									headerIcon: 'group',
									headerTitle: $filter('translate')('active_users'),
									templateUrl: '/scripts/app/views/authentication/team.html',
									tableOptions:{
										count: 10,
										sorting: { last_logged_in: "desc" }
									},
									request: $scope.dashboard.getRequest( 'list', 'active' ),
									onClick: function(user){
										// go to profile
										$location.path( $scope.dashboard.profileHref + '/' + user.username );
									},
									editableRole: ngmAuth.getEditableRoles(),
									manageUser: function(role,row){
										$scope.dashboard.manageUserAccess(role,row);
									},
									saveEditAccess: function(user){
										$scope.dashboard.saveAccess(user);
									},
									openModal:function (modal) {
										$scope.dashboard.openModal(modal);
									},
									getUserRoleDescriptions: function( role ){
										return ngmAuth.getUserRoleDescriptions( role );
									},
									showOrgAdminTag: function (roles) {
										if (roles.indexOf('ORG') > -1){
											return true;
										}
										return false
									},
									formDisabled: (function () {
										var disabled = true;
										if ($scope.dashboard.user.status === 'active' &&

												(ngmAuth.canDo('EDIT_USER', {
													adminRpcode:$scope.dashboard.user.adminRpcode,
													admin0pcode: $scope.dashboard.user.admin0pcode,
													cluster_id: $scope.dashboard.user.cluster_id,
													organization_tag: $scope.dashboard.user.organization_tag
												}))) {
											disabled = false;
										}
										return disabled;
									})(),
									btnDisabled: (function(){
										if(!$scope.dashboard.btnManageAccessDisabled){
											return false
										}
										return true;
									}),
									search_tool: true
								}
							}]
						}]
					},{
						columns: [{
							styleClass: 's12',
							widgets: [{
								type: 'table',
								card: 'panel',
								style: 'padding:0px; height: ' + $scope.dashboard.ngm.style.height + 'px;',
								config: {
									style: $scope.dashboard.ngm.style,
									headerClass: 'collection-header lighten-2',
									headerStyle: 'background-color: grey',
									headerText: 'white-text',
									headerIcon: 'group',
									headerTitle: $filter('translate')('desactivated_users'),
									templateUrl: '/scripts/app/views/authentication/team.html',
									tableOptions:{
										count: 10,
										sorting: { last_logged_in: "desc" }
									},
									request: $scope.dashboard.getRequest( 'list', 'deactivated' ),
									onClick: function(user){
										// go to profile
										$location.path( $scope.dashboard.profileHref + '/' + user.username );
									},
									search_tool: true
								}
							}]
						}]
					},{
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'html',
									config: {
										templateUrl: '/scripts/app/views/authentication/open-close_registration.html',
										request: {
											method: 'POST',
											url: ngmAuth.LOCATION + '/api/getTeamOrganizationsByFilter',
											data: {
												filter: { adminRpcode: $scope.$parent.ngm.getUser().adminRpcode.toLowerCase(), admin0pcode: $scope.$parent.ngm.getUser().admin0pcode.toLowerCase() }
											}
										},
										selected_org: $route.current.params.organization_tag,
										user : $scope.dashboard.user,
										setCloseRegisteration:function(org_id,id){
											$scope.dashboard.setCloseRegisteration(org_id, id)
										},
										checkCloseRegisteration:function(id){
											return $scope.dashboard.checkCloseRegisteration(id)
										},
										disabledOrgcheckCloseRegisteration: function(org_tag){
											return $scope.dashboard.disabledOrgcheckCloseRegisteration(org_tag)
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
								style: 'padding:0px; height: 90px; padding-top:10px;',
								config: {
									html: $scope.dashboard.ngm.footer
								}
							}]
						}]
					}]
				};

				// assign to ngm app scope
				$scope.dashboard.ngm.dashboard.model = $scope.model;

			},
			openModal: function (modal) {
				// $('#' + modal).openModal({ dismissible: false });
				$('#' + modal).modal({ dismissible: false });
				$('#' + modal).modal('open');
			},
			//manage user access
			manageUserAccess: function (id,user) {
				if (document.getElementById(id).checked) {
					var values = document.getElementById(id).value;
					if (user.roles.indexOf(values) === -1) {
						user.roles.push(values);
						// set landing page to admin
						if ( user.roles.length > 1 ) {
							user.app_home = '/cluster/admin/';
						}
						// set landing page to org
						if ( user.roles.length === 1 && user.roles.indexOf( 'USER' ) !== -1 ) {
							user.app_home = '/cluster/organization/';
						}
					}
				} else {
					var values = document.getElementById(id).value;
					if (user.roles.indexOf(values) > -1) {
						var index = user.roles.indexOf(values);
						user.roles.splice(index, 1);
						// set landing page to org
						if ( user.roles.length === 1 && user.roles.indexOf( 'USER' ) !== -1 ) {
							user.app_home = '/cluster/organization/';
						}
					}
				}
			},
			saveAccess:function(user){
				//set button to disable
				$scope.dashboard.btnManageAccessDisabled= true;
				// toast to wait
				// Materialize.toast('Plesase! wait a moment...', 10000, 'note');
				M.toast({ html: 'Plesase! wait a moment...', displayLength:10000, classes:'note'});
				//save update
				ngmAuth
					.updateProfile({ user: user }).then(function (result) {
						// db error!
						if (result.data.err || result.data.summary) {
							var msg = result.data.msg ? result.data.msg : 'error!';
							// Materialize.toast(msg, 6000, msg);
							M.toast({ html: msg, displayLength: 6000, classes: 'error' });
						}
						// success
						if (result.data.success) {
							// Materialize.toast('Success! Role updated!', 3000, 'success');
							M.toast({ html: 'Success! Role updated!', displayLength: 3000, classes: 'success'});
							$scope.dashboard.btnManageAccessDisabled=false;
						}
					});
			},
			setCloseRegisteration:function(org_id,id){
				var closed_registration_value = false;
				if (document.getElementById(id).checked) {
					closed_registration_value = true;
				}
				M.toast({ html: 'Processing... !', displayLength: 4000, classes: 'note' });
				index = $scope.list_organization.findIndex(x => x.id === org_id)

				var org = $scope.list_organization[index];


				$http({
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/setOrganizationAttributes',
					data: {
						organization: {
							id : org_id,
							closed_registration: closed_registration_value
						}
					}
				}).then(function (result) {
						$scope.list_organization[index] = result.data[0];
						M.toast({ html: 'Succeessfully updated... !', displayLength: 4000, classes: 'success' });

					// success!
				}).catch(function (err) {
					// Materialize.toast( 'ACBAR Partner Organization Error!', 6000, 'error' );
					M.toast({ html: 'Close Registeration Failed !', displayLength: 6000, classes: 'error' });
				});

			},
			checkCloseRegisteration:function(id){
				if ($scope.list_organization && $scope.list_organization.length){
					var z = $scope.list_organization.filter(x=>x.id === id)
					if(z.length){
						return z[0].closed_registration ? true: false;
					}
				}

			},
			disabledOrgcheckCloseRegisteration:function(orgonization_tag){
				if($location.path() !== '/login'){
					var canEdit = ngmAuth.canDo('EDIT_ORGANIZATION', { organization_tag: orgonization_tag})
					var disabled = !canEdit
					return disabled
				}else{
					return disabled = true;
				}
			},
			btnManageAccessDisabled: false

		}

		// set path, menu and init
		$scope.dashboard.setPath( $scope.dashboard.getPath() );
		ngmData.get({
			method: 'POST',
			url: ngmAuth.LOCATION + '/api/getTeamOrganizationsByFilter',
			data: {
				filter: { adminRpcode: $scope.$parent.ngm.getUser().adminRpcode.toLowerCase(), admin0pcode: $scope.$parent.ngm.getUser().admin0pcode.toLowerCase() }
			}
		}).then(function (result) {
			$scope.list_organization = result;
		})
		$scope.dashboard.setMenu();
		$scope.dashboard.init();
		$scope.$on('$locationChangeSuccess', function (evt, absNewUrl, absOldUrl) {
			var absOldUrl = absOldUrl.substring(absOldUrl.indexOf("/#") + 1);
			$rootScope.teamPreviouseUrl = absOldUrl;
		})



	}]);
