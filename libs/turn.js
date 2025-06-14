// Versi ringkas dari Turn.js untuk flipbook
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
}(this, function($) {
  "use strict";
  
  // Implementasi lengkap Turn.js
  // [Kode lengkap Turn.js sebenarnya sangat panjang, sekitar 3000+ baris]
  // Berikut adalah versi yang sangat disederhanakan untuk fungsi dasar:
  
  var Turn = function(element, options) {
    this._init(element, options);
  };
  
  Turn.prototype = {
    _init: function(element, options) {
      this.options = $.extend({}, Turn.defaults, options);
      this.element = $(element);
      this.pages = [];
      this.currentPage = 1;
      
      // Inisialisasi flipbook
      this._setup();
    },
    
    _setup: function() {
      // Setup DOM dan event listeners
      this.element.addClass('turn-wrapper');
      this.pages = this.element.find('.page');
      this._updatePages();
    },
    
    _updatePages: function() {
      // Update tampilan halaman
      this.pages.hide();
      $(this.pages[this.currentPage - 1]).show();
    },
    
    turn: function(direction) {
      // Membalik halaman
      if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.pages.length) {
        this.currentPage++;
      }
      
      this._updatePages();
      
      // Trigger event
      this.element.trigger('turn', [this.currentPage]);
    },
    
    // ... metode lainnya ...
  };
  
  Turn.defaults = {
    width: 800,
    height: 500,
    duration: 1000,
    acceleration: true,
    gradients: true
  };
  
  $.fn.turn = function(options) {
    return this.each(function() {
      if (!$.data(this, 'turn')) {
        $.data(this, 'turn', new Turn(this, options));
      }
    });
  };
  
  return Turn;
}));
