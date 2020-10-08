angular.module("ngm.materialize.form", [])
				// https://github.com/simpulton/angular-dynamic-templates
        .directive('formBeneficiaries', function ($compile) {
					var getTemplate = function (templates, elem, formid) {

							var template = '';
							switch (elem.input_type) {
									case 'select2':
										template = `<div class="input-field col ${elem.class}">
														<select materialize-select ${elem.watch ? `watch ` : ``}id="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
																name="${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="validate"
																ng-model="beneficiary.${elem.model}" ng-change="ngmCustomBeneficiaries.updateName( project.beneficiaries_lists.${elem.list}, '${elem.id}', '${elem.name}', beneficiary );
																		ngmCustomBeneficiaries.inputChange( 'ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}' );"
																ng-options="${elem.options}"
																ng-disabled="project.definition.project_status === 'complete' || project.report.report_status === 'complete'">`;

										template += (elem.noselection ? `<option value="">-</option>` : `<option value="" disabled>{{ 'select' | translate }}</option>`);

										template += `</select>
															<label for="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="active"
																	style="transform:translateY(-10%)">${elem.label}</label>
															</div>`;
										break;

										case 'select':
										template = `<form-select formid='${formid}' inputid='${elem.id}' ngmCustomBeneficiaries='ngmCustomBeneficiaries' project='project' beneficiary='beneficiary'></form-select>`;

										break;
							}

							return template;
					};

					var linker = function (scope, element, attrs) {

							// TemplateService.getTemplates().then(function (response) {
									// var templates = response.data;
									var templates = [];

									var form = ``;

									if (!scope.project || !scope.project.beneficiariesFormConfig || !attrs.formid || !scope.project.beneficiariesFormConfig[attrs.formid] || !scope.project.beneficiariesFormConfig[attrs.formid].config) {
										form = `<div>beneficiariesFormConfig formid config is not defined</div>`;
									} else {
										var config = scope.project.beneficiariesFormConfig[attrs.formid].config;

										var configById;
										var byId;

										if (!scope.project.beneficiariesFormConfig[attrs.formid].configById) byId = true; configById = {};

										angular.forEach(config.rows, function (row, i) {
											form += `<div class="row">`;
											angular.forEach(row, function (columns, j) {
												angular.forEach(columns, function (elem, k) {
													if (byId) configById[elem.id] = elem;
													form += getTemplate(templates, elem, attrs.formid);
												});
											})
											form += `</div>`;
										})
								  }
									element.html(form);

									if (byId) scope.project.beneficiariesFormConfig[attrs.formid].configById = configById;

									$compile(element.contents())(scope);
							// });
					};

					return {
							restrict: 'E',
							// transclude: true,
							link: linker,
							scope: false,
					};
			})
			.directive('formSelect', function ($compile) {
				var getTemplate = function (templates, elem) {
						var template = '<div>test</div>';
									template = `<div class="input-field col ${elem.class}">
													<select materialize-select ${elem.watch ? `watch ` : ``}id="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}"
															name="${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="validate"
															ng-model="beneficiary.${elem.model}" ng-change="ngmCustomBeneficiaries.updateName( project.beneficiaries_lists.${elem.list}, '${elem.id}', '${elem.name}', beneficiary );
																	ngmCustomBeneficiaries.inputChange( 'ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}' );"
															ng-options="${elem.options}"
															ng-disabled="project.definition.project_status === 'complete' || project.report.report_status === 'complete'">`;

									template += (elem.noselection ? `<option value="">-</option>` : `<option value="" disabled>{{ 'select' | translate }}</option>`);

									template += `</select>
														<label for="ngm-${elem.id}-{{ $locationIndex }}-{{ $beneficiaryIndex }}" class="active"
																style="transform:translateY(-10%)">${elem.label}</label>
														</div>`;


						return template;
				};

				var linker = function (scope, element, attrs) {

								var templates = [];

								var form = ``;

								form += getTemplate(templates, scope.project.beneficiariesFormConfig[attrs.formid].configById[attrs.inputid]);

								element.html(form);

								$compile(element.contents())(scope);

				};

				return {
						restrict: 'E',
						// transclude: true,
						link: linker,
						scope: false,
						// scope: {
						// 	formConfig: '=',
						// 	ngmCustomBeneficiaries: '&',
						// 	project: '=',
						// 	beneficiary: '=',
						// 	config: '='
						// }
				};
		});
