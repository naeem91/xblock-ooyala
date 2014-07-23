function OoyalaPlayerBlock(runtime, element) {
    OO.ready(function() {
        var content_id = $('.ooyalaplayer', element).data('content-id');
        var player_id = $('.ooyalaplayer', element).data('player-id');
        var transcript_id = $('.ooyalaplayer', element).data('transcript-id');
        var dom_id = $('.ooyalaplayer', element).data('dom-id');
        var player_token = $('.ooyalaplayer', element).data('player-token');
        var transcript_enabled = $('.ooyalaplayer', element).data('transcript-enabled');
        var overlays = $('.ooyala-overlays .ooyala-overlay', element);

        var player_options = {
            onCreate: window.onCreate,
            autoplay: true
        };

        if (player_token) {
            player_options.embedToken = player_token;
        }

        var id = 'ooyala-player-'+ dom_id;
        if (!_.isUndefined(window[id])) {
            window[id].destroy();
        }

        /* we have to initialize the window[player_id], internal OO requirement? */
        window[id] = window[player_id] = OO.Player.create(dom_id, content_id, player_options);

        var pop = Popcorn('#' + dom_id + ' .video');

        overlays.each(function(i, overlay) {
            var start = $(overlay).data('start');
            var end = $(overlay).data('end');
            var text = $(overlay).data('text');
            var target = $(overlay).data('target');

            pop.footnote({
                start: start,
                end: end,
                text: text,
                target: target
            });
        });

        pop.play();
    });
}
