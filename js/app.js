var app = angular.module('portfolioapp', ['ui.bootstrap']);

  app.controller('portfolio_projects', function($scope, $http){

  $http.get('../project_meta/projectmeta.json').success(function(data) {
     $scope.projects = data.projects;
     console.log($scope.projects);
  });

  $scope.myInterval = 10000;
});