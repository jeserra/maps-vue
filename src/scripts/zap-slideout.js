
export default {
   
  data () {
    return {
    openerText: 'Open',
    isOpen: false,
    menu: [ 'Home', 'Work', 'Contact' ],
    smallMenu: [ 'Tips', 'Resources', 'Shenanigans' ]
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