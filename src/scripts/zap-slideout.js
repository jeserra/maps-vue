
export default {
    props: {
    menuitems: String
  },
  data () {
    return {
    openerText: 'Open',
    isOpen: false,
    menu: [ 'Home', 'Work', 'Contact' ],
    smallMenu: [ 'Tips', 'Resources', 'Shenanigans' ],
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

      this.mza = 10;
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }
};