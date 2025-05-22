document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Bid functionality
    const bidAmount = document.getElementById('bidAmount');
    const bidButton = document.querySelector('.bid-button');
    const bidDetails = document.querySelector('.bid-details');
    let currentHighestBid = 0;

    // Update current highest bid display
    function updateBidDetails() {
        bidDetails.innerHTML = `
            <p>Minimum bid: $1,000</p>
            <p>Current highest bid: $${currentHighestBid.toLocaleString()}</p>
        `;
    }

    // Handle bid submission
    bidButton.addEventListener('click', function(e) {
        const amount = parseInt(bidAmount.value);
        
        if (!amount || amount < 1000) {
            alert('Please enter a bid amount of at least $1,000');
            return;
        }

        // Here you would typically send this bid to your server
        // For now, we'll just update the UI and show a message
        currentHighestBid = Math.max(currentHighestBid, amount);
        updateBidDetails();
        
        alert(`Thank you for your bid of $${amount.toLocaleString()}!\nWe will review your offer and contact you shortly.`);
        bidAmount.value = '';
    });

    // Update bid details on page load
    updateBidDetails();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            // Send form data
            const formData = new FormData(this);
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                alert(result.message);
                this.reset();
            } else {
                // Show error message
                alert(result.message);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error:', error);
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });

    // Add scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});
