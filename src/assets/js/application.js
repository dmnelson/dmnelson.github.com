(function($){

  var coderwall = {

    USERNAME : "davidmn",
    URL      : "http://www.coderwall.com/",
    JSON     : ".json?callback=?",

    retrieveAchievements: function (callback){
      try {
        $.getJSON(coderwall.URL + coderwall.USERNAME + coderwall.JSON, function(data) {
          callback.call(this, data.data.badges);
        });
      } catch(e){
        coderwall.getWall().text("Oops... could not get badges from CoderWall. Check it out: " + coderwall.URL + coderwall.USERNAME);
      }
    },

    createAchievementBadge: function(achievement){
      var img = ui.createImage({
        src: achievement.badge,
        alt: achievement.name,
        href: coderwall.URL + coderwall.USERNAME
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

    REPOS_URL : "https://api.github.com/users/dmnelson/repos",

    retrieveRepositories: function (callback){
      try {
        $.getJSON(github.REPOS_URL, {sort: 'pushed', direction: 'desc'}, function(data) {
          callback.call(this, data);
        });
      } catch(e) {
        github.getWall().text('Something happened when tried to get data from GitHub. Try to look there: http://github.com/dmnelson');
      }
    },

    createRepoLink: function(repository){
      var link = ui.createLink({
        'class': 'has_tooltip',
        'href': repository.html_url,
        'title': repository.description
      }, repository.name).prepend(ui.createElement('i', {'class': 'icon-screenshot'}));
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
    ui.tooltip('.web_contacts');
  });

})(jQuery);
