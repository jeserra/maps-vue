 <template>
  <div class="zap-slideout"
       :class="{ isOpen: isOpen }">
    <div class="zap-slideout-opener"
         @click="toggle">{{openerText}}</div>
    <ul class="zap-slideout-menu">
      <li class="zap-slideout-menu-item">
        <img class="zap-emoji" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/19332/zap-emoji.svg" alt="Zap Emoji" />
      </li>
      <div class="zap-slideout-menu-item--small">Fraccionamiento: {{fraccionamiento}}</div>
      <div class="zap-slideout-menu-item--small">Manzana: {{mza}}</div>
       <div class="zap-slideout-menu-item--small">Lote: {{lote}}</div>
        <div class="zap-slideout-menu-item--small">Superficie M2 {{superficie}}</div>
        <div class="zap-slideout-menu-item--small">{{superficieft}}</div>
        <div class="zap-slideout-menu-item--small">Precio: {{precio}}</div>
        <div class="zap-slideout-menu-item--small">Precio Metro Cuadrado:{{preciom2}}</div>
    </ul>
    <div class="btn btn-sm btn-primary highlight-information" style="font-size: 16px;" id="div_botonverde">
                                            <div>
                                            <label>Para más información sobre este </label>
                                            </div>
                                            <div>
                                             <label> terreno comuníquese a los teléfonos</label>
                                             </div>
       <ul>                                      
        <a href="tel://+528002694582" style="font-weight:bold;color:white;">MEX: 01-800-269-4582</a> 
        <a href="tel://+18555543763" style="font-weight:bold;color:white;">USA: 1-855-554-3763</a>
       </ul>
    </div>
  </div>
 </template>

<script>
import EventBus from './event-bus';

export default {
    props: {
    menuitems: String
  },
  data () {
    return {
    openerText: 'Open',
    isOpen: false,
    mza:'',
    lote:'',
    fraccionamiento:'',
    precio:'',
    preciom2:'',
    superficie:'',
    superficieft:'',
  }},

  methods: {
    open() {
      this.openerText = 'Close';
      this.isOpen = true;
    },
    close() {
      this.openerText = 'Open';
      this.isOpen = false;
    },
    toggle() {

      
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }
};
</script>

<style>
/* 
Some fancy Pen styling
 */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
  background-color: #2c3e50;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

strong {
  font-weight: 600;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.description {
  margin-top: 20px;
}

/* 
Our Zap Slideout styles...
 */
.zap-slideout {
  position: relative;
  width: 300px;
  height: 100vh;
  padding: 30px;
  background-color: #231f20;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  transition: -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), -webkit-transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.zap-slideout.isOpen {
  -webkit-transform: translateX(0);
          transform: translateX(0);
          z-index:1000;
 
}

.zap-slideout-opener {
  position: absolute;
  top: 20px;
  left: 100%;
  margin-left: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #fff;
  cursor: pointer;
}

.zap-slideout-menu {
  font-weight: 600;
  color: #fff;
}

.zap-slideout-menu-item,
.zap-slideout-menu-item--small {
  cursor: pointer;
}
.zap-slideout-menu-item:hover,
.zap-slideout-menu-item--small:hover {
  
}
.zap-slideout-menu-item + .zap-slideout-menu-item,
.zap-slideout-menu-item--small + .zap-slideout-menu-item, .zap-slideout-menu-item +
.zap-slideout-menu-item--small,
.zap-slideout-menu-item--small +
.zap-slideout-menu-item--small {
  margin-top: 20px;
}

.zap-slideout-menu-item {
  font-size: 36px;
}
.zap-slideout-menu-item + .zap-slideout-menu-item--small {
  margin-top: 30px;
}

.zap-slideout-menu-item--small {
  font-size: 18px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ecf0f1;
}

/* The famed Zap agency logo (TM) */
.zap-emoji {
  height: 120px;
}


</style>
