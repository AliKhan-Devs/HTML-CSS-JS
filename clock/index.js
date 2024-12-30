// Get the DOM elements for the clock hands 
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('min');
const hours = document.getElementById('hrs');

// Update the clock hands every second
setInterval(() => {
    const time = new Date();
    const sec = time.getSeconds();
    const min = time.getMinutes();
    const hrs = time.getHours();

    // Calculate rotation angles
    const secRotation = sec * 6;
    const minRotation = (min + sec / 60) * 6; // Include seconds in minute rotation
    const hrsRotation = (hrs + min / 60) * 30; // Include minutes in hour rotation

    // Apply rotations
    seconds.style.transform = `rotate(${secRotation}deg)`;
    minutes.style.transform = `rotate(${minRotation}deg)`;
    hours.style.transform = `rotate(${hrsRotation}deg)`;
    
   // if the hrs are greater than 12 then make it pm otherwise remain AM
    if(hrs >= 12){
        document.getElementById('hrs-digit').innerHTML = hrs - 12;
        document.getElementById('format').innerHTML = 'PM'
    }

    // when it 24hrs then there is AM because at night after 12 we use AM so make it AM

    else if(hrs == 24){
        document.getElementById('hrs-digit').innerHTML = hrs - 12;
        document.getElementById('format').innerHTML = 'AM'
    }

    // Other wise remain AM

    else{
        document.getElementById('hrs-digit').innerHTML = hrs 
        document.getElementById('format').innerHTML = 'AM'
    }
    
    // As hours are displayed similarly display min and sec
    
    document.getElementById('min-digit').innerHTML = min 
    document.getElementById('sec-digit').innerHTML = sec
    






    console.log('rotated');
}, 1000);
