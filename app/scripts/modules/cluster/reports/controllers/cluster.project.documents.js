/**
 * @ngdoc function
 * @name ngmReportHubApp.controller:ClusterProjectDocumentCtrl
 * @description
 * # ClusterProjectDetailsCtrl
 * Controller of the ngmReportHub
 */
angular.module('ngmReportHub')
	.controller('ClusterProjectDocumentCtrl', ['$scope', '$rootScope', '$route', '$location', '$anchorScroll', '$timeout','$sce','$http', 'ngmAuth', 'ngmData', 'ngmUser', 'ngmClusterHelper', function ($scope, $rootScope, $route, $location, $anchorScroll, $timeout,$sce,$http, ngmAuth, ngmData, ngmUser, ngmClusterHelper) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		// init empty model
		$scope.model = {
			rows: [{}]
		}

		// empty Project
		$scope.report = {

			// parent
			ngm: $scope.$parent.ngm,

			// current user
			user: ngmUser.get(),

			// placeholders
			title: '',
			subtitle: '',

			// current report
			// report: 'report' + $location.$$path.replace(/\//g, '_') + '-extracted-' + moment().format('YYYY-MM-DDTHHmm'),

			// the header navigation settings
			getHeaderHtml: function(){
				var html = '<div class="row">'
										+'<div class="col s12 m12 l12">'
											+'<div style="padding:20px;">'
												+'<a class="btn-flat waves-effect waves-teal" href="#/cluster/projects/summary/' + $scope.report.project.id +'">'
													+'<i class="material-icons left">keyboard_return</i>Back to Project Summary'
												+'</a>'
												+'<span class="right" style="padding-top:8px;">Last Updated: ' + moment( $scope.report.project.updatedAt ).format( 'DD MMMM, YYYY @ h:mm:ss a' ) +'</span>'
											+'</div>'
										+'</div>'
									+'</div>';

				return html;
			},

			// get organization
			getOrganization: function( organization_id ){

				// return http
				return {
					method: 'POST',
					url: ngmAuth.LOCATION + '/api/getOrganization',
					data: {
						'organization_id': organization_id
					}
				}
			},

			// set project details
			setUpload: function (data) {

				// org id
				$scope.report.organization_id =
						$route.current.params.organization_id ? $route.current.params.organization_id : ngmUser.get().organization_id;

				// org tag
				$scope.report.organization_tag =
				$route.current.params.organization_tag ? $route.current.params.organization_tag : ngmUser.get().organization_tag;

				// get data
				ngmData
					.get( $scope.report.getOrganization( $scope.report.organization_id ) )
					.then( function( organization ){
					$scope.model.header.download.downloads[0].request.data.report = organization.organization_tag  +'_projects-extracted-' + moment().format( 'YYYY-MM-DDTHHmm' );
					// set model titles
					$scope.model.header.title.title = organization.admin0name.toUpperCase().substring(0, 3) + ' | ' + organization.cluster.toUpperCase() + ' | ' + organization.organization + ' | Documents';
					// $scope.model.header.subtitle.title = organization.cluster + ' projects for ' + organization.organization + ' ' + organization.admin0name;

				});

				// assign data
				$scope.report.project = data;

				// add project code to subtitle?

				$scope.report.subtitle = $scope.report.project.project_title + '- Documents' ;

				// report dashboard model
				$scope.model = {
					name: 'cluster_project_documents',
					header: {
						div: {
							'class': 'col s12 m12 l12 report-header',
							style: 'border-bottom: 3px ' + $scope.report.ngm.style.defaultPrimaryColor + ' solid;'
						},
						title: {
							'class': 'col s12 m9 l9 report-title truncate',
							style: 'font-size: 3.4rem; color: ' + $scope.report.ngm.style.defaultPrimaryColor,
							title: $scope.report.title
						},
						subtitle: {
							'class': 'col s12 m12 l12 report-subtitle truncate hide-on-small-only',
							'title': $scope.report.subtitle
						},
						download: {
							'class': 'col s12 m3 l3 hide-on-small-only',
							downloads: [{
								type: 'all',
								color: 'blue lighten-2',
								icon: 'assignment',
								hover: 'Download all document project ' + $scope.report.project.project_title,
								request: {
									method: 'POST',
									url: ngmAuth.LOCATION + '/api/cluster/project/getProjects',
									data: {
										report: $scope.report.report,
										details: 'projects',
										query: { project_id: $scope.report.project.id },
										csv: true
									}
								},
								metrics: {
									method: 'POST',
									url: ngmAuth.LOCATION + '/api/metrics/set',
									data: {
										organization: $scope.report.user.organization,
										username: $scope.report.user.username,
										email: $scope.report.user.email,
										dashboard: $scope.report.project.project_title,
										theme: 'cluster_project_details',
										format: 'csv',
										url: $location.$$path
									}
								}
							}]
						}
					},
					rows: [{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								config: {
									html: $scope.report.getHeaderHtml()
								}
							}]
						}]
					},{
						columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'dropzone',
								config:{
									params: { project_id: $scope.report.project.id, username: $scope.report.user.username, organization_tag: $scope.report.user.organization_tag, admin0pcode: $scope.report.user.admin0pcode },
									templateUrl: '/scripts/widgets/ngm-dropzone/template/upload.html',
									openModal: function (modal) {
										$('#' + modal).openModal({ dismissible: false });
									},
									previewTemplate: `	<div class="dz-preview dz-processing dz-image-preview dz-success dz-complete">
																			<div class="dz-image">
																				<img data-dz-thumbnail>
																			</div>
																			<div class="dz-details">
																				<div class="dz-size">
																					<span data-dz-size>
																				</div>
																				<div class="dz-filename">
																					<span data-dz-name></span>
																				</div>
																			</div>
																			<div data-dz-remove class=" remove-upload btn-floating red" style="margin-left:35%; "><i class="material-icons">clear</i></div> 
																		</div>`,
									completeMessage: '<i class="medium material-icons" style="color:#009688;">cloud_done</i><br/><h5 style="font-weight:300;">Complete!</h5><br/><h5 style="font-weight:100;"><div id="add_doc" class="btn"><i class="small material-icons">add_circle</i></div></h5></div>',
									url: ngmAuth.LOCATION + '/api/uploadGDrive',
									acceptedFiles: 'image/*,application/pdf',
									maxFiles: 3,
									accept:function(file,done){
										done(); 
										console.log(file)
										$("#upload_doc").prop("disabled", false);
									},
									addRemoveLinks: false,
									autoProcessQueue:false,
									headers: { 'Authorization': 'Bearer ' + $scope.report.user.token },
									successMessage: false,
									dictDefaultMessage: 
										`<i class="medium material-icons" style="color:#009688;">cloud_upload</i> <br/>Drag files here or click button to upload `,
									process: {
									},
									setRedirect:function () {
										console.log("redirect")
									},
									init:function(){
										myDropzone=this;
										$("#upload_doc").attr("disabled",true);
										$("#delete_doc").attr("disabled", true);

										document.getElementById('upload_doc').addEventListener("click", function () {
											// enable auto process queue after uploading started
											myDropzone.autoProcessQueue = true;
											myDropzone.processQueue(); // Tell Dropzone to process all queued files.																						
										});

										document.getElementById('delete_doc').addEventListener("click", function () {
											myDropzone.removeAllFiles(true);
										});

										this.on("addedfile", function (file) {
											var ext = file.name.split('.').pop();
											console.log(ext);
											if(ext=='pdf' && ext !=='png'){
												$(file.previewElement).find(".dz-image img").attr("src", "images/pdfm.png");
											}
											// if(ext=='doc' && ext !=='png'){
											// 	$(file.previewElement).find(".dz-image img").attr("src", "images/docm.png");
											// }											
											$("#upload_doc").removeAttr("disabled");
											$("#delete_doc").attr("disabled", false);
										});

										this.on("maxfilesexceeded", function (file) {
											// alert("No more files please!");											
											// this.removeFile(file);
											$('#exceed-file').openModal({ dismissible: false });
											$("#upload_doc").attr("disabled", true);
											$("#delete_doc").attr("disabled", true);
										});

										this.on("removedfile",function(file){
											if (myDropzone.files.length<1){
												$("#upload_doc").attr("disabled", true);
												$("#delete_doc").attr("disabled", true);
											}

											if (myDropzone.files.length <= 3 && myDropzone.files.length >0){
												$("#upload_doc").attr("disabled", false);
												$("#delete_doc").attr("disabled", false);
											}
										});

										this.on("reset",function(){
											console.log("reset");
										});
										
										myDropzone.on("complete", function (file) {
											if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
												myDropzone.removeAllFiles(true); 
											}
											$rootScope.$broadcast('refresh:doclist');

											
											
										});
									},
									success:function(){
										console.log("success");
									},
									error:function(){									
										console.log('error');
									}
								}
							}]
						}]
						}, {
							columns: [{
								styleClass: 's12 m12 l12',
								widgets: [{
									type: 'list',
									card: 'white grey-text text-darken-2',
									config: {
										refreshEvent: 'refresh:doclist',
										titleIcon: 'alarm_on',
										color: 'blue lighten-4',
										itemsPerPage: 6,
										openModal: function (modal,link) {
											$('#' + modal).openModal({ dismissible: false });
											if(link!==''){
												if(modal === 'close-preview-modal'){
													$scope.linkPreview= link;
												}else{
													// $scope.linkPreview = "https://docs.google.com/gview?url=" + 'https://drive.google.com/open?id=1ZpJUQkfQbZII1ZB7jUbb12uxUW8USahu' +"&embedded=true";
													// $scope.linkPreview = "http://docs.google.com/gview?embedded=true&url="+link;
													
													// if its from google drive; link in here is id of google drive  file
													$scope.linkPreview = "https://drive.google.com/file/d/"+link+"/preview"
												}
											}
										},
										extentionIcon:function(text){
											text = text.toLowerCase().replace(/\./g, '')
											if(text=='pdf'){
												return 'insert_drive_file'
											}
											if(text=='png'||text=='jpg'||text=='jpeg'){
												return 'photo_size_select_actual'
											}
											
											// return 'insert_drive_file'
										},
										extentionColor:function(text){
											text = text.toLowerCase().replace(/\./g, '')
											if (text == 'pdf' || text == 'doc') {												
												return '#2196f3 !important'
											}
											if (text == 'png' || text == 'jpg' || text == 'jpeg') {
												return '#f44336 !important'
											}
										},
										removeFile:function(){
											// IF API READY TO USE
											Materialize.toast("Deleting...", 2000, 'note'); 
											$http({
												method: 'DELETE',
												url: ngmAuth.LOCATION + '/api/deleteGDriveFile/' + $scope.fileId,
												headers: { 'Authorization': 'Bearer ' + $scope.report.user.token },
											})
											.success(function (result){
														$timeout(function () {															
															msg="File Deleted!";
															typ = 'success';
															Materialize.toast(msg, 2000, typ); 
														}, 2000);														
											})
											.error(function (err){
												$timeout(function () {
													msg = "Error, File Not Deleted!";
													typ = 'error';
													Materialize.toast(msg, 2000, typ);
												}, 2000);
											})
										},
										setRemoveId:function(id){
											$scope.fileId = id;
										},
										setLink: function(){
											// return $scope.linkPreview
											return $sce.trustAsResourceUrl($scope.linkPreview);
										},
										setDonwloadLink:function(id){
											var donwloadLink ="https://drive.google.com/uc?export=download&id="+id;
											return donwloadLink;
										},
										setThumbnailfromGdrive:function(id,file_type){
											// "https://drive.google.com/uc?export=view&id=0B5f9FCicz5ZIYV9OLVhVa2pMNEk"
											// file_type = file_type.toLowerCase().replace(/\./g, '')
											// if(file_type == 'pdf' || file_type == 'doc'){
											// 	pdf = "images/cluster/details-1.jpg"
											// 	return pdf
											// }else if(file_type== 'png'|| file_type=='jpg'){
												img = "https://drive.google.com/thumbnail?authuser=0&id="+id;
												return img
											// } else{
											// 	return "images/cluster/details-1.jpg"
											// }
										},
										// textColor: 'white-text',
										title: 'Upload',
										hoverTitle: 'Update',
										icon: 'edit',
										rightIcon: 'watch_later',
										templateUrl: 'scripts/widgets/ngm-list/template/list_upload.html',
										// request:{
										// 	method: 'GET',
										// 	url: 'http://www.mocky.io/v2/5c6e1fab2c0000b100c04e92',
										// },
										// IF API READY USE THIS ONE

										request: {
											method: 'GET',
											url: ngmAuth.LOCATION + '/api/listProjectDocuments/' + $route.current.params.project
										}
										// data: $scope.uploads										
									}
								}]
							}]

					},{columns: [{
							styleClass: 's12 m12 l12',
							widgets: [{
								type: 'html',
								card: 'card-panel',
								style: 'padding:0px; height: 90px; padding-top:10px;',
								config: {
									html: $scope.report.ngm.footer
								}
							}]
						}]
					}]
				}

				// assign to ngm app scope
				$scope.report.ngm.dashboard.model = $scope.model;

			}

		}

		// Run page

		// dummy-data for list uploads
		$scope.uploads = [
			{
				name: "TEXT_UPLOAD",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.doc",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.doc",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.doc",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.doc",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.doc",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'insert_drive_file',
				color: "blue",
				colorStyle: '#2196f3'
			},
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			}, 
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			},
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			},
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			},
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			},
			{
				name: "cod.png",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'photo_size_select_actual',
				color: "red",
				colorStyle: '#f44336'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			},
			{
				name: "cod.pdf",
				modif: "august 28th,2018",
				created: "Fakhri Hawari",
				iconFile: 'gif',
				color: "teal",
				colorStyle: '#26a69a'
			}

		];
		$scope.dummydata = [
			{
				"fileid_local": "19c39c12-5ad6-4029-9e5b-24d9d1ccaf03.pdf",
				"fileid": "1ZpJUQkfQbZII1ZB7jUbb12uxUW8USahu",
				"mime_type": "application/pdf",
				"filename": "ReportHub_User_Guide (1).pdf",
				"filename_extension": ".pdf",
				"project_id": "5b66987dde11422c1de7ed88",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T15:36:34.718Z",
				"updatedAt": "2019-02-20T15:36:34.718Z",
				"id": "5c6d7402bb95d4021ab04a17"
			},
			{
				"fileid_local": "46dc01ce-d907-4133-a06a-a2f61bbb1d91.pdf",
				"fileid": "0B5f9FCicz5ZIRERDVWRkS2RoOVk",
				"mime_type": "application/pdf",
				"filename": "ReportHub_User_Guide (1).pdf",
				"filename_extension": ".pdf",
				"project_id": "0B5f9FCicz5ZIdWJES0c0Z2NQVjA",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T15:45:16.474Z",
				"updatedAt": "2019-02-20T15:45:16.474Z",
				"id": "5c6d760cbb95d4021ab04a1a"
			},
			{
				"fileid_local": "2dfbb528-b448-4dd9-b518-e0e0c66ceff0.pdf",
				"fileid": "1-MfdYEYkcwLb64CsT4Ia97QL7I9zWeqp",
				"mime_type": "application/pdf",
				"filename": "Fly America Act (FAA) Waiver checklist.pdf",
				"filename_extension": ".pdf",
				"project_id": "5b66987dde11422c1de7ed88",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T16:08:11.174Z",
				"updatedAt": "2019-02-20T16:08:11.174Z",
				"id": "5c6d7b6b31d49b151bdd84f1"
			},
			{
				"fileid_local": "f3fb175d-970d-436a-84d6-e502e0fe6b7e.pdf",
				"fileid": "11rugQ38U5ThITHwpDvp6QJf6OqdxWI2z",
				"mime_type": "application/pdf",
				"filename": "ReportHub_User_Guide (1).pdf",
				"filename_extension": ".pdf",
				"project_id": "5b66987dde11422c1de7ed88",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T16:08:14.399Z",
				"updatedAt": "2019-02-20T16:08:14.399Z",
				"id": "5c6d7b6e31d49b151bdd84f2"
			},
			{
				"fileid_local": "8c4f951c-105e-4778-9d8d-e968cfd337ab.pdf",
				"fileid": "1znaZqQvVeswG_RFQU1Qt3cRi4Di77Y6v", 
				"mime_type": "application/pdf",
				"filename": "Fly America Act (FAA) Waiver checklist.pdf",
				"filename_extension": ".pdf",
				"project_id": "5b66987dde11422c1de7ed88",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T16:08:30.927Z",
				"updatedAt": "2019-02-20T16:08:30.927Z",
				"id": "5c6d7b7e31d49b151bdd84f3"
			},
			{
				"fileid_local": "d82580cb-2263-42be-aa0c-be205ac31bd8.pdf",
				"fileid": "1ydCarfxZ29ISTdFhPVEJgxz_M-aisQAI",
				"mime_type": "application/pdf",
				"filename": "ReportHub_User_Guide (1).pdf",
				"filename_extension": ".pdf",
				"project_id": "5b66987dde11422c1de7ed88",
				"fileowner": "user",
				"admin0pcode": "AF",
				"organization_tag": "immap",
				"createdAt": "2019-02-20T16:08:34.094Z",
				"updatedAt": "2019-02-20T16:08:34.094Z",
				"id": "5c6d7b8231d49b151bdd84f4"
			}
		]

		// return project
		ngmData.get({
			method: 'POST',
			url: ngmAuth.LOCATION + '/api/cluster/project/getProject',
			data: {
				id: $route.current.params.project
			}
		}).then(function (data) {
			// assign data
			$scope.report.setUpload(data);
		});

	}]);
