$(document).ready(function() {
    let timeLeft = 150;
    const countdownEl = $('.countdown');
    let countdownTimer;

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        countdownEl.text(`${minutes < 10 ? '0' + minutes : minutes}:${seconds}`);
        
        if (timeLeft === 0) {
            clearInterval(countdownTimer);
            $('.resend-info').html('<a href="#" class="resend-otp">Resend OTP</a>');
        } else {
            timeLeft--;
        }
    }
    
    countdownTimer = setInterval(updateCountdown, 1000);
    
    $(document).on('click', '.resend-otp', function(e) {
        e.preventDefault();
        
        $('.resend-info').html('<span>Resend OTP in </span><span class="countdown">02:30</span>');
        timeLeft = 150;
        countdownTimer = setInterval(updateCountdown, 1000);
        
        $('<div class="alert alert-success mt-3">OTP resent successfully!</div>')
            .insertAfter('.otp-info')
            .delay(3000)
            .fadeOut(function() {
                $(this).remove();
            });
    });
    
    $('.lets-go-btn').click(function() {
        const otpValue = $('#otp-input').val().trim();
    
        if (otpValue.length < 6) {
            $('<div class="alert alert-danger mt-3">Please enter valid OTP!</div>')
                .insertAfter('.otp-info')
                .delay(3000)
                .fadeOut(function() {
                    $(this).remove();
                });
        } else {
            // Hide OTP screen and show loading screen
            $('.otp-box').hide();
            $('#loading-screen').removeClass('d-none');
    
            // Show first animation (Creating the store)
            $('.creating-store-animation').show();
            $('.creating-store-text').show();
            $('.waiting-store-animation').hide();
            $('.waiting-store-text').hide();

            // After 2.5 seconds, switch to the second animation
            setTimeout(function() {
                $('.creating-store-animation').hide();
                $('.creating-store-text').hide();
                $('.waiting-store-animation').show();
                $('.waiting-store-text').show();
            }, 2500);  // Wait for 2.5 seconds before switching to the second animation
    
            // After 5 seconds in total (3 seconds after the second animation starts), go to the next page
            setTimeout(() => {
                window.location.href = 'step1.html';
            }, 5000); // Total of 5 seconds delay
        }
    });
    
    $('.btn-close').click(function() {
        location.reload();
    });
    
    $('.edit-link').click(function(e) {
        e.preventDefault();
        alert('Edit mobile number functionality would appear here.');
    });
    
    $('#otp-input').focus();
});

function selectTheme(selectedTheme) {
    // Optionally mark selected
    document.querySelectorAll('.theme').forEach(theme => {
      theme.classList.remove('selected-theme');
    });
    selectedTheme.classList.add('selected-theme');
  
    // Hide the theme selection and show step 2
    document.getElementById('themeBox').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}