<template>
   <div id="app" class="container">
  <div class="row">
    <div class="col-md-9">
      <div id="map" class="map" 
      v-on:drag="drag($event)""
      v-on:enterFullscreen="enterFullscreen($event)"
      v-on:exitFullscreen="exitFullscreen($event)"></div>
    </div>
    <div class="col-md-3">
     <div class="form-check"
       v-for="layer in layers" :key="layer.id">
  		<label class="form-check-label">
  <input class="form-check-input" 
    type="checkbox"
    v-model="layer.active"
    @change="layerChanged(layer.id, layer.active)"
  />
  {{ layer.name }}
  </label>
     </div>
    </div>
  </div>
</div> 
</template>
<style scoped>
.map { height: 800px; }
</style>

<script src="..\scripts\maps.js"/>
 