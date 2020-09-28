angular.module("ngm.materialize.form", [])
				// https://github.com/simpulton/angular-dynamic-templates
        .directive('formBeneficiaries', function ($compile) {
					var getTemplate = function (templates, elem) {
							var template = '';
							switch (elem.input_type) {
									case 'select':
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
							}

							return template;
					};

					var linker = function (scope, element, attrs) {

							// TemplateService.getTemplates().then(function (response) {
									// var templates = response.data;
									var templates = [];

									var form = ``;

									var config = scope.beneficiaryConfig ? scope.beneficiaryConfig : JSON.parse(attrs.config);

									angular.forEach(config.rows, function (row, i) {
										form += `<div class="row">`;
										angular.forEach(row, function (columns, j) {
											angular.forEach(columns, function (elem, k) {
												form += getTemplate(templates, elem);
											});
										})
										form += `</div>`;
									})
									element.html(form);

									$compile(element.contents())(scope);
							// });
					};

					return {
							restrict: 'E',
							link: linker,
							scope: false
					};
			});
