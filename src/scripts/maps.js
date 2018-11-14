import axios from "axios";
import {fraccionamientosconfig}  from "../configs/fraccionamientosconfig.js"
import Zapslideout from '@/components/Zap-slideout.vue'
import EventBus from './event-bus';

export default {
  props: {
    acronimo: String
  },
  components: {
   Zapslideout:Zapslideout
  },
  created()
  {
    console.log(this.acronimo);
    	this.getdataJson();
    	//this.getdatacomJson();

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
    fraccionamiento: fraccionamientosconfig[this.acronimo].fraccionamiento,
    }
  },
  mounted() { 
  this.initMap();
  this.initLayers(); 
   this.initAmenidades();
    EventBus.$on('clickedopen', this.toggle); 
    EventBus.$on('clickmodal', this.showAmenidades); 
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
  initAmenidades (){
      console.log("Add amenidades");
       var listaAmenidades  =   JSON.parse("[{\"Nombre\":\"Las Puertas D\u0027Mazatlán\",\"ContenidoPopup\":{\"viewType\":\"image\",\"title\":\"Las Puertas D\u0027Mazatlán\",\"id\":\"0\",\"caption\":\"\",\"data\":[{\"imageUrl\":\"http://cmsumbracostorage.blob.core.windows.net/media/38807/img-paradisiacas-playas-1.jpg\",\"videoID\":null,\"alt\":\"\",\"caption\":\"Las Puertas D\u0027Mazatlán\"}]},\"Descripcion\":\"\",\"Latitud\":\"32.314924\",\"Longitud\":\"-117.043521\",\"Icono\":\"http://cmsumbracostorage.blob.core.windows.net/media/38723/map_green_amenities.png\"}]");
    
    var MarkerAmenities = L.Marker.extend({
        idMarker: 'data-marker',
        contentGalery: Object
    });

      var i = 0;
       console.log(listaAmenidades);
       for (i = 0; i < listaAmenidades.length; i++) {

            var amenidadIcon = L.icon({
                iconUrl: listaAmenidades[i].Icono,
                iconSize: [22, 22], // size of the icon
                popupAnchor: [0, -15]
            });

            var customOptions =
            {
                'maxWidth': '500'
            };

            var latitud =   Number(listaAmenidades[i].Latitud); //  32.314924;
            var longitud =  Number(listaAmenidades[i].Longitud); //-117.043521;//     

            console.log(latitud);

            console.log( longitud);
            
            var marker = new L.Marker([latitud, longitud], { icon: amenidadIcon, title: "" });
           // marker.idMarker = i;
            marker.bindPopup('<b>Da click para ver más</b>');
          //  marker.contentGalery = listaAmenidades[i].ContenidoPopup;

            console.log(marker.idMarker);
            marker.on('mouseover', function () {                
                this.openPopup();
            });
            marker.on('click', function () {
                //console.log(this.contentGalery);
                  EventBus.$emit('clickmodal', this);
                
            });
            marker.addTo(this.map);

        }

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
		     // this.commercialData = response.Document.Placemark
            
		      
		    })
		    .catch(e => {
		    	console.log(e);
		      this.errors.push(e)
		    })
   },
   handleLayer(layer){

    console.log("agregando elemento");
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
                'click',  function()
                {
                  console.log(this.feature.properties);
                //  EventBus.$emit('clickedopen',    this.feature.properties);
                 
                  EventBus.$emit('clickedopen', this);
                });  

           /*  layer.on(
                'click', this.clickedopen); */

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

                
                     if(this.selectedItem !== undefined && this.selectedItem === this ){
                        //
                    }
                    else {
                       console.log(this.selectedItem);
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
   toggle(item)
   {
      console.log("toggl");
      
     console.log(this.selectedItem);

      if(this.selectedItem === item){

          console.log("quitar algo");
           this.$refs.zapSlideOut.close();
           this.selectedItem  = null;
      }
      else{

        this.selectedItem = item;
        var properties = item.feature.properties;
         if(this.$refs.zapSlideOut.isOpen)
            this.$refs.zapSlideOut.close();

          //console.log(properties);
          this.$refs.zapSlideOut.open();

          var pies2 = Number(properties.superficie) * 10.7639;
          this.$refs.zapSlideOut.fraccionamiento = this.fraccionamiento;
          this.$refs.zapSlideOut.mza = properties.name.split('|')[1].substr(1);
          this.$refs.zapSlideOut.lote = properties.name.split('|')[2].substr(1);
          this.$refs.zapSlideOut.precio = "$" + this.addComma(properties.precio) + "USD"
          this.$refs.zapSlideOut.preciom2 =  "$" +this.addComma(properties.precioM2) + "USD";
          this.$refs.zapSlideOut.superficie=  this.addComma(properties.superficie) + "M2" ;
          this.$refs.zapSlideOut.superficieft= "/ "+ this.addComma(pies2.toFixed(2)) + "sq ft" ;
      }
    
   },
   showAmenidades(){
      this.$modal.show('hello-world');
   },
   addComma (nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
  }
};