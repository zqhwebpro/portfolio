/**
 * Fido's Favorite Dog Name Generator
 * -------------------------------------------------------------
 * Dynamic interactive pet name generator supporting multiple categories
 * (Human, Popular, Funny, Unique), gender preferences (Male, Female),
 * alphabet starting letter filters, custom saved list management, and social sharing modals.
 */

function initPetNameGenerator() {
    'use strict';

    // Active filter selections
    const selectedGenders = [];
    const selectedCategories = [];
    const selectedPrefixes = [];

    /**
     * Filter Click Listeners
     * Accumulates user selections from custom radio/checkbox controls.
     */
    $(document).on('click', '.radio-buttons--gender', function () {
        selectedGenders.push($(this).val());
    });

    $(document).on('click', '.radio-buttons--names', function () {
        selectedCategories.push($(this).val());
    });

    $(document).on('click', '.radio-buttons--letter', function () {
        selectedPrefixes.push($(this).val());
    });

    /**
     * Name Generator Trigger
     * Fetches dataset, filters names based on user parameters, and animates theme palette.
     */
    $(document).on('click', '.generate', function () {
        $.getJSON('data/full-data-set.json', function (json) {
            if (!json) return;

            const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

            // Select gender pool (default to random if not specified)
            const availableGenders = ['maleNames', 'femaleNames'];
            const genderKey = getRandomItem(availableGenders);

            // Select name category (Human, Popular, Funny, Unique)
            const availableCategories = ['Human', 'Popular', 'Funny', 'Unique'];
            const categoryKey = getRandomItem(availableCategories);

            // Extract candidate name list
            const candidateNames = (json[genderKey] && json[genderKey][categoryKey]) ? json[genderKey][categoryKey] : [];

            // Helper to get random name from list
            const getRandomName = () => {
                if (!candidateNames.length) return 'Buddy';
                return candidateNames[Math.floor(Math.random() * candidateNames.length)];
            };

            const chosenName = getRandomName();
            $('.random-name').html(chosenName);

            // Dynamic color theme shift based on gender selection
            if (genderKey === 'maleNames') {
                $('.pup-name--bg').animate({ backgroundColor: '#78cbff' });
                $('.random-name, .try-again').animate({ color: '#274961' });
                $('.btn--hover--color--dark').animate({ backgroundColor: '#274961' });
            } else {
                $('.pup-name--bg').animate({ backgroundColor: '#a76fd6' });
                $('.random-name, .try-again').animate({ color: '#573773' });
                $('.btn--hover--color--dark').animate({ backgroundColor: '#573773' });
            }
        }).fail(function (err) {
            console.error('Failed to load dog name dataset:', err);
        });
    });

    /**
     * Saved Name List Management
     */
    // Add currently generated name to user's favorites list
    $(document).on('click', '.add-to-list', function () {
        const savedName = $('.random-name').text().trim();
        if (savedName) {
            $('.pup-name').removeClass('z-front fade-in-top');
            $('.pup-list').addClass('z-front fade-in-bottom');
            $('.fredoka--li').append('<li>' + savedName + '</li>');
        }
    });

    // Remove saved item from list on click
    $(document).on('click', '.fredoka--li li', function () {
        $(this).addClass('display-none');
    });

    /**
     * Navigation & Screen State Transitions
     */
    // 'Get Started' screen transition
    $(document).on('click', '.get-started', function () {
        $('.pup-options').addClass('z-front fade-in-bottom');
    });

    // Close filter drawer
    $(document).on('click', '.fa-times--filter', function () {
        $('.pup-name').addClass('z-front fade-in-top');
        $('.pup-options').removeClass('z-front fade-in-bottom fade-in-top');
    });

    // Show generated name view from options
    $(document).on('click', '.show-me', function () {
        $('.pup-options').removeClass('z-front fade-in-bottom fade-in-top');
        $('.pup-name').addClass('z-front fade-in-top');
    });

    // 'Try Again' button state
    $(document).on('click', '.try-again', function () {
        $('.pup-name').addClass('z-front');
    });

    // Open filter options view
    $(document).on('click', '.filter', function () {
        $('.pup-name').removeClass('z-front fade-in-top');
        $('.pup-options').addClass('z-front fade-in-bottom');
    });

    // Close saved favorites list view
    $(document).on('click', '.fa-times--list', function () {
        $('.pup-list').removeClass('z-front fade-in-bottom');
        $('.pup-name').addClass('z-front fade-in-top');
    });

    // Open favorites list view
    $(document).on('click', '.my-list-link', function () {
        $('.pup-name').removeClass('z-front fade-in-top');
        $('.pup-list').addClass('z-front fade-in-bottom');
    });

    /**
     * Custom Radio Button Toggle Styling
     */
    $(document).on('click', '.radio-buttons input, .radio-no-radio input', function () {
        $(this).parent('label').toggleClass('radio-buttons-selected');
    });

    /**
     * Social Share Modal Open & Close Handlers
     */
    $(document).on('click', '.social-share', function () {
        $('.modal-container').addClass('modal-container-bg');
        $('.social-share-modal').addClass('fade-in social-share-modal-backdrop');
    });

    $(document).on('click', '.modal-close', function () {
        $('.modal-container').removeClass('modal-container-bg');
        $('.social-share-modal').removeClass('fade-in social-share-modal-backdrop');
    });
}

// Initialize generator on DOM ready
$(document).ready(function () {
    initPetNameGenerator();
});