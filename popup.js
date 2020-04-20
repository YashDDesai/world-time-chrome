timeZones = [
    {
        city: "Manila, Philippines",
        offset:"+8.0"
    },
    {
        city: "Tokyo, Japan",
        offset:"+9.0"
    }
]

city = ''
offset = ''

chrome.storage.sync.get('selectedCity', function(data) {
    city = timeZones[data.selectedCity].city;
    offset = timeZones[data.selectedCity].offset
  });


function calcTime() {

    
    // create Date object for current location
    d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
//     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
// hour:'2-digit', minute:'2-digit', second:'2-digit' };

    var optionsForTime = { 
    hour:'2-digit', minute:'2-digit', second:'2-digit' };

    var optionsForDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    nd = new Date(utc + (3600000*offset));

    $('#city').html(`${city}: `)
    $('#date').html(`${nd.toLocaleDateString("en-US", optionsForDate)}`)
    $('#time').html(`${nd.toLocaleTimeString("en-US", optionsForTime)}`)

    setTimeout(calcTime, 1000); 
}
calcTime()


$('#go-to-options').on('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

