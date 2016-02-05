var app = angular.module('portfolioapp', ['ui.bootstrap']);

app.controller('portfolio_projects', function($scope, $http){

  $http.get('project_meta/projectmeta.json').success(function(data) {
     $scope.projects = data.projects;
     console.log($scope.projects);
  });

  $scope.myInterval = 10000;
});

app.controller('blog_posts', function($scope, $http){
  $http.get('/get_blog_posts').success(function(data) {
     $scope.posts = [];
     for(var i = data.length - 1;i >= 0; i --)
     {
        els = data[i].split('/')[1].split('_');
        date = "" + els[0] + "-" + els[1] + "-" + els[2];
        title = els.slice(3, els.length - 1).join(" ");
        console.log(title);
        url = data[i].split('.')[0]
        $scope.posts.push({"date": date, "title":title, "url": url});
     }
  });
});