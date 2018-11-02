// Copyright (c) 2013 Ryan Clark
        // https://gist.github.com/rclark/5779673
        L.TopoJSON = L.GeoJSON.extend({
            addData: function (jsonData) {
                if (jsonData.type === "Topology") {
                    for (key in jsonData.objects) {
                        geojson = topojson.feature(jsonData, jsonData.objects[key]);
                        L.GeoJSON.prototype.addData.call(this, geojson);
                    }
                }
                else {
                    if(jsonData.properties.show_on_map== false)
                    {
                        //console.log("no mostrar si tienen la propiedad show_on_map = false");
                    }
                    else
                    {
                        L.GeoJSON.prototype.addData.call(this, jsonData);
                    }
                }
            }
          });