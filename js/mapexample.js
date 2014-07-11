var width = 900,
                height = 510;

            var svg = d3.select("#my-map").append("svg")
                .attr("width", width)
                .attr("height", height);

            var path = d3.geo.path()
                .projection(d3.geo.albersUsa());

            d3.json("data/us.json", function(error, us) {
              if (error) return console.error(error);

              svg.selectAll(".state")
                  .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                  .attr("class", function(d) { return "state state-" + (d.id % 5); })
                  .attr("d", path);
            });

            d3.json("data/tornado.geojson", function(error, tornadoes) {
                console.log("tornadoes", tornadoes);
                svg.selectAll(".tornado")
                    .data(tornadoes.features)
                .enter().append("path")
                    .attr("class", function(d) {
                        return "tornado tornado-magnitude-" + d.properties.MAG;
                    })
                    .attr("d", path);
            });