angular.module('ngm.widget.global.form.beneficiaries', ['ngm.provider'])
    .config(function (dashboardProvider) {
        dashboardProvider
            .widget('global.form.beneficiaries', {
                title: 'Global Form Beneficiaries Form',
                description: 'Global Form Beneficiaries Form',
                controller: 'GlobalBeneficiariesFormCtrl',
                templateUrl: '/scripts/modules/custom/views/forms/config/beneficiaries.list.html'
            });
    })
    .controller('GlobalBeneficiariesFormCtrl', [
        '$scope',
        'config',
        'ngmUser',
        'ngmAuth',
        'ngmData',
        '$http',
        '$timeout',
        '$filter',
        '$location',
        function (
            $scope,
            config,
            ngmUser,
            ngmAuth,
            ngmData,
            $http,
            $timeout,
            $filter,
            $location
        ) {

            $scope.inputString = true;

            $scope.master = {
                // current user
                user: ngmUser.get(),
                definition: config.definition,
                validate: function () {
                    json = JSON.parse($scope.master.definition)
                    missing = '';

                    if (!json.activity) {
                        missing += 'activity </br>'

                    }
                    if(missing !==''){
                        M.toast({ html: 'Please Put The missing atribute below </br>' + missing, displayLength: 4000, classes: 'error' });
                    } else{
                        $scope.master.save();
                    }

                    
                },
                // save: function () {
                //     $scope.master.definition

                //     // console.log($scope.master.config, json)
                // },
                switchInputFile: function(){
                    $scope.inputString = !$scope.inputString;
                },

                uploadFileConfig: {
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
                            var ext = drop_zone.getAcceptedFiles()[0].name.split('.').pop();
                            if (ext === 'csv') {
                                var file = drop_zone.getAcceptedFiles()[0],
                                    read = new FileReader();

                                read.readAsBinaryString(file);

                                read.onloadend = function () {
                                    var csv_string = read.result
                                    csv_array = Papa.parse(csv_string).data;
                                }

                                var previews = document.querySelectorAll(".dz-preview");
                                previews.forEach(function (preview) {
                                    preview.style.display = 'none';
                                })
                                document.querySelector(".dz-default.dz-message").style.display = 'none';
                                document.querySelector(".percent-upload").style.display = 'block';

                                $timeout(function () {
                                    document.querySelector(".percent-upload").style.display = 'none';
                                    drop_zone.removeAllFiles(true);
                                    $scope.master.definition = '{ "activity": "csv" }';
                                    $scope.master.validate()
                                },2000)

                            } else {
                                file = drop_zone.getAcceptedFiles()[0]
                                const wb = new ExcelJS.Workbook();
                                drop_zone.getAcceptedFiles()[0].arrayBuffer().then((data) => {
                                    var result = []
                                    wb.xlsx.load(data).then(workbook => {
                                        const book = [];
                                        var book_obj = [];

                                        workbook.eachSheet((sheet, index) => {
                                            // get only the first sheet
                                            if (index === 1) {
                                                const sh = [];
                                                sheet.eachRow(row => {
                                                    sh.push(row.values);
                                                });
                                                book.push(sh);
                                            }
                                        });

                                        var previews = document.querySelectorAll(".dz-preview");
                                        previews.forEach(function (preview) {
                                            preview.style.display = 'none';
                                        })
                                        document.querySelector(".dz-default.dz-message").style.display = 'none';
                                        document.querySelector(".percent-upload").style.display = 'block';

                                        $timeout(function () {
                                            document.querySelector(".percent-upload").style.display = 'none';
                                            drop_zone.removeAllFiles(true);
                                            $scope.master.definition = '{ "activity": "excel" }';
                                            $scope.master.validate()
                                        },2000)
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

                init: function () {

                },
                remove: function (id) {
                    // setReportRequest
                    // var setReportRequest = {
                    //     method: 'POST',
                    //     url: ngmAuth.LOCATION + '/api/custom/config/deleteCustomBeneficiariesForm/',
                    //     params:{id : id}
                    // }

                    // // set report
                    // $http(setReportRequest).success(function () {

                    // })
                },
                save: function(){
                    // setReportRequest
                    // var setReportRequest = {
                    //     method: 'POST',
                    //     url: ngmAuth.LOCATION + '/api/custom/config/saveCustomBeneficiariesForm',
                    //     data: $scope.master.definition
                    // }

                    // // set report
                    // $http(setReportRequest).success(function () {

                    // })
                    $location.path('/custom/config/beneficiaries-forms/')
                }
            }

            $scope.master.init();

        }])