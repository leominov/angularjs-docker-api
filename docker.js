var app = angular.module('app', []);

app
  .controller('DockerController', function($scope, $http) {
    $scope.isSet = false;
    $scope.host = '';
    $scope.containers = [];
    $scope.htop = [];

    $scope.Set = function() {
      if (!$scope.isSet) {
        $scope.isSet = true;
        getContainers();
        return false;
      }

      $scope.isSet = false;
      setEmpty();
    }

    $scope.getContainer = function(container) {
      $scope.selectedcontainerId = container.Id;
      getContainer(container.Id);
    }

    function getContainers() {
      $http.get($scope.host + '/containers/json').
        then(function(response) {
          $scope.containers = response.data;
        }, function(response) {
          console.log(response);
        });
    }

    function setEmpty() {
      $scope.containers = [];
      $scope.htop = [];
    }

    function getContainer(id) {
      $http.get($scope.host + '/containers/' + id + '/top').
      then(function(response) {
        $scope.htop = response.data;
      }, function(response) {
        console.log(response);
      });
    }
  });
