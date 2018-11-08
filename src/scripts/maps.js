import axios from "axios";
import {fraccionamientosconfig}  from "../configs/fraccionamientosconfig.js"
import Zapslideout from '@/components/Zap-slideout.vue'
export default {
  props: {
    acronimo: String
  },
  components: {
   Zapslideout
  },
  created()
  {
    console.log(this.acronimo);
    	this.getdataJson();
    	this.getdatacomJson();

  } 
  ,
  data() {
  return {  
    map: null, 
    tileLayer: null,
    layers: [ ], 
    topoLayer :  null,
    features : [],
    commercialData : [],
    lg : new L.layerGroup(),
    positionControls : 'bottomright',
    topoLayer : new L.TopoJSON(),
    featureGroup : new L.featureGroup(),
    selectedItem: null,

    bounds: fraccionamientosconfig[this.acronimo].bounds, // L.latLngBounds([32.5434325643, -116.3206140960], [32.5256856161, -116.2937705616]) ,
    imageUrl :  fraccionamientosconfig[this.acronimo].imageUrl, // "https://cmsumbracostorage.blob.core.windows.net/media/7311/ranchoisabella-final.jpg",
    lotesUrl: fraccionamientosconfig[this.acronimo].lotesUrl, // `http://cmsumbracostorage.blob.core.windows.net/kml/RI/GEO/31052017/082739/RI_completo.topo.json`,
    latitud: fraccionamientosconfig[this.acronimo].latitud,
    longitud: fraccionamientosconfig[this.acronimo].longitud,
    }
  },
  mounted() { 
  this.initMap();
  this.initLayers(); 
  },
  methods: { 
   initMap() { 
      this.map = L.map('map', {
                attributionControl: false,
                zoomControl: false,
                maxZoom: 19,  minZoom: 17, fullscreenControl: true, maxBounds: this.bounds,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen!",
                    titleCancel: "Exit fullscreen mode",
                    position: this.positionControls
            }
         }); 

   // this.map.setView([32.53457, -116.30713], 16);
    this.map.setView([this.latitud, this.longitud], 16);
    var imageBounds = this.bounds;

    L.imageOverlay(this.imageUrl, imageBounds).addTo(this.map);

         //topoLayer = new L.TopoJSON();
         this.map.scrollWheelZoom.disable();
    },
  initLayers() {
  	    var overlays = {
            "Ver Lotificacion": this.lg
        };

        this.lg.addTo(this.map);

        L.control.layers(null, overlays, { position: this.positionControls }).addTo(this.map);
        new L.Control.Zoom({ position: this.positionControls }).addTo(this.map);
  },
  layerChanged(layerId, active) {
       
  },
  drag() {
  			console.log("arrastrando el cursos");
            this.map.panInsideBounds(this.bounds, { animate: false });
        }
   ,
   enterFullscreen(){
             if (window.console) window.console.log('enterFullscreen');
   },
   exitFullscreen(){
   	         if (window.console) window.console.log('exitFullscreen');
   },
   addTopoData(topoData){
   	         console.log(['Comienza proceso de carga del json']); // [18:13:17] ["foo"]

   	 		
             this.topoLayer.addData(topoData);
             this.topoLayer.addTo(this.map);
             this.topoLayer.eachLayer(this.handleLayer);

            //$(".layer-load").fadeOut();
            console.log(['Finaliza proceso de carga del json']); // [18:13:17] ["foo"]
   },
   getdataJson ()
   {
   		console.log(['Get data from json ']);
   		axios.get(this.lotesUrl)
		    .then(response => {
		      // JSON responses are automatically parsed.
		      this.features = response.data
              this.addTopoData(response.data);
		      
		    })
		    .catch(e => {
		    	console.log(e);
		      this.errors.push(e)
		    })
   },
   getdatacomJson ()
   {
      		console.log(['Get data from json ']);
   		axios.get("sampledata.js")
		    .then(response => {
		    	this.commercialData = response.data;
		    	console.log(this.commercialData);
		      // JSON responses are automatically parsed.
		      this.commercialData = response.Document.Placemark
            
		      
		    })
		    .catch(e => {
		    	console.log(e);
		      this.errors.push(e)
		    })
   },
   handleLayer(layer){

   	var hoverStyle = {
            weight: 1,
            opacity: 1,
            fillColor: '#39b54a',
            color: '#b4b4b4',
            fillOpacity: .60
        };

        var selectedStyle = {
            fillColor: '#39b54a',
            fillOpacity: 1,
            color: '#b4b4b4',
            weight: 1,
            opacity: 1
        };

        var apartadoStyle = {                               //style for Active GeoJSON feature
            fillColor: '#f60d0d',
            fillOpacity: .5,
            color: '#99c3eb',
            weight: 1,
            opacity: .5
        };

        var disponibleStyle = {
            fillColor: '#1c238b',
            fillOpacity: 0,
            color: '#b4b4b4',
            weight: 1,
            opacity: .2
        };

        var vendidoStyle =
            {
                fillColor: '#f60d0d',
                fillOpacity: .5,
                color: '#99c3eb',
                weight: 1,
                opacity: .5
            };

   		 this.lg.addLayer(layer);
            var fillColor = "ccc";//colorScale(randomValue).hex();

            if (layer.feature.properties.styleUrl === "#Disponible") {
                layer.setStyle(disponibleStyle);
            } else {
                if (layer.feature.properties.styleUrl === "#Apartado") {
                    layer.setStyle(apartadoStyle);
                }
                else {
                    layer.setStyle(vendidoStyle);
                }
            }
       
             layer.on(
                'click', function (){
                    $emit('clickedopen');
                    console.log("click to open toggle");
                });

              layer.on(
                'mouseover', function(){
                 //   console.log("enter mouseover");
                    var hoverStyle = {
                       weight: 1,
                       opacity: 1,
                       fillColor: '#39b54a',
                       color: '#b4b4b4',
                       fillOpacity: .60
                    };
                  this.setStyle(hoverStyle);
                }); 

              layer.on(
                'mouseout', function (){

                  var apartadoStyle = {                               //style for Active GeoJSON feature
                  fillColor: '#f60d0d',
                  fillOpacity: .5,
                  color: '#99c3eb',
                  weight: 1,
                  opacity: .5
                  };

                  var disponibleStyle = {
                      fillColor: '#1c238b',
                      fillOpacity: 0,
                      color: '#b4b4b4',
                      weight: 1,
                      opacity: .2
                  };

                  var vendidoStyle =
                      {
                          fillColor: '#f60d0d',
                          fillOpacity: .5,
                          color: '#99c3eb',
                          weight: 1,
                          opacity: .5
                      };

                //  console.log("predeficnido");
                 // console.log(selectedItem);
                     if(this.selectedItem !== undefined && selectedItem === this ){
                 
                    }
                    else {
                        if (this.feature.properties.styleUrl === "#Disponible") {
                              this.setStyle(disponibleStyle);
                        } else {
                              if (this.feature.properties.styleUrl === "#Apartado") {
                              this.setStyle(apartadoStyle);
                        }
                            else {
                                this.setStyle(vendidoStyle);
                                  }
                            }
                    }
                 
                });


   },
   clickedopen()
   {
       console.log('se emitio un click para abrr el pedo;');
   }
  }
};