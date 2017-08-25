/*
 * October edits
 */

+function ($) { "use strict";

  // Remove pin/unpin flyout sidenav
  $(document).on('ready', function() {
    $(document.body).removeClass('side-panel-not-fixed')
    $(document.body).addClass('side-panel-fix-shadow')
  })

}(window.jQuery);
