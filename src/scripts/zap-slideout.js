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
    fraccionamiento:''
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