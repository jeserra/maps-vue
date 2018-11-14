<template>

  <div class="row">
    
    <div class="col-md-12">

      <div id="map" class="map" 
      v-on:drag="drag"
      v-on:enterFullscreen="enterFullscreen($event)"
      v-on:exitFullscreen="exitFullscreen($event)">
		<Zapslideout ref="zapSlideOut"></Zapslideout>
      </div>
    </div>
    <!-- use the modal component, pass in the prop -->
<modal name="hello-world" height="500px" width="800px">
  <a-scene>
      <a-sky src="puydesancy.jpg" rotation="0 -130 0"></a-sky>

      <a-text font="kelsonsans" value="Playas de Mazatlan" width="6" position="-2.5 0.25 -1.5"
              rotation="0 15 0"></a-text>
    </a-scene>
</modal>
  </div>

</template>
<style scoped>
.map { height: 800px; width :1200px; }

</style>
<script type="text/javascript">L_PREFER_CANVAS = true;</script>
<script src="..\scripts\maps.js"/>
 