(function($){

  var CODERWALL_USERNAME = "davidmn";
  var CODERWALL_URL      = "http://www.coderwall.com/";
  var GITHUB_USERNAME = "dmnelson";

  var JSON     = ".json?callback=?";

  var coderwall = {

    retrieveAchievements : function (callback){
      $.getJSON(CODERWALL_URL + CODERWALL_USERNAME + JSON, function(data) {
        callback.call(this, data.data.badges);
      });
    },

    createAchievementBadge: function(achievement){
      var img = ui.createImage({
        src: achievement.badge,
        alt: achievement.name,
        href: CODERWALL_URL + CODERWALL_USERNAME
      });
      var link = ui.createLink({
        'class': 'has_tooltip',
        'title': achievement.name + ": " + achievement.description
      }).append(img);
      return link;
    },

    addBadgesToWall: function(achievement){
      $.each(achievement, function(i, item){
        var badge = coderwall.createAchievementBadge(item);
        badge.appendTo(coderwall.getWall());
      });
      ui.tooltip(coderwall.getWall(), {placement: 'right'});
    },

    getWall : function(){
      return $('.coderwall');
    }
  };

  var github = {
    
    REPOS_URL: "https://api.github.com/users/dmnelson/repos",

    retrieveRepositories: function (callback){
      $.getJSON(github.REPOS_URL, {sort: 'pushed', direction: 'desc'}, function(data) {
        callback.call(this, data);
      });
    },

    createRepoLink: function(repository){
      var link = ui.createLink({
        'class': 'has_tooltip',
        'href': repository.html_url,
        'title': repository.description
      }, repository.name).prepend(ui.createElement('i', {'class': 'icon-book'}));
      return ui.createElement('li').append(link); 
    },

    addReposToWall: function(repos){
      var wall = github.getWall();
      var list = ui.createElement('ul', {'class': 'nav nav-list'}).appendTo(wall);
      $.each(repos, function(i, item){
        list.append(github.createRepoLink(item)); 
      });
      ui.tooltip(wall, {placement: 'top'});
    },

    getWall: function(){
      return $('.os-repos');
    }
  };

  var ui = {
    createImage : function(attributes){
      return ui.createElement('img', attributes);
    },

    createLink : function(attributes, text){
      return ui.createElement('a', attributes, text);
    },

    createElement: function(name, attributes, value){
      var el = $('<'+name+'/>');
      if(attributes){
        $.each(attributes, function(key, value){
          el.attr(key, value);
        });
      }
      el.text(value);
      return el;
    },

    tooltip: function(parent, options){
      head.ready('jquery-tooltip', function(){
        $('.has_tooltip', parent).tooltip(options);
      });
    }
  };

  $(function($) {
    coderwall.retrieveAchievements(coderwall.addBadgesToWall);
    github.retrieveRepositories(github.addReposToWall);
  });

})(jQuery);
