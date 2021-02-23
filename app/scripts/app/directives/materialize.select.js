angular.module("ngm.materialize.select", [])
				// watch, watch-model, watch-options="modelArray", searchable="string...", multiple, placeholder="string" or placeholder
        .directive("materializeSelect", ["$compile", function ($compile) {
            return {
								require: ['select'],
                link: function (scope, element, attrs, ctrls) {
					const keyBoardOnMobile = true;
					const doOwnAutoload = true;
					const stickySearchbar = true;
					const scrollIntoView = true;

					// helper functions -------------------------------
					const hasClass = function (el, className) {
						if (el.classList) return el.classList.contains(className);
						return (new RegExp('( |^)' + className + '( |$)')).test(className);
					};
					const addClass = function (el, className) {
						if (el.classList) el.classList.add(className)
						else if (!hasClass(el, className)) el.className += " " + className;
					}
					const removeClass = function (el, className) {
						if (el.classList) el.classList.remove(className)
						else if (hasClass(el, className)) el.className = el.className.replace(new RegExp('( |^)' + className + '( |$)'), ' ');
					}
					const scrollIntoViewIfNeeded = function (el, strict) {
						// --------------------
						// init parameters
						// unpack jquery objects
						if (typeof jQuery === "function" && el instanceof jQuery) {
							el = el[0];
						}
						if (typeof strict !== 'boolean') {
							strict = true;
						}
						let parent = el.parentNode;
						let parent_rect = parent.getBoundingClientRect();
						let target_rect = el.getBoundingClientRect();
						if (stickySearchbar) {
							// as searchbar is first element, reduce parent height and top by search bar size
							let searchbar_rect = parent.firstElementChild.getBoundingClientRect();
							parent_rect = {
								top: parent_rect.top + searchbar_rect.height,
								height: parent_rect.height - searchbar_rect.height,
								left: parent_rect.left,
								width: parent_rect.width
							};
						}
						// --------------------
						// scroll into view
						if (target_rect.top < parent_rect.top && (strict || target_rect.top + target_rect.height < parent_rect.top)) {
							// element out of bounds -> top
							// as search bar is forst element
							let diff = parent_rect.top - target_rect.top;
							parent.scrollBy(0, -diff);
						} else if (target_rect.top + target_rect.height > parent_rect.top + parent_rect.height && (strict || target_rect.top > parent_rect.top + parent_rect.height)) {
							let diff = parent_rect.top + parent_rect.height - (target_rect.top + target_rect.height);
							parent.scrollBy(0, -diff);
						}
					}
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
															// searchBox.style.padding = '6px 10px 0 10px';
															searchBox.style.cssText =
																'padding: 6px 10px 0 10px;' +
																(stickySearchbar ?
																	// search boy sticky on top
																	'position: -webkit-sticky;' +
																	'position: sticky;' +
																	'top: 0;' +
																	'z-index: 1;' +
																	'background-color: inherit;' : '');
															searchBox.innerHTML = `<input type="text" placeholder="${placeholderText}"></input>`;
															select.dropdownOptions.prepend(searchBox);
															const searchInput = searchBox.firstElementChild;

															// Function to filter dropdown options
															// function filterOptions(event) {
															// 	const searchText = event.target.value.toLowerCase();

															// 	for (let i = 0; i < options.length; i++) {
															// 		const value = options[i].textContent.toLowerCase();
															// 		const display = value.indexOf(searchText) === -1 ? 'none' : 'block';
															// 		options[i].style.display = display;
															// 	}

															// 	select.dropdown.recalculateDimensions();
															// }

															function filterOptions(event) {
																// fix index value -> as materialize key handler changes value after keydown - event
																if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
																	let hover_idx = -1;
																	// find current hover index
																	for (let i = 0; i < options.length; i++) {
																		if (hover_idx === -1 && hasClass(options[i], 'hover')) {
																			hover_idx = i;
																			break;
																		}
																	}
																	if (hover_idx > -1) {
																		select.dropdown.focusedIndex = hover_idx + 1;
																		if (scrollIntoView) {
																			scrollIntoViewIfNeeded(options[hover_idx], true);
																		}
																	}
																	return;
																} else if (event.code === 'Enter') {
																	return;
																}

																// search for value
																const searchText = searchInput.value.toLowerCase().trim();
																let lastOptgroup = null;
																for (let i = 0; i < options.length; i++) {
																	const text = options[i].textContent.toLowerCase();
																	const display = text.indexOf(searchText) === -1 ? 'none' : 'block';
																	if (hasClass(options[i], 'optgroup')) {
																		lastOptgroup = display === 'none' ? options[i] : null;
																	} else if (!hasClass(options[i], 'optgroup-option')) {
																		lastOptgroup = null;
																	} else {
																		if (display !== 'none' && lastOptgroup !== null) {
																			lastOptgroup.style.display = display;
																		}
																	}
																	options[i].style.display = display;
																}
																select.dropdown.recalculateDimensions();
																// recalculate may moves focus away in case of resize
																searchInput.focus();
															}

															function filterNavigate(event) {
																// handle keyboard focus events
																if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
																	let hover_idx = -1;		// currently hovered option
																	let selected_idx = -1;	// currently selected option - start point for up/down, used if nothing hovered
																	let visibles = [];
																	// find current hover index
																	for (let i = 0; i < options.length; i++) {
																		let optionIsVisible = window.getComputedStyle(options[i]).display !== 'none';
																		if (hover_idx === -1 && hasClass(options[i], 'hover')) {
																			hover_idx = i;
																		}
																		if (optionIsVisible) {
																			visibles.push(i);
																			if (hover_idx === -1 && selected_idx === -1 && hasClass(options[i], 'selected')) {
																				selected_idx = i;
																			}
																		}
																	}
																	if (hover_idx === -1 && selected_idx !== -1) {
																		hover_idx = selected_idx;
																	}
																	let new_hover_idx = -1;
																	if (visibles.length > 0) {
																		let direction = event.code === 'ArrowDown' ? 1 : -1;
																		if (hover_idx === -1 || visibles.indexOf(hover_idx) === -1) {
																			new_hover_idx = visibles[direction === 1 ? 0 : visibles.length - 1];
																		} else {
																			new_hover_idx = visibles[(visibles.length + visibles.indexOf(hover_idx) + direction) % visibles.length];
																		}
																	}
																	// unset hover
																	if (hover_idx > -1) {
																		removeClass(options[hover_idx], 'hover');
																	}
																	if (new_hover_idx > -1) {
																		addClass(options[new_hover_idx], 'hover');
																		select.dropdown.focusedIndex = new_hover_idx + 1;
																	}
																}
															}

															// Function to give keyboard focus to the search input field
															function focusSearchBox() {
																searchBox.firstElementChild.focus({
																	preventScroll: true
																});
															}

															// Function to init search field and pull focus to search input
															function onSelectDropdownShow() {
																// clear search on open
																if (searchInput.value !== '') {
																	searchInput.value = '';
																	// show all entries
																	setTimeout(function () {
																		searchBox.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Backspace', 'code': 'Backspace', 'keyCode': 8 }));
																	}, 200);
																}
																focusSearchBox();
															}


															select.dropdown.options.autoFocus = false;

															if (keyBoardOnMobile || window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
																// listen to Click and ArrowDown select open events
																select.input.addEventListener('click', onSelectDropdownShow);
																select.input.addEventListener('keyup', function (event) {
																	if (event.code === 'ArrowDown') { // select open event
																		onSelectDropdownShow();
																	}
																});
																for (let i = 0; i < options.length; i++) {
																	options[i].addEventListener('click', focusSearchBox);
																}
															}

															// select.input.addEventListener('click', focusSearchBox);

															// for (let i = 0; i < options.length; i++) {
															// 	options[i].addEventListener('click', focusSearchBox);
															// }

															searchBox.addEventListener('keyup', filterOptions);
															// handle ArrowUp/ArrowDown keyboard events
															searchBox.addEventListener('keydown', filterNavigate);
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
