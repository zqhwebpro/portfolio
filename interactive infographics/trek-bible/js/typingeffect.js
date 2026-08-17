/**
 * Trek Bible - Animated Typewriter Effect
 * -------------------------------------------------------------
 * Simulates real-time keyboard typing and backspacing across an array of headlines.
 * Supports pipe characters ('|') for multi-line breaks between header and sub-paragraph.
 */

$(document).ready(function () {
    'use strict';

    // State tracking variables
    let charIndex = 0;
    let quoteIndex = 0;
    let isBackspacing = false;
    let isParagraph = false;

    // Headlines to cycle through
    const textArray = [
        'We Build Brands For Your Business',
        'Creating user experience design',
        'Best digital solution for your brand'
    ];

    // Animation timing configurations (in milliseconds)
    const typingSpeed = 100;
    const waitBeforeBackspace = 1000;
    const waitBetweenLines = 1000;
    const backspaceSpeed = 25;

    /**
     * Typewriter Loop Engine
     * @param {string} containerId - Target container ID
     * @param {Array<string>} quotes - Array of text strings to type
     */
    function typeWriter(containerId, quotes) {
        const $container = $('#' + containerId);
        if (!$container.length) return;

        const currentString = quotes[quoteIndex];
        const $header = $container.children('h1');
        const $paragraph = $container.children('p');

        if (!isBackspacing) {
            // Typing Forward
            if (charIndex < currentString.length) {
                const currentChar = currentString.charAt(charIndex);

                // Pipe delimiter triggers subheader paragraph break
                if (currentChar === '|') {
                    isParagraph = true;
                    $header.removeClass('cursor');
                    $paragraph.addClass('cursor');
                    charIndex++;
                    setTimeout(() => typeWriter(containerId, quotes), waitBetweenLines);
                } else {
                    if (!isParagraph) {
                        $header.text($header.text() + currentChar);
                    } else {
                        $paragraph.text($paragraph.text() + currentChar);
                    }
                    charIndex++;
                    setTimeout(() => typeWriter(containerId, quotes), typingSpeed);
                }
            } else {
                // Finished typing full quote, pause before backspacing
                isBackspacing = true;
                setTimeout(() => typeWriter(containerId, quotes), waitBeforeBackspace);
            }
        } else {
            // Backspacing / Erasing
            const headerLen = $header.text().length;
            const paraLen = $paragraph.text().length;

            if (headerLen > 0 || paraLen > 0) {
                if (paraLen > 0) {
                    $paragraph.text($paragraph.text().substring(0, paraLen - 1));
                } else if (headerLen > 0) {
                    $paragraph.removeClass('cursor');
                    $header.addClass('cursor');
                    $header.text($header.text().substring(0, headerLen - 1));
                }
                setTimeout(() => typeWriter(containerId, quotes), backspaceSpeed);
            } else {
                // Erased completely, move to next quote in the list
                isBackspacing = false;
                charIndex = 0;
                isParagraph = false;
                quoteIndex = (quoteIndex + 1) % quotes.length;
                setTimeout(() => typeWriter(containerId, quotes), 50);
            }
        }
    }

    // Start typewriter effect if target container exists
    if ($('#output').length) {
        typeWriter('output', textArray);
    }
});