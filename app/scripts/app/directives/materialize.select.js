angular.module("ngm.materialize.select", [])
				// watch, watch-model, watch-options="modelArray", searchable="string...", multiple, placeholder="string" or placeholder
        .directive("materializeSelect", ["$compile", function ($compile) {
            return {
								require: ['select'],
                link: function (scope, element, attrs, ctrls) {
                    if (element.is("select")) {
						//BugFix 139: In case of multiple enabled. Avoid the circular looping.
                        function initSelect(newVal, oldVal) {

														// handle historical record view when select option list was updated

														// if (attrs.unknownValue && element.children('option:first[value="?"]').length) {
														// 	element.children('option:first[value="?"]').text(attrs.unknownValue);
														// }
														if (attrs.unknownValue && ctrls[0].$isUnknownOptionSelected()) {
															element[0].options[0].innerHTML = attrs.unknownValue;
														}

                            scope.$evalAsync(function () {

                                // TODO: test that no bugs
																element.formSelect();

																// if searchable then prepend search
																if (attrs.searchable) {
                                                                        addSearch();
																}

																if ("placeholder" in attrs) {
																	setPlaceholder();
																}

														});

														// set placeholder
														// run when select initialized
														function setPlaceholder() {
															element[0].M_FormSelect.input.placeholder = attrs.placeholder ? attrs.placeholder : "-";
														}

														// based on https://github.com/Dogfalo/materialize/issues/3096
														// run when select initialized
														function addSearch(){
															const select = element[0].M_FormSelect;
															const options = select.dropdownOptions.querySelectorAll('li');

															// Add search box to dropdown
															const placeholderText = attrs.searchable;

															const searchBox = document.createElement('div');
															searchBox.style.padding = '6px 10px 0 10px';
															searchBox.innerHTML = `<input type="text" placeholder="${placeholderText}"></input>`;
															select.dropdownOptions.prepend(searchBox);

															// Function to filter dropdown options
															function filterOptions(event) {
																const searchText = event.target.value.toLowerCase();

																for (let i = 0; i < options.length; i++) {
																	const value = options[i].textContent.toLowerCase();
																	const display = value.indexOf(searchText) === -1 ? 'none' : 'block';
																	options[i].style.display = display;
																}

																select.dropdown.recalculateDimensions();
															}

															// Function to give keyboard focus to the search input field
															function focusSearchBox() {
																searchBox.firstElementChild.focus({
																	preventScroll: true
																});
															}

															select.dropdown.options.autoFocus = false;

															select.input.addEventListener('click', focusSearchBox);

															// for (let i = 0; i < options.length; i++) {
															// 	options[i].addEventListener('click', focusSearchBox);
															// }

															searchBox.addEventListener('keyup', filterOptions);
														}
												}

                        // run on current/next cycle $evalAsync
                        initSelect();

												// run if model watch is set
                        if (attrs.ngModel && attrs.hasOwnProperty('watchModel')) {

                            if (attrs.ngModel && !angular.isDefined(scope.$eval(attrs.ngModel))) {
                                // This whole thing fixes that if initialized with undefined, then a ghost value option is inserted. If this thing wasn't done, then adding the 'watch' attribute could also fix it. #160
                                var hasChangedFromUndefined = false;
                                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                                    if (!hasChangedFromUndefined && angular.isDefined(scope.$eval(attrs.ngModel))) {
                                        hasChangedFromUndefined = true;
                                        initSelect(); // initSelect without arguments forces it to actually run.
                                    } else {
                                        initSelect(newVal, oldVal);
                                    }
                                });
                            } else {
                                scope.$watch(attrs.ngModel, initSelect);
                            }

												}

                        // if select values changed -- expensive
                        if ("watch" in attrs) {
                            scope.$watch(function () {
                                return element[0].innerHTML;
                            }, function (newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    initSelect();
                                }
                            });
												}

												// alternative to watch TODO: benchmark against
												if ("watchOptions" in attrs && attrs.watchOptions) {
													scope.$watchCollection(function () {
														return scope.$eval(attrs.watchOptions);
													}, function () {
														initSelect();
													});
												}

                        if(attrs.ngDisabled) {
                            scope.$watch(attrs.ngDisabled, initSelect)
                        }
                    }
                }
            };
        }]);
