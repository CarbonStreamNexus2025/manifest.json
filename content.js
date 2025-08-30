// CarbonStream Nexus Content Script
// This script runs on every page load for YouTube/Netflix

(function() {
    'use strict';

    // Listen for video elements
    function optimizeVideoStreaming() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (!video.hasAttribute('data-carbon-optimized')) {
                // Reduce quality by setting a lower bitrate limit (example for adaptive streams)
                if (video.webkitSetPresentationMode) {
                    video.webkitSetPresentationMode('standard');
                }
                video.setAttribute('data-carbon-optimized', 'true');

                // Calculate savings - simplified example
                const estimatedSavings = calculateSavings(video);
                displayCarbonReceipt(estimatedSavings);
            }
        });
    }

    function calculateSavings(videoElement) {
        // Placeholder for complex calculation based on bitrate reduction and grid intensity
        // This will be replaced with actual API call to our backend
        const savingsPerMinute = 0.5; // grams of CO2 per minute
        return savingsPerMinute;
    }

    function displayCarbonReceipt(savings) {
        const receipt = document.createElement('div');
        receipt.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; 
                        background: rgba(0,100,0,0.9); color: white; padding: 10px; 
                        border-radius: 5px; font-family: Arial, sans-serif; font-size: 14px;">
                ♻️ CarbonStream Nexus: Saving ~${savings.toFixed(1)}g CO₂/min
            </div>
        `;
        document.body.appendChild(receipt);

        // Remove after 5 seconds
        setTimeout(() => {
            receipt.remove();
        }, 5000);
    }

    // Run initially and then set up a MutationObserver to detect new videos
    optimizeVideoStreaming();
    const observer = new MutationObserver(optimizeVideoStreaming);
    observer.observe(document.body, { childList: true, subtree: true });
})();
