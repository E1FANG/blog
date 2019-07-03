var top250 = {
  init: function() {
    this.$element = $("#top250");
    this.index = 0;
    this.isLoading = false;
    this.isFinish = false;

    this.bind();
    this.start();
  },
  bind: function() {
    var _this = this;
    this.$element.scroll(function() {
      _this.start();
    });
  },
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find(".loading").show();

    $.ajax({
      url: "http://api.douban.com/v2/movie/top250",
      type: "GET",
      data: {
        start: _this.index,
        count: 10
      },
      dataType: "jsonp"
    })
      .done(function(ret) {
        _this.index += 10;
        callback && callback(ret);
      })
      .fail(function() {
        console.log("error ...");
      })
      .always(function() {
        _this.isLoading = false;
        _this.$element.find(".loading").hide();
      });
  },
  render: function() {
    var _this = this;
    data.subjects.forEach(function(movie) {
      var tpl = `<div class="item">
              <a href="#">
                <div class="cover">
                  <img
                    src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg"
                    alt=""
                  />
                </div>
                <div class="detail">
                  <h2>霸王别姬</h2>
                  <div class="extra">
                    <span class="score">9.3分</span> / <span class='collect'>1000</span>收藏
                  </div>
                  <div class="extra"><span class='year'></span> / <span class='type'></span></div>
                  <div class="extra">
                      <span class='diretor'></span>
                  </div>
                  <div class="extra">主演: <span class='actor'></span></div>
                </div>
              </a>
            </div>`;

      var $node = $(tpl);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".diretor").text(function() {
        var diretor = [];
        movie.directors.forEach(function(e) {
          diretor.push(e.name);
        });
        return diretor.join(",");
      });
      $node.find(".actor").text(function() {
        var actor = [];
        movie.casts.forEach(function(e) {
          actor.push(e.name);
        });
        return actor.join(",");
      });
      _this.$element.find(".container").append($node);
    });
  },
  isToBottom: function() {
    return (
      this.$element.find(".container") <=
      this.$element.height() + this.$element.scrollTop() + 10
    );
  }
};

var usBox = {
  init: function() {
    this.$element = $(".beimei");
  },
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find(".loading").show();

    $.ajax({
      url: "http://api.douban.com/v2/movie/us_box",
      type: "GET",
      dataType: "jsonp"
    })
      .done(function(ret) {
        callback && callback(ret);
      })
      .fail(function() {
        console.log("error ...");
      })
      .always(function() {
        _this.isLoading = false;
        _this.$element.find(".loading").hide();
      });
  },
  render: function() {
    var _this = this;
    data.subjects.forEach(function(movie) {
      movie = subjects.movie; //数据嵌套了两层

      var tpl = `<div class="item">
              <a href="#">
                <div class="cover">
                  <img
                    src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg"
                    alt=""
                  />
                </div>
                <div class="detail">
                  <h2>霸王别姬</h2>
                  <div class="extra">
                    <span class="score">9.3分</span> / <span class='collect'>1000</span>收藏
                  </div>
                  <div class="extra"><span class='year'></span> / <span class='type'></span></div>
                  <div class="extra">
                      <span class='diretor'></span>
                  </div>
                  <div class="extra">主演: <span class='actor'></span></div>
                </div>
              </a>
            </div>`;

      var $node = $(tpl);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".diretor").text(function() {
        var diretor = [];
        movie.directors.forEach(function(e) {
          diretor.push(e.name);
        });
        return diretor.join(",");
      });
      $node.find(".actor").text(function() {
        var actor = [];
        movie.casts.forEach(function(e) {
          actor.push(e.name);
        });
        return actor.join(",");
      });
      _this.$element.find(".container").append($node);
    });
  }
};

var search = {
  init: function() {
    console.log("usBox ok");
    this.$element = $("#search");
    this.keyword = "";
    this.bind();
    this.start();
  },

  bind: function() {
    var _this = this;
    this.$element.find(".button").click(function() {
      _this.keyword = _this.$element.find("input").val();
      _this.start();
    });
  },
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    _this.$element.find(".loading").show();
    $.ajax({
      url: "http://api.douban.com/v2/movie/search",
      data: {
        q: _this.keyword
      },
      dataType: "jsonp"
    })
      .done(function(ret) {
        callback && callback(ret);
      })
      .fail(function() {
        console.log("数据异常");
      })
      .always(function() {
        _this.$element.find(".loading").hide();
      });
  },
  render: function(data) {
    var _this = this;
    console.log(data);
    data.subjects.forEach(function(movie) {
      var template = `<div class="item">
    <a href="#">
    <div class="cover">
    <img src="" alt="">
        </div>
    <div class="detail">
    <h2></h2>
    <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
    <div class="extra">导演: <span class="director"></span></div>
    <div class="extra">主演: <span class="actor"></span></div>
  </div>
  </a>
  </div>`;
      var $node = $(template);
      $node.find("a").attr("href", movie.alt);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".director").text(function() {
        var directorsArr = [];
        movie.directors.forEach(function(item) {
          directorsArr.push(item.name);
        });
        return directorsArr.join("、");
      });
      $node.find(".actor").text(function() {
        var actorArr = [];
        movie.casts.forEach(function(item) {
          actorArr.push(item.name);
        });
        return actorArr.join("、");
      });
      _this.$element.find(".search-result").append($node);
    });
  }
};

var app = {
  init: function() {
    this.$tabs = $("footer>div");
    this.$panels = $("section");
    this.bind();
    top250.init();
    usBox.init();
    search.init();
  },
  bind: function() {
    var _this = this;
    this.$tabs.on("click", function() {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      _this.$panels
        .eq($(this).index())
        .fadeIn()
        .siblings()
        .hide();
    });
  }
};

app.init();
