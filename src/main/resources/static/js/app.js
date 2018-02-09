var taskManagerModule = angular.module('taskManagerApp', ['ngAnimate']);

taskManagerModule.controller('taskManagerController', function ($scope,$http) {
	
	var urlBase="";
	$scope.toggle=true;
	$scope.selection = [];
	$scope.statuses=['ACTIVE','COMPLETED'];
	$scope.priorities=['HIGH','LOW','MEDIUM'];
	$http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllTasks() {
        //get all tasks and display initially
        $http.get(urlBase + '/tasks/search/findByTaskArchived?archivedfalse=0').
            success(function (data) {
                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else {
                    $scope.tasks = [];
                }
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].taskStatus == 'COMPLETED') {
                        $scope.selection.push($scope.tasks[i].taskId);
                    }
                }
                $scope.taskName="";
                $scope.taskDesc="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.toggle='!toggle';
            });
    }

    //findAllTasks();

	//login
	$scope.login = function addTask() {
		if($scope.username=="" || $scope.password==""){
			alert("Please enter a valid username and password");
		}
		else{
		 $http.post(urlBase + '/login', {
			 username: $scope.username,
             password: $scope.password
         }).
		  success(function(data, status, headers) {
			 alert("Success");
			 $scope.username="";
             $scope.password="";
             $scope.toggle='!toggle';

			  //findAllTasks();
		    });

		}
	};
		
	// toggle selection for a given task by task id
	  $scope.toggleSelection = function toggleSelection(taskUri) {
	    var idx = $scope.selection.indexOf(taskUri);

	    // is currently selected
        // HTTP PATCH to ACTIVE state
	    if (idx > -1) {
	      $http.patch(taskUri, { taskStatus: 'ACTIVE' }).
		  success(function(data) {
		      alert("Task unmarked");
              findAllTasks();
		    });
	      $scope.selection.splice(idx, 1);
	    }

	    // is newly selected
        // HTTP PATCH to COMPLETED state
	    else {
	      $http.patch(taskUri, { taskStatus: 'COMPLETED' }).
		  success(function(data) {
			  alert("Task marked completed");
              findAllTasks();
		    });
	      $scope.selection.push(taskUri);
	    }
	  };
	  
	
	// Archive Completed Tasks
	  $scope.archiveTasks = function archiveTasks() {
          $scope.selection.forEach(function(taskUri) {
              if (taskUri != undefined) {
                  $http.patch(taskUri, { taskArchived: 1});
              }
          });
          alert("Successfully Archived");
          console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
          findAllTasks();
	  };
	
});

//Angularjs Directive for confirm dialog box
taskManagerModule.directive('ngConfirmClick', [
	function(){
         return {
             link: function (scope, element, attr) {
                 var msg = attr.ngConfirmClick || "Are you sure?";
                 var clickAction = attr.confirmedClick;
                 element.bind('click',function (event) {
                     if ( window.confirm(msg) ) {
                         scope.$eval(clickAction);
                     }
                 });
             }
         };
 }]);