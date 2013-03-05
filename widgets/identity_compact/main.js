/**
 * # Widget `identity_compact`
 *
 * This widget is identified as `identity_compact`  
 * Use it to indicate whether the user is logged in or not, and display login buttons if not.
 *
 */
 define({
  type: "Hull",
  
  /**
   * @name Templates
   * #### `identity_compact`
   * 
   * Displays button with login otions or username/picture if logged in
   *
   */
  templates: ['identity_compact'],

  // Which events to refresh the widget on.
  refreshEvents: ['model.hull.me.change'],

  initialize: function() {
    this.authServices = _.map(this.sandbox.config.services.types.auth, function(s) { return s.replace(/_app$/, ''); })
    if (_.isEmpty(this.authServices)) {
      console.error("No Auth services configured. please add one to be able to authenticate users.");
    }
  },

  /**
   * Process the resolved datasources before sending them to the template
   *
   * @param {Object} data The resolved requests from the `datasources` object
   * @return {Object|Promise|undefined}     The data after you processed it.
   * @name beforeRender
   */
  beforeRender: function(data) {
    data.authServices = this.authServices || [];
    return data;
  }
});