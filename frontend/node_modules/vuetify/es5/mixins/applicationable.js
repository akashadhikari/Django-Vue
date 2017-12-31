export default {
  props: {
    app: Boolean
  },

  watch: {
    app: function app() {
      this.updateApplication();
    }
  },

  mounted: function mounted() {
    this.updateApplication();
  }
};