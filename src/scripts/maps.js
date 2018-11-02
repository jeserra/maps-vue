import axios from "axios";


export default {

  created()
  {
    	this.getdataJson();
  } 
  ,
  data() {
  return {  
    map: null, 
    tileLayer: null,
    layers: [ ], 
    bounds: [] ,
    imageUrl : "https://cmsumbracostorage.blob.core.windows.net/media/7311/ranchoisabella-final.jpg",
    topoLayer :  null,
    features : [],
    lg : new L.layerGroup(),
    positionControls : 'bottomright',
    topoLayer : new L.TopoJSON()
   }
  },
  mounted() { 
  this.initMap();
  this.initLayers(); 
  },
  methods: { 
   initMap() { 

	
     this.bounds = L.latLngBounds([32.5434325643, -116.3206140960], [32.5256856161, -116.2937705616]); // El bueno Punta azul 
      this.map = L.map('map', {
                attributionControl: false,
                zoomControl: false,
                maxZoom: 19, /*minZoom: minZoomMapa,*/ fullscreenControl: true, maxBounds: this.bounds,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen!",
                    titleCancel: "Exit fullscreen mode",
                    position: this.positionControls
            }
         }); 

    this.map.setView([32.53457, -116.30713], 16);
    var imageBounds = this.bounds;

    L.imageOverlay(this.imageUrl, imageBounds).addTo(this.map);

         //topoLayer = new L.TopoJSON();
         this.map.scrollWheelZoom.disable();
 
    this.tileLayer = L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
     {
       maxZoom: 18,
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    }
   );
    this.tileLayer.addTo(this.map);
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
   		axios.get(`http://cmsumbracostorage.blob.core.windows.net/kml/RI/GEO/31052017/082739/RI_completo.topo.json`)
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

            /*layer.on({
                click: click,
                mouseover: enterLayer,
                mouseout: leaveLayer
            });*/
   }
  }
};