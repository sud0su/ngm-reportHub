/**
 * @name ngmReportHub.factory:ngmClusterHelper
 * @description
 * # ngmClusterHelper
 * Manages browser local storage
 *
 */
angular.module('ngmReportHub')
    .factory('ngmCustomLocations', ['$http', '$filter', '$timeout', 'ngmAuth', '$translate', '$rootScope', 'ngmCustomBeneficiaries', 'ngmCbLocations', function ($http, $filter, $timeout, ngmAuth, $translate, $rootScope, ngmCustomBeneficiaries, ngmCbLocations) {

        ngmCustomLocations = {

            openAddNewLocation: false,

            new_location: {},

            // open new locaiton form in monthly report 
            openNewLocation: function (project, locations) {
                ngmCustomLocations.new_location = ngmCustomLocations.addLocation(project.definition, locations);
                // set adminSitesSelect
                angular.forEach(project.report.locations, function (d, i) {
                    if (!project.lists.adminSitesSelect[i]) {
                        project.lists.adminSitesSelect[i] = angular.copy(project.lists.adminSites);
                    }
                });
                // trigger form update
                ngmCustomLocations.adminOnChange(project.lists, 'admin3pcode', locations.length - 1, ngmCustomLocations.new_location.admin3pcode, ngmCustomLocations.new_location);
                ngmCustomLocations.filterLocations(project, 0, ngmCustomLocations.new_location)
                ngmCustomLocations.setSiteTypeAndImplementationSelect(project);
                // lists, pcode, $index, $data, target_location
                ngmCustomLocations.openAddNewLocation = !ngmCustomLocations.openAddNewLocation;
            },

            // add new_location
            addNewLocation: function (project, new_location) {
                // create new beneficiaries holder
                console.log(new_location);
                new_location.beneficiaries = [{}];
                project.report.locations.push(new_location);
                // reset new_location
                ngmCustomLocations.new_location = {};
                ngmCustomLocations.openAddNewLocation = false;
                // send toast message
                $timeout(function () {
                    // Materialize.toast( $filter('translate')('report_new_location') , 4000, 'success' ); 
                    M.toast({ html: $filter('translate')('report_new_location'), displayLength: 4000, classes: 'success' });
                }, 600);
            },

            // add new_location
            addAdhocNewLocation: function (project, new_location) {
                // create new beneficiaries holder
                new_location.beneficiaries = [];
                new_location.project_id = project.definition.id;
                new_location.project_title = project.definition.project_title
                new_location.project_description = project.definition.project_description
                new_location.project_start_date = project.definition.project_start_date
                new_location.project_end_date = project.definition.project_end_date
                new_location.organization_id = project.definition.organization_id
                new_location.organization_tag = project.definition.organization_tag
                new_location.organization = project.definition.organization
                new_location.reporting_period_type = project.definition.reporting_period_type
                new_location.report_type_id = project.definition.report_type_id
                new_location.report_type_name = project.definition.report_type_name
                new_location.reporting_period = project.report.reporting_period
                new_location.reporting_period_end = project.report.reporting_period_end
                new_location.reporting_due_date = project.report.reporting_due_date

                if (!new_location.site_lng && !new_location.site_lat) {
                    // set admin4, admin3 or admin2
                    if (new_location.admin2lng && new_location.admin2lat) {
                        new_location.site_id = new_location.admin2pcode;
                        new_location.site_lng = new_location.admin2lng;
                        new_location.site_lat = new_location.admin2lat;
                    }
                    if (new_location.admin3lng && new_location.admin3lat) {
                        new_location.site_id = new_location.admin3pcode;
                        new_location.site_lng = new_location.admin3lng;
                        new_location.site_lat = new_location.admin3lat;
                    }
                    if (new_location.admin4lng && new_location.admin4lat) {
                        new_location.site_id = new_location.admin4pcode;
                        new_location.site_lng = new_location.admin4lng;
                        new_location.site_lat = new_location.admin4lat;
                    }
                    if (new_location.admin5lng && new_location.admin5lat) {
                        new_location.site_id = new_location.admin5pcode;
                        new_location.site_lng = new_location.admin5lng;
                        new_location.site_lat = new_location.admin5lat;
                    }
                }
                project.report.locations.push(new_location);
                // reset new_location
                ngmCustomLocations.new_location = {};
                ngmCustomLocations.openAddNewLocation = false;
                // send toast message
                $timeout(function () {
                    // Materialize.toast( $filter('translate')('report_new_location') , 4000, 'success' ); 
                    M.toast({ html: $filter('translate')('report_new_location'), displayLength: 4000, classes: 'success' });
                }, 600);
            },
            // add location
            addLocation: function (project, locations) {

                // reporter
                var inserted = {
                    name: project.name,
                    position: project.position,
                    phone: project.phone,
                    email: project.email,
                    username: project.username
                }

                // add site select if admin0pcode !== 'CB'
                if (project.admin0pcode !== 'CB') {
                    inserted.site_list_select_id = 'no';
                    inserted.site_list_select_yes = 'No';
                    inserted.site_list_select_disabled = true;
                }

                // clone
                var length = locations.length;
                if (length) {
                    var l = angular.copy(locations[length - 1]);
                    delete l.id;
                    delete l.createdAt;
                    delete l.updatedAt;
                    // if not CXB
                    if (project.admin0pcode !== 'CB') {
                        l.site_hub_id = null;
                        l.site_hub_name = null;
                        l.site_id = null;
                        l.site_name = null;
                        l.site_lat = null;
                        l.site_lng = null;
                    }
                    inserted = angular.merge(inserted, l);
                }
                if (project.implementing_partners && project.implementing_partners.length > 0 && length < 1) {
                    inserted.implementing_partners = angular.copy(project.implementing_partners)
                }

                // set createdAt
                inserted.createdAt = new Date().toISOString();

                // set targets
                return inserted;
            },

            // remove location from location list
            removeLocationModal: function (project, id) {
                ngmCustomLocations.project = project;
                ngmCustomLocations.remove_id = id;
                // $( '#location-modal' ).openModal({ dismissible: false });
                $('#location-modal').modal({ dismissible: false });
                $('#location-modal').modal('open');
            },

            // remove beneficiary
            removeLocation: function () {

                // remove from array
                ngmCustomLocations.project.definition.target_locations =
                    $filter('filter')(ngmCustomLocations.project.definition.target_locations, { id: '!' + ngmCustomLocations.remove_id }, true);

                // trigger ngmCbLocations set form 
                ngmCbLocations.setLocationsForm(ngmCustomLocations.project, ngmCustomLocations.project.definition.target_locations);

                // remove at db
                $http({
                    method: 'POST',
                    url: ngmAuth.LOCATION + '/api/cluster/project/removeLocation',
                    data: { id: ngmCustomLocations.remove_id }
                }).success(function (result) {
                    // Materialize.toast( $filter('translate')('project_location_removed') , 3000, 'success' );
                    M.toast({ html: $filter('translate')('project_location_removed'), displayLength: 3000, classes: 'success' });
                    // Broadcast event to notify listeners that a location has been removed
                    $rootScope.$broadcast('remove_location', ngmCustomLocations.remove_id);
                }).error(function (err) {
                    // Materialize.toast( 'Error!', 6000, 'error' );
                    M.toast({ html: 'Error!', displayLength: 6000, classes: 'error' });
                });
            },

            showReporter: function (lists, $data, target_location) {
                var selected = [];
                target_location.username = $data;
                if (target_location.username) {
                    // filter selection
                    selected = $filter('filter')(lists.users, { username: target_location.username }, true);
                    if (selected && selected.length) {
                        var reporter = {
                            name: selected[0].name,
                            position: selected[0].position,
                            phone: selected[0].phone,
                            email: selected[0].email,
                            username: selected[0].username
                        }
                        angular.merge(target_location, reporter);
                    }
                }
                return selected && selected.length ? selected[0].username : '-';
            },

            // show location group name
            // showLocationGroup: function( lists, $data, target_location ){
            //   var selected = [];
            //   target_location.location_group_id = $data;
            //   if( target_location.username ) {
            //     // filter selection
            //     selected = $filter('filter')( lists.location_groups, { location_group_id: target_location.location_group_id }, true );
            //     target_location.location_group_name = selected[0].location_group_name;
            //   }
            //   return selected && selected.length ? selected[0].location_group_name : '-';
            // },

            // site implementation
            showSiteImplementation: function (lists, $data, target_location) {
                var selected = [];
                target_location.site_implementation_id = $data;
                if (target_location.site_implementation_id) {
                    selected = $filter('filter')(lists.site_implementation, { site_implementation_id: target_location.site_implementation_id }, true);
                    target_location.site_implementation_name = selected[0].site_implementation_name;
                }
                return selected.length ? selected[0].site_implementation_name : '-';
            },

            // get sites
            getAdminSites: function (lists, admin0pcode, pcode, $index, $data, target_location) {

                // fetch
                $timeout(function () {

                    // admin3
                    if (lists.admin3.length) {
                        var selected_admin3 = $filter('filter')(lists.admin3, { admin1pcode: target_location.admin1pcode }, true);
                        if (!selected_admin3.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin3List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + target_location.admin1pcode
                            }).success(function (result) {
                                var selected_admin3 = $filter('filter')(lists.admin3, { admin1pcode: target_location.admin1pcode }, true);
                                if (!selected_admin3.length) {
                                    lists.admin3 = lists.admin3.concat(result);
                                    ngmCustomLocations.adminOnChange(lists, pcode, $index, $data, target_location);
                                }
                            });
                        }
                    }

                    // admin4
                    if (lists.admin4.length) {
                        var selected_admin4 = $filter('filter')(lists.admin4, { admin1pcode: target_location.admin1pcode }, true);
                        if (!selected_admin4.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin4List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + target_location.admin1pcode
                            }).success(function (result) {
                                var selected_admin4 = $filter('filter')(lists.admin4, { admin1pcode: target_location.admin1pcode }, true);
                                if (!selected_admin4.length) {
                                    lists.admin4 = lists.admin4.concat(result);
                                    ngmCustomLocations.adminOnChange(lists, pcode, $index, $data, target_location);
                                }
                            });
                        }
                    }

                    // admin5
                    if (lists.admin5.length) {
                        var selected_admin5 = $filter('filter')(lists.admin5, { admin1pcode: target_location.admin1pcode }, true);
                        if (!selected_admin5.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin5List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + target_location.admin1pcode
                            }).success(function (result) {
                                var selected_admin5 = $filter('filter')(lists.admin5, { admin1pcode: target_location.admin1pcode }, true);
                                if (!selected_admin5.length) {
                                    lists.admin5 = lists.admin5.concat(result);
                                    ngmCustomLocations.adminOnChange(lists, pcode, $index, $data, target_location);
                                }
                            });
                        }
                    }

                    // sites
                    var selected_sites = $filter('filter')(lists.adminSites, { admin1pcode: target_location.admin1pcode }, true);
                    if (!selected_sites.length) {
                        $http({
                            method: 'GET',
                            url: ngmAuth.LOCATION + '/api/list/getAdminSites?admin0pcode='
                                + admin0pcode
                                + '&admin1pcode=' + target_location.admin1pcode
                        }).success(function (result) {
                            var selected_sites = $filter('filter')(lists.adminSites, { admin1pcode: target_location.admin1pcode }, true);
                            if (!selected_sites.length) {
                                lists.adminSites = lists.adminSites.concat(result);
                                ngmCustomLocations.adminOnChange(lists, pcode, $index, $data, target_location);
                            }
                        });
                    }

                }, 0);
            },

            // showadmin
            showAdmin: function (lists, parent_pcode, list, pcode, name, $index, $data, target_location) {

                // params
                var selected = [];

                // selection list
                if (target_location[parent_pcode]) {

                    // filter parent list
                    var search_parent_admin = {}
                    search_parent_admin[parent_pcode] = target_location[parent_pcode];
                    lists[list + 'Select'][$index] = $filter('filter')(lists[list], search_parent_admin, true);

                    // other (for ET lists)
                    var o_index, o_other;
                    angular.forEach(lists[list + 'Select'][$index], function (d, i) {
                        if (d.admin3name === 'Other') { o_index = i; o_other = d; }
                    });
                    if (o_other) {
                        lists[list + 'Select'][$index].splice(o_index, 1);
                        lists[list + 'Select'][$index].push(o_other);
                    }

                }

                // list selection
                target_location[pcode] = $data;
                if (target_location[pcode]) {

                    // filter
                    var search_admin = {}
                    search_admin[pcode] = target_location[pcode];

                    // get selection
                    selected = $filter('filter')(lists[list + 'Select'][$index], search_admin, true);
                    if (selected && selected[0] && selected[0].id) {
                        delete selected[0].id;
                        angular.merge(target_location, selected[0]);
                    }

                    // filter sites
                    lists.adminSitesSelect[$index] = $filter('filter')(lists.adminSites, search_admin, true);

                }

                // return name
                return selected && selected.length ? selected[0][name] : '-';
            },

            // site_type
            showSiteType: function (lists, $index, $data, target_location) {

                // attr
                var selected = [],
                    site_list = [];

                // filter by site_type
                target_location.site_type_id = $data;
                if (target_location.site_type_id) {

                    // select site type
                    selected = $filter('filter')(lists.site_type, { site_type_id: target_location.site_type_id }, true);
                    if (selected && selected.length) {
                        delete selected[0].id;
                        target_location.site_type_id = selected[0].site_type_id;
                        target_location.site_type_name = selected[0].site_type_name;
                    }

                }
                // return name
                return selected && selected.length ? selected[0].site_type_name : '-';
            },


            // on change
            adminOnChange: function (lists, pcode, $index, $data, target_location) {

                // set to null
                var site_list = [];
                target_location.site_id = null;
                target_location.site_list_select_disabled = false;

                // clear selections
                switch (pcode) {
                    case 'admin1pcode':
                        delete target_location.admin2pcode;
                        delete target_location.admin2name;
                        delete target_location.admin3pcode;
                        delete target_location.admin3name;
                        delete target_location.admin4pcode;
                        delete target_location.admin4name;
                        delete target_location.admin5pcode;
                        delete target_location.admin5name;
                        break;
                    case 'admin2pcode':
                        delete target_location.admin3pcode;
                        delete target_location.admin3name;
                        delete target_location.admin4pcode;
                        delete target_location.admin4name;
                        delete target_location.admin5pcode;
                        delete target_location.admin5name;
                        break;
                    case 'admin3pcode':
                        delete target_location.admin4pcode;
                        delete target_location.admin4name;
                        delete target_location.admin5pcode;
                        delete target_location.admin5name;
                        break;
                    case 'admin4pcode':
                        delete target_location.admin5pcode;
                        delete target_location.admin5name;
                        break;
                }

                // filter admin
                var search_site = {}
                search_site[pcode] = target_location[pcode];

                // admin1,2,3,4,5 get names
                if (target_location[pcode] && pcode !== 'site_type_id') {
                    var obj = {}
                    obj[pcode] = target_location[pcode];
                    var selected = $filter('filter')(lists[pcode.slice(0, -5)], obj, true);
                    // merge object
                    delete selected[0].id;
                    target_location = angular.merge(target_location, selected[0]);
                }

                // filter adminsites
                if (target_location.site_type_id) {
                    angular.merge(search_site, { site_type_id: target_location.site_type_id });
                }

                // apply filter
                site_list = $filter('filter')(lists.adminSitesSelect[$index], search_site, true);

                // set site selected
                if (site_list && site_list.length && target_location.site_type_id) {
                    target_location.site_list_select_id = 'yes';
                    target_location.site_list_select_name = 'Yes';
                    target_location.site_list_select_disabled = false;
                } else {
                    target_location.site_list_select_id = 'no';
                    target_location.site_list_select_name = 'No';
                    target_location.site_list_select_disabled = true;
                }

            },

            // select from list?
            showListYesNo: function (lists, $index, $data, target_location) {

                // sites        
                var selected = [];

                // set sites to null
                target_location.site_list_select_id = $data;

                // disabled false
                if (target_location.site_list_select_id && target_location.site_list_select_id === 'yes') {
                    target_location.site_list_select_disabled = false;
                }

                if (target_location.site_list_select_id) {
                    selected = $filter('filter')(lists.site_list_select, { site_list_select_id: target_location.site_list_select_id }, true);
                    target_location.site_list_select_name = selected[0].site_list_select_name;
                }
                // name
                return selected.length ? selected[0].site_list_select_name : '-';
            },

            // show sites
            showAdminSites: function (lists, $index, $data, target_location) {

                // display
                var selected = [];
                target_location.site_id = $data;
                if (target_location.site_id) {

                    // filter selection
                    selected = $filter('filter')(lists.adminSitesSelect[$index], { site_id: target_location.site_id }, true);
                    if (selected[0] && selected[0].id) {
                        delete selected[0].id;
                        angular.merge(target_location, selected[0]);
                    }
                }
                return target_location.site_name ? target_location.site_name : '-';
            },

            // site_name
            showSiteName: function ($data, target_location) {
                if ($data) { target_location.site_name = $data; }
                return target_location.site_name ? target_location.site_name : '';
            },

            // site_name
            showSiteNameAlternative: function ($data, target_location) {
                if ($data) { target_location.site_name_alternative = $data; }
                return target_location.site_name_alternative ? target_location.site_name_alternative : '';
            },

            // Function for new look location
            // to Update reporter 
            updateReporter: function (lists, location) {
                $timeout(function () {
                    var selected = [];
                    if (location.username) {
                        // filter selection
                        selected = $filter('filter')(lists.users, { username: location.username }, true);
                        if (selected && selected.length) {
                            var reporter = {
                                name: selected[0].name,
                                position: selected[0].position,
                                phone: selected[0].phone,
                                email: selected[0].email,
                                username: selected[0].username
                            }
                            angular.merge(location, reporter);
                        }
                    }
                }, 10)
            },
            // to update site implementation
            updateSiteImplementation: function (lists, location) {
                $timeout(function () {
                    var selected = [];
                    // if not select all the  option on list
                    if (!location.site_implementation_id) {
                        delete location.site_implementation_id;
                        delete location.site_implementation_name;
                    }
                    if (location.site_implementation_id) {
                        selected = $filter('filter')(lists.site_implementation, { site_implementation_id: location.site_implementation_id }, true);
                        location.site_implementation_name = selected[0].site_implementation_name;
                    }
                }, 10)
            },
            // to update site type
            updateSiteType: function (lists, location) {
                $timeout(function () {
                    // attr
                    var selected = [];
                    // if not select all the  option on list
                    if (!location.site_type_id) {
                        delete location.site_type_id;
                        delete location.site_type_name
                    }
                    // filter by site_type
                    if (location.site_type_id) {

                        // select site type
                        selected = $filter('filter')(lists.site_type, { site_type_id: location.site_type_id }, true);
                        if (selected && selected.length) {
                            location.site_type_id = selected[0].site_type_id;
                            location.site_type_name = selected[0].site_type_name;
                        }
                    }
                }, 10)
            },
            // to Update sit name
            updateAdminSite: function (location, $index) {
                $timeout(function () {
                    // display
                    var selected = [];
                    if (location.site_id) {

                        console.log($index);
                        console.log(location.site_id);
                        console.log(ngmCustomLocations.adminSitesSelect[$index].length);

                        // filter selection
                        selected = $filter('filter')(ngmCustomLocations.adminSitesSelect[$index], { site_id: location.site_id }, true);
                        if (selected[0] && selected[0].id) {
                            delete selected[0].id;

                            console.log(selected[0].site_name)

                            angular.merge(location, selected[0]);
                        }
                    }
                }, 10)
            },
            // to Update Site List
            updateYesorNo: function (lists, location) {
                $timeout(function () {
                    // sites        
                    var selected = [];

                    // disabled false
                    if (location.site_list_select_id && location.site_list_select_id === 'yes') {
                        location.site_list_select_disabled = false;
                    }

                    if (location.site_list_select_id) {
                        selected = $filter('filter')(lists.site_list_select, { site_list_select_id: location.site_list_select_id }, true);
                        location.site_list_select_name = selected[0].site_list_select_name;
                    }

                }, 10)
            },
            // fail
            updateGetAdminSites: function (lists, admin0pcode, location) {
                $timeout(function () {

                    // admin3
                    if (lists.admin3.length) {
                        var selected_admin3 = $filter('filter')(lists.admin3, { admin1pcode: location.admin1pcode }, true);
                        if (!selected_admin3.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin3List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + location.admin1pcode
                            }).success(function (result) {
                                var selected_admin3 = $filter('filter')(lists.admin3, { admin1pcode: location.admin1pcode }, true);
                                if (!selected_admin3.length) {
                                    lists.admin3 = lists.admin3.concat(result);

                                }
                            });
                        }
                    }

                    // admin4
                    if (lists.admin4.length) {
                        var selected_admin4 = $filter('filter')(lists.admin4, { admin1pcode: location.admin1pcode }, true);
                        if (!selected_admin4.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin4List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + location.admin1pcode
                            }).success(function (result) {
                                var selected_admin4 = $filter('filter')(lists.admin4, { admin1pcode: location.admin1pcode }, true);
                                if (!selected_admin4.length) {
                                    lists.admin4 = lists.admin4.concat(result);

                                }
                            });
                        }
                    }

                    // admin5
                    if (lists.admin5.length) {
                        var selected_admin5 = $filter('filter')(lists.admin5, { admin1pcode: location.admin1pcode }, true);
                        if (!selected_admin5.length) {
                            $http({
                                method: 'GET',
                                url: ngmAuth.LOCATION + '/api/list/getAdmin5List?admin0pcode='
                                    + admin0pcode
                                    + '&admin1pcode=' + location.admin1pcode
                            }).success(function (result) {
                                var selected_admin5 = $filter('filter')(lists.admin5, { admin1pcode: location.admin1pcode }, true);
                                if (!selected_admin5.length) {
                                    lists.admin5 = lists.admin5.concat(result);
                                }
                            });
                        }
                    }

                    // sites
                    var selected_sites = $filter('filter')(lists.adminSites, { admin1pcode: location.admin1pcode }, true);
                    if (!selected_sites.length) {
                        $http({
                            method: 'GET',
                            url: ngmAuth.LOCATION + '/api/list/getAdminSites?admin0pcode='
                                + admin0pcode
                                + '&admin1pcode=' + location.admin1pcode
                        }).success(function (result) {
                            var selected_sites = $filter('filter')(lists.adminSites, { admin1pcode: location.admin1pcode }, true);
                            if (!selected_sites.length) {
                                lists.adminSites = lists.adminSites.concat(result);
                            }
                        });
                    }

                }, 0);
            },
            // update location
            updateLocation: function (project, $index, list, key, location) {
                // selected
                var selected = [];

                // if site_id
                if (location[key]) {
                    var obj = {}
                    obj[key] = location[key];
                    var selected = $filter('filter')(list, obj, true);
                    if (selected && selected.length) {

                        // remove list id
                        delete selected[0].id;

                        // reset locations
                        location = ngmCustomLocations.resetLocations(project, key, location);
                        // merge object
                        location = angular.merge(location, selected[0]);
                        // filter the admin1,2,3,4,5 list
                        ngmCustomLocations.filterLocations(project, $index, location);

                    }

                }
            },
            // to filter Location admin 1,admin2,admin3,admin4,admin5 adminsite list
            filterLocations: function (project, $index, location) {

                // form filters 
                if (!ngmCustomLocations.admin1Select) {
                    ngmCustomLocations.admin1Select = []
                }
                if (!ngmCustomLocations.admin2Select) {
                    ngmCustomLocations.admin2Select = []
                }
                if (!ngmCustomLocations.admin3Select) {
                    ngmCustomLocations.admin3Select = []
                }
                if (!ngmCustomLocations.admin4Select) {
                    ngmCustomLocations.admin4Select = []
                }
                if (!ngmCustomLocations.admin5Select) {
                    ngmCustomLocations.admin5Select = []
                }
                if (!ngmCustomLocations.adminSitesSelect) {
                    ngmCustomLocations.adminSitesSelect = []
                }
                // set list admin1Select,admin2Select,etc and adminSitesSelect for each location 
                ngmCustomLocations.admin1Select[$index] = project.lists.admin1;
                ngmCustomLocations.admin2Select[$index] = project.lists.admin2;
                ngmCustomLocations.adminSitesSelect[$index] = angular.copy(project.lists.adminSites);
                if (project.lists.admin3) {
                    ngmCustomLocations.admin3Select[$index] = project.lists.admin3;
                }

                if (project.lists.admin4) {
                    ngmCustomLocations.admin4Select[$index] = project.lists.admin4;
                }

                if (project.lists.admin5) {
                    ngmCustomLocations.admin5Select[$index] = project.lists.admin5;
                }
                // filter set list admin1Select,admin2Select,etc and adminSitesSelect or each location
                if (project.lists.admin2 && location.admin1pcode) {
                    ngmCustomLocations.admin2Select[$index] = $filter('filter')(project.lists.admin2, { admin1pcode: location.admin1pcode }, true)
                    ngmCustomLocations.adminSitesSelect[$index] = ngmCustomLocations.adminSitesSelect[$index].filter(function (i) {
                        return i.admin1pcode === location.admin1pcode;
                    });
                }
                if (project.lists.admin3 && location.admin2pcode) {
                    ngmCustomLocations.admin3Select[$index] = $filter('filter')(project.lists.admin3, { admin2pcode: location.admin2pcode }, true)
                    ngmCustomLocations.adminSitesSelect[$index] = ngmCustomLocations.adminSitesSelect[$index].filter(function (i) {
                        return i.admin2pcode === location.admin2pcode;
                    });
                }
                if (project.lists.admin4 && location.admin3pcode) {
                    ngmCustomLocations.admin4Select[$index] = $filter('filter')(project.lists.admin4, { admin3pcode: location.admin3pcode }, true)
                    ngmCustomLocations.adminSitesSelect[$index] = ngmCustomLocations.adminSitesSelect[$index].filter(function (i) {
                        return i.admin3pcode === location.admin3pcode;
                    });
                }
                if (project.lists.admin5 && location.admin4pcode) {
                    ngmCustomLocations.admin5Select[$index] = $filter('filter')(project.lists.admin5, { admin4pcode: location.admin4pcode }, true)
                    ngmCustomLocations.adminSitesSelect[$index] = ngmCustomLocations.adminSitesSelect[$index].filter(function (i) {
                        return i.admin4pcode === location.admin4pcode;
                    });
                }
                if (location.admin5pcode) {
                    ngmCustomLocations.adminSitesSelect[$index] = ngmCustomLocations.adminSitesSelect[$index].filter(function (i) {
                        return i.admin5pcode === location.admin5pcode;
                    });
                }
            },
            // reset location property
            resetLocations: function (project, type, location) {
                // location
                if (type === 'site_type_id') {

                    // admin2
                    delete location.admin1pcode;
                    delete location.admin1name;
                    delete location.admin1lng;
                    delete location.admin1lat;

                }

                // admin1
                if (type === 'site_type_id' || type === 'admin1pcode') {

                    // admin2
                    delete location.admin2pcode;
                    delete location.admin2name;
                    delete location.admin2lng;
                    delete location.admin2lat;

                }

                // admin1 || admin2
                if (type === 'site_type_id' || type === 'admin1pcode' || type === 'admin2pcode') {

                    // admin3
                    delete location.admin3pcode;
                    delete location.admin3name;
                    delete location.admin3lng;
                    delete location.admin3lat;
                }

                // admin4
                if (type === 'site_type_id' || type === 'admin1pcode' || type === 'admin2pcode' || type === 'admin3pcode') {

                    // admin4
                    delete location.admin4pcode;
                    delete location.admin4name;
                    delete location.admin4lng;
                    delete location.admin4lat;

                    // site
                    delete location.site_id;
                    delete location.site_name;
                    delete location.site_lng;
                    delete location.site_lat;
                }

                return location;
            },
            // to set list Location admin1,admin2,admin3
            setLocationAdminSelect: function (project, locations) {
                locations = $filter('orderBy')(locations, 'createdAt');
                // set site_type && site_implementation
                ngmCustomLocations.setSiteTypeAndImplementationSelect(project);
                // filter list admin1,admin2,admin3,admin4,admin5
                angular.forEach(locations, function (location, $index) {
                    ngmCustomLocations.filterLocations(project, $index, location);
                });
            },
            // to set list of site_type && site_implementation
            setSiteTypeAndImplementationSelect: function (project) {

                if (!ngmCustomLocations.site_typeFilter) {
                    ngmCustomLocations.site_typeFilter = [];
                }

                if (!ngmCustomLocations.site_implementationFilter && (project.lists.site_implementation.length > 0)) {
                    ngmCustomLocations.site_implementationFilter = []
                }

                ngmCustomLocations.site_typeFilter = project.lists.site_type.filter(function (i) {
                    return i.cluster_id && i.cluster_id.indexOf(project.definition.cluster_id) > -1;
                });
                ngmCustomLocations.site_implementationFilter = project.lists.site_implementation.filter(function (i) {
                    return i.cluster_id && i.cluster_id.indexOf(project.definition.cluster_id) > -1;
                });

                if (project.definition.inter_cluster_activities && project.definition.inter_cluster_activities.length > 0) {

                    project.definition.inter_cluster_activities.forEach(function (intercluster) {
                        var array_siteimplementation = project.lists.site_implementation.filter(function (i) {
                            return i.cluster_id && i.cluster_id.indexOf(intercluster.cluster_id) > -1;
                        });
                        ngmCustomLocations.site_implementationFilter.push(...array_siteimplementation);

                        var array_siteType = project.lists.site_type.filter(function (i) {
                            return i.cluster_id && i.cluster_id.indexOf(intercluster.cluster_id) > -1;
                        });
                        ngmCustomLocations.site_typeFilter.push(...array_siteType);
                    })
                    // remove duplicate

                    ngmCustomLocations.site_implementationFilter = ngmCustomLocations.site_implementationFilter.filter((item, index) => ngmCustomLocations.site_implementationFilter.indexOf(item) === index);
                    ngmCustomLocations.site_typeFilter = ngmCustomLocations.site_typeFilter.filter((item, index) => ngmCustomLocations.site_typeFilter.indexOf(item) === index);
                }
            }


        };

        return ngmCustomLocations;

    }]);