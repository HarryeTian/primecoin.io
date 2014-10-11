$(document).ready(function() {
    // config
    var tickerPath = "tickerinfo.php"; // Where the JSON comes from
    var updateInterval = 90; // In seconds
    // end config

    var secondsSinceUpdate = 0;
    var intervalId = null;

    function updateMarketInfo() {
        $.getJSON(tickerPath, null, function(data) {
            if (intervalId == null) {
                intervalId = setInterval(function() {
                    secondsSinceUpdate++;
                    $('#seconds-since-update').text(secondsSinceUpdate + " seconds ago");
                }, 1000);
            }
            $('#current-price').text("$" + data['price'] + " USD/XPM");
            $('#market-cap').text("$" + commaSeparateNumber(data['market_cap']));
            $('#total-supply').text(commaSeparateNumber(data['total_supply']) + " XPM");
            secondsSinceUpdate = 0;
        });
    }

    // Helper to comma-sepaate the market cap and supply
    // Credit to: http://bit.ly/1alo9Ye
    function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    }

    updateMarketInfo();
    setInterval(updateMarketInfo, 30000);
});
