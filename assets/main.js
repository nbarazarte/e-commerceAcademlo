$(function(){
    $('#Container').on('mixLoad', function() {
      console.log('[event-handler] MixItUp Loaded');
    });
    
    $('#Container').on('mixStart', function() {
      console.log('[event-handler] Animation Started')
    });
    
    $('#Container').on('mixEnd', function() {
      console.log('[event-handler] Animation Ended')
    });
    
    $('#Container').mixItUp({
      callbacks: {
        onMixLoad: function() {
          console.log('[callback] MixItUp Loaded');
        },
        onMixStart: function() {
          console.log('[callback] Animation Started');
        },
        onMixEnd: function() {
          console.log('[callback] Animation Ended');
        }
      }
    });
  });