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
    features : []
   }
  },
  mounted() { 
  this.initMap();
  this.initLayers(); 
  },
  methods: { 
   initMap() { 

	
     this.bounds = L.latLngBounds([32.5434325643, -116.3206140960], [32.5256856161, -116.2937705616]); // El bueno Punta azul 
    //this.map = L.map('map').setView([38.63, -90.23], 12);
     this.map = L.map('map', {
                attributionControl: false,
                zoomControl: false,
                maxZoom: 19, /*minZoom: minZoomMapa,*/ fullscreenControl: true, maxBounds: this.bounds,
                fullscreenControlOptions: { // optional
                    title: "Show me the fullscreen!",
                    titleCancel: "Exit fullscreen mode",
                   // position: positionControls
            }
         }); 

    this.map.setView([32.53457, -116.30713], 16);
    var imageBounds = this.bounds;

    L.imageOverlay(this.imageUrl, imageBounds).addTo(this.map);

         //topoLayer = new L.TopoJSON();
        //map.setView([latFraccionamiento, lonFraccionamiento], 16);
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
  	 this.layers.forEach((layer) => {
    		// Initialize the layer
    		const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
            const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon');
              
            markerFeatures.forEach((feature) => {
               feature.leafletObject = L.marker(feature.coords)
                .bindPopup(feature.name);
            });

            polygonFeatures.forEach((feature) => {
               feature.leafletObject = L.polygon(feature.coords)
               .bindPopup(feature.name);
            });



  		});
  },
  layerChanged(layerId, active) {
       const layer = this.layers.find(layer => layer.id === layerId);
       layer.features.forEach((feature) => {
         if (active) {
                feature.leafletObject.addTo(this.map);
         } else {
                feature.leafletObject.removeFrom(this.map);
         }
       });
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
   	 log(['Comienza proceso de carga del json']); // [18:13:17] ["foo"]
            this.topoLayer.addData(topoData);
            this.topoLayer.addTo(this.map);
            this.topoLayer.eachLayer(handleLayer);
            //$(".layer-load").fadeOut();
            log(['Finaliza proceso de carga del json']); // [18:13:17] ["foo"]
   },
   getdataJson ()
   {
   		console.log(['Get data from json ']);
   		axios.get(`http://cmsumbracostorage.blob.core.windows.net/kml/RI/GEO/31052017/082739/RI_completo.topo.json`)
		    .then(response => {
		      // JSON responses are automatically parsed.
		      this.features = response.data

		      console.log(this.features);
		    })
		    .catch(e => {
		      this.errors.push(e)
		    })
   }
  }
};