export const fraccionamientosconfig = {
	RI: 
	{
        bounds: L.latLngBounds([32.5434325643, -116.3206140960], [32.5256856161, -116.2937705616]) ,
        imageUrl : "https://cmsumbracostorage.blob.core.windows.net/media/7311/ranchoisabella-final.jpg",
        lotesUrl:`http://cmsumbracostorage.blob.core.windows.net/kml/RI/GEO/31052017/082739/RI_completo.topo.json`,
        latitud: 32.53457, 
        longitud: -116.30713
	},
	PE:
	{
		bounds : L.latLngBounds([32.3196400, -117.0467520], [32.3112833, -117.0381488]),
        imageUrl : "https://cmsumbracostorage.blob.core.windows.net/media/39560/puntazul-esmeralda-convertido-3.jpg",
        lotesUrl:`http://cmsumbracostorage.blob.core.windows.net/kml/PE/GEO/16092018/101240/PE_Completo.topo.json`,
        latitud: 32.3226959722, 
        longitud: -117.03787451692
	}, 
	PM:
	{
		imageUrl : 'https://cmsumbracostorage.blob.core.windows.net/media/38317/puertasdmazatlan-20160404.jpg',
        lotesUrl:`http://cmsumbracostorage.blob.core.windows.net/kml/PM/GEO/17092018/101641/PM_completo.topo.json`,
		bounds : L.latLngBounds([23.3697018521, -106.5067041671], [23.3499576446, -106.4793102118]), // Puertas de Mazatlan
		latitud: 23.35919, 
        longitud: -106.49534
	}
}