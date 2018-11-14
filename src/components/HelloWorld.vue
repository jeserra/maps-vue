<template>

  <div>

     <button id="show-modal" v-on:click="show">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
<modal name="hello-world">
  <a-scene>
      <a-sky src="puydesancy.jpg" rotation="0 -130 0"></a-sky>

      <a-text font="kelsonsans" value="Puy de Sancy, France" width="6" position="-2.5 0.25 -1.5"
              rotation="0 15 0"></a-text>
    </a-scene>
</modal>
  </div>
</template>

<script>


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    methods: {
    show : function(event) {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
