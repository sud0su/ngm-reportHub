angular
	.module( "ngm.materialize.datepicker", [])
		.directive( "materializeDatepicker", [ "$compile", "$timeout", function ( $compile, $timeout ) {

				var dateFormat = function () {

					var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
							timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
							timezoneClip = /[^-+\dA-Z]/g,
							pad = function (val, len) {
									val = String(val);
									len = len || 2;
									while (val.length < len) {
											val = "0" + val;
									}
									return val;
							};

					// Regexes and supporting functions are cached through closure
					return function (date, mask, utc) {

							var dF = dateFormat;

							// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
							if (arguments.length === 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
									mask = date;
									date = undefined;
							}

							// Passing date through Date applies Date.parse, if necessary
							date = date ? new Date(date) : new Date();
							if (isNaN(date)) throw SyntaxError("invalid date");

							// force UTC
							date = new Date( date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0 );

							// mask?
							mask = String(dF.masks[mask] || mask || dF.masks["default"]);

							// Allow setting the utc argument via the mask
							if (mask.slice(0, 4) == "UTC:") {
									mask = mask.slice(4);
									utc = true;
							}

							var _ = utc ? "getUTC" : "get",
									d = date[ _ + "Date" ](),
									D = date[ _ + "Day" ](),
									m = date[ _ + "Month" ](),
									y = date[ _ + "FullYear" ](),
									H = date[ _ + "Hours" ](),
									M = date[ _ + "Minutes" ](),
									s = date[ _ + "Seconds" ](),
									L = date[ _ + "Milliseconds" ](),
									o = utc ? 0 : date.getTimezoneOffset(),
									flags = {
											d:    d,
											dd:   pad(d),
											ddd:  dF.i18n.dayNames[D],
											dddd: dF.i18n.dayNames[D + 7],
											m:    m + 1,
											mm:   pad(m + 1),
											mmm:  dF.i18n.monthNames[m],
											mmmm: dF.i18n.monthNames[m + 12],
											yy:   String(y).slice(2),
											yyyy: y,
											h:    H % 12 || 12,
											hh:   pad(H % 12 || 12),
											H:    H,
											HH:   pad(H),
											M:    M,
											MM:   pad(M),
											s:    s,
											ss:   pad(s),
											l:    pad(L, 3),
											L:    pad(L > 99 ? Math.round(L / 10) : L),
											t:    H < 12 ? "a"  : "p",
											tt:   H < 12 ? "am" : "pm",
											T:    H < 12 ? "A"  : "P",
											TT:   H < 12 ? "AM" : "PM",
											Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
											o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
											S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
									};

							return mask.replace(token, function ($0) {
									return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
							});
					};
			}();

			// Some common format strings
			dateFormat.masks = {
				"default":      "ddd mmm dd yyyy HH:MM:ss",
					shortDate:      "m/d/yy",
					mediumDate:     "mmm d, yyyy",
					longDate:       "mmmm d, yyyy",
					fullDate:       "dddd, mmmm d, yyyy",
					shortTime:      "h:MM TT",
					mediumTime:     "h:MM:ss TT",
					longTime:       "h:MM:ss TT Z",
					isoDate:        "yyyy-mm-dd",
					isoTime:        "HH:MM:ss",
					isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
					isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
			};

			// Internationalization strings
			dateFormat.i18n = {
					dayNames: [
							"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
							"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
					],
					monthNames: [
							"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
							"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
					]
			};

			// For convenience...
			Date.prototype.format = function (mask, utc) {
					return dateFormat(this, mask, utc);
			};

			return {
				// model
				require: 'ngModel',
				
				// scope
				scope: {
					container: '@',
					format: '@',
					formatSubmit: '@',
					months: '@',
					monthsShort: '@',
					weekdays: '@',
					weekdaysShort: '@',
					weekdaysAbbrev: '@',
					firstDay: '@',
					disable: '@',
					today: '@',
					clear: '@',
					close: '@',
					cancel: '@',
					yearRange: '@',
					minDate: "=",
					maxDate: "=",
					defaultDate: '=',
					// open, close, draw
					autoClose: '=',
					onOpen: '=',
					onClose: '=',
					onDraw: '=',
					// start, end
					onOpenStart: '=',
					onOpenEnd: '=',
					onCloseStart: '=',
					onCloseEnd: '=',
					onSelect: '='
				},

				// link
				link: function ( $scope, element, attrs, ngModelCtrl ) {				

					// attrs
					var months = [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					];
					var monthsShort =[
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'Jun',
						'Jul',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					];
					var weekdays = [
						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday'
					];
					var weekdaysShort = [
						'Sun',
						'Mon',
						'Tue',
						'Wed',
						'Thu',
						'Fri',
						'Sat'
					];
					var weekdaysAbbrev = ['S','M','T','W','T','F','S'];

					// defaults
					var options = {
							container : $scope.container,
							defaultDate: (angular.isDefined($scope.defaultDate)) ? new Date( $scope.defaultDate ) : undefined,
							minDate: (angular.isDefined($scope.minDate)) ? new Date( $scope.minDate ) : undefined,
							maxDate: (angular.isDefined($scope.maxDate)) ? new Date( $scope.maxDate ) : undefined,
							format: (angular.isDefined($scope.format)) ? $scope.format : 'dd mmm, yyyy',
							formatSubmit: (angular.isDefined($scope.formatSubmit)) ? $scope.formatSubmit : undefined,
							months: (angular.isDefined(months)) ? months : undefined,
							monthsShort: (angular.isDefined(monthsShort)) ? monthsShort : undefined,
							weekdays: (angular.isDefined(weekdays)) ? weekdays : undefined,
							weekdaysShort: (angular.isDefined(weekdaysShort)) ? weekdaysShort : undefined,
							weekdaysAbbrev: (angular.isDefined(weekdaysAbbrev)) ? weekdaysAbbrev : undefined,
							firstDay: (angular.isDefined($scope.firstDay)) ? $scope.firstDay : 0,
							disable: (angular.isDefined($scope.disable)) ? $scope.disable : undefined,
							today: (angular.isDefined($scope.today)) ? $scope.today : undefined,
							clear: (angular.isDefined($scope.clear)) ? $scope.clear : undefined,
							close: (angular.isDefined($scope.close)) ? $scope.close : undefined,
							cancel: (angular.isDefined($scope.cancel)) ? $scope.cancel : undefined,
							yearRange: (angular.isDefined($scope.yearRange)) ? $scope.yearRange : undefined,
							// open, close, draw fn
							autoClose: (angular.isDefined($scope.autoClose)) ? $scope.autoClose : true,
							onOpen: (angular.isDefined($scope.onOpen)) ? function(){ $scope.onOpen(); } : undefined,
							onClose: (angular.isDefined($scope.onClose)) ? function(){ $scope.onClose(); } : undefined,
							onDraw: (angular.isDefined($scope.onDraw)) ? function(){ $scope.onDraw(); } : undefined,
							// start, end
							onOpenStart: (angular.isDefined($scope.onOpenStart)) ? function(){ $scope.onOpenStart(); } : undefined,
							onOpenEnd: (angular.isDefined($scope.onOpenEnd)) ? function(){ $scope.onOpenEnd(); } : undefined,
							onCloseStart: (angular.isDefined($scope.onCloseStart)) ? function(){ $scope.onCloseStart(); } : undefined,
							onCloseEnd: (angular.isDefined($scope.onCloseEnd)) ? function(){ $scope.onCloseEnd(); } : undefined,
							onSelect: (angular.isDefined($scope.onSelect)) ? function(){ $scope.onSelect(); } : undefined
					};

					// init datepicker
					var instance = M.Datepicker.init( element, options );
					var picker = M.Datepicker.getInstance( element );

					// format date
					ngModelCtrl.$formatters.unshift(function ( modelValue ) {
						if ( modelValue && modelValue !== 'Invalid date' ) {
							var date = new Date( modelValue );
							return (angular.isDefined($scope.format)) ? date.format($scope.format) : date.format( 'dd mmm, yyyy' );
						}
					});

					// max / min $watch date
					$scope.$watch('maxDate', function (newMax) {
						picker.options.maxDate = newMax ? new Date(newMax) : false;
					});
					$scope.$watch('minDate', function (newMin) {
						picker.options.minDate = newMin ? new Date(newMin) : false;
					});

				}
			}
		}]);