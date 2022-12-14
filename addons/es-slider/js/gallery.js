$(function () {
  // ======================= imagesLoaded Plugin ===============================
  // https://github.com/desandro/imagesloaded

  // $('#my-container').imagesLoaded(myFunction)
  // execute a callback when all images have loaded.
  // needed because .load() doesn't work on cached images

  // callback function gets image collection as argument
  //  this is the container

  // original: mit license. paul irish. 2010.
  // contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

  $.fn.imagesLoaded = function (callback) {
    var $images = this.find("img"),
      len = $images.length,
      _this = this,
      blank =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    function triggerCallback() {
      callback.call(_this, $images);
    }

    function imgLoaded() {
      if (--len <= 0 && this.src !== blank) {
        setTimeout(triggerCallback);
        $images.off("load error", imgLoaded);
      }
    }

    if (!len) {
      triggerCallback();
    }

    $images.on("load error", imgLoaded).each(function () {
      // cached images don't fire load sometimes, so we reset src.
      if (this.complete || this.complete === undefined) {
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
      }
    });

    return this;
  };

  //   Gallery.init();

  /*
	Example to add more items to the gallery:
	
	var $new  = $('<li><a href="#"><img src="images/thumbs/1.jpg" data-large="images/1.jpg" alt="image01" data-description="From off a hill whose concave womb reworded" /></a></li>');
	Gallery.addItems( $new );
	*/
});
