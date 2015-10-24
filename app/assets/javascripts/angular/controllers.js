
// ==================================================
// LOGIN CONTROLLER =================================
// ==================================================

app.controller("LoginController", ["$scope", "$location", "$http", "$auth", "$anchorScroll", function ($scope, $location, $http, $auth, $anchorScroll){
    
    $scope.test = "THIS IS WORKING";

    $scope.authenticateUser = function(){
	//Send authentication request to Google
		$auth.authenticate('google_oauth2');
	};
    
    $scope.scrollToAbout = function () {
        $location.hash('about');
        $anchorScroll();
    };

    $scope.scrollTo = function(id) {
        console.log("hello " + id);
        $location.hash(id);
        $anchorScroll();
    };
}]);//END LOGIN CONT


// ==================================================
// COURSES INDEX CONTROLLER =========================
// ==================================================

app.controller("CoursesIndexController", ["$scope", "$location", "$http", "$auth", "$anchorScroll", function ($scope, $location, $http, $auth, $anchorScroll){
    
    $scope.test = "THIS IS WORKING";
    
}]);//END COURSE INDEX CONT



// ==================================================
// ADDITIONAL INFO CONTROLLER =======================
// ==================================================

//TODO -- Fix the get on the user (need userObj now. search it for examples)

app.controller("AdditionalInfoController", ["$scope", "$location", "User", "$routeParams", "School", function ($scope, $location, User, $routeParams, School){

	//Find user to update
	$scope.user = User.get({id: $routeParams.id});

	//Find schools to add to user
	$scope.schools = School.query();

	$scope.submitAdditionalInfo = function(id) {
		// Check if they are student or teacher
		if($scope.formData.teacher) {
			$scope.user.isTeacher = true;
		} else if ($scope.formData.student){
			$scope.user.isTeacher = false;
		}
        //Check if they are male or female
        if($scope.formData.female) {
            $scope.user.isFemale = true;
        } else if ($scope.formData.male) {
            $scope.user.isFemale = false;
        }
		// Choose the school the teacher/student is a part of.
        $scope.user.school = $scope.formData.school;

		$scope.user.$update({id: $routeParams.id}).then(function() {
            $location.path('/users/' + $routeParams.id);
        });
	};
}]);//END ADDINFO CONT


// ==================================================
// GLOBAL CONTROLLER FOR LOGIN AND LOGOUT EVENTS ====
// ==================================================
app.controller("GlobalController", ["$scope", "$location", "$http","$rootScope", "User","$auth", "$log", "$routeParams", function ($scope, $location, $http, $rootScope, User, $auth, $log, $routeParams){
	$scope.test = "THIS IS WORKING";
//TODO handle auth:login-failure gracefully    
 //    //Function to check when someone is logged in and redirect them to the appopriate place
 //    $rootScope.$on('auth:login-success', function(ev, user) {
 //              // Find the user in the database to check if they're new or already have an account
 //       User.get({id: user.id})
 //               .$promise.then(function(loggedInUser){
 //                 //Set user on rootScope for access everywhere
 //                       $rootScope.user_id = loggedInUser.user.id;
 //                       // If the user is new...
 //                       if(loggedInUser.user.isNewUser) {
 //                               $location.path("/users/" + loggedInUser.user.id + "/additional_info");
 //                               //Redirect additional info page
 //                       } else {
 //                       // If not, send them to their dashboard
 //                           $location.path("/users/" + loggedInUser.user.id);
 //                       }
 //               });
	// });
    
    // // Function to redirect back to login after a refresh
    // $rootScope.$on('$routeChangeStart', function (event, next, current) {
    //     if (!$rootScope.user_id) {
    //         $location.url("/login/");
    //     } else{
    //         User.get({id: $rootScope.user_id}, function(user){
    //             $scope.currentUser = user;
    //             // console.log($scope.currentUser);
    //             // console.log($scope.currentUser.user.isTeacher);
    //         });
    //     }
    // });

    $scope.dashboard = function() {
      $location.path("/users/" + $rootScope.user_id);
    };

    //Logging someone out
    $scope.logout = function() {
        
        $auth.signOut().then(function() {
            $scope.currentUser = {}
        });
        // .then(function(res) {
        //     console.log("goodbye")
        // })
        // .catch(function(res) {
        //     console.log("ldasjkd")
        // })
    };

    //Going to a users profile page

    $scope.toProfile =  function() {
        $location.path("/users/" + $rootScope.user_id + "/profile")
    }

    $rootScope.$on("auth:logout-success", function(ev, user) {
        $rootScope.user_id = null;
        $location.path("/");
    });

    $scope.toNewCourse = function () {
        $location.path("/courses/new/");
    };

    $scope.toDocumentLibrary = function () {
        $location.path("/users/" + $rootScope.user_id + "/documentLibrary");
    };

    $scope.status = {
        isopen: false
    };

    // $scope.toggled = function(open) {
    //     $log.log('Dropdown is now: ', open);
    // };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

}]);//END GLOBAL CONT
