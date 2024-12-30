
// ========== showing and hiding menu


const menuToggle = document.getElementById('toggle'),
sideBar = document.getElementById('side-bar'),
cross = document.getElementById('cross')

function showSide(){
    sideBar.style.display = 'block';
}
function hideSide(){
    sideBar.style.display = 'none'
}

// =========== hide navlinks menu when click on a navlink
const navLinks = document.querySelectorAll('.link');
navLinks.forEach(link => {
    link.addEventListener('click', hideSide);
});



// ============ buy button setting for whatsapp ===============
    // Get all "Buy" buttons
    const buyButtons = document.querySelectorAll('.item button');

   

    // Function to handle button click
    function handleBuyClick(event) {
        const container = event.target.closest('.item');
        const imageSrc = container.querySelector('img').src;
        const productName = container.querySelector('h2').textContent;
        const productPrice = container.querySelector('.price').textContent;

        // Customize your pre-text message
        const preText = `Hi! I'm interested in the ${productName}. Please see details below:\n\nImage: ${imageSrc}\nPrice: ${productPrice}`;

        // Replace YOUR_PHONE_NUMBER with the actual phone number
        const phoneNumber = '+923160581732';
        const encodedMessage = encodeURIComponent(preText);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        // Open WhatsApp link in a new tab
        window.open(whatsappLink, '_blank');
    }

    // Attach click event listener to each button
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });
// ============== notification setting =========
    document.getElementById('close-notification');

    function hideNotification(){
        document.getElementById('notification').style.display = 'none';
    }

    setTimeout(() => {
        document.getElementById('notification').style.display = 'inline';
    }, 5000);
