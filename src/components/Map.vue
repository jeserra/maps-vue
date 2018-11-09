<template>
   <div id="app" class="container">
  <div class="row">
    
    <div class="col-md-12">

      <div id="map" class="map" 
      v-on:drag="drag"
      v-on:enterFullscreen="enterFullscreen($event)"
      v-on:exitFullscreen="exitFullscreen($event)">
		<Zapslideout ref="zapSlideOut"></Zapslideout>
      </div>
    </div>
  </div>
</div> 
</template>
<style scoped>
.map { height: 800px; width :1200px; }
</style>
<script type="text/javascript">L_PREFER_CANVAS = true;</script>
<script src="..\scripts\maps.js"/>
 