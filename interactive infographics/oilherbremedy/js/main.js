/**
 * Herbal Remedies & Essential Oils Interactive Directory
 * -------------------------------------------------------------
 * Powers the categorized search (Semantic UI Search), grid filtering (Filterizr),
 * lazy loading of remedy illustrations, responsive navigation drawer, and filter sync.
 */

$(function () {
  'use strict';

  // Category dictionary for autocomplete search (Herbs, Essential Oils, and Symptoms)
  const categoryContent = [{
    category: 'Herb',
    title: 'Aloe Vera'
  }, {
    category: 'Herb',
    title: 'Ashwagandha'
  },  {
    category: 'Herb',
    title: "Athlete's Foot"
  }, {
    category: 'Oil',
    title: 'Birch'
  }, {
    category: 'Herb',
    title: 'Broadleaf Plantain'
  }, {
    category: 'Herb',
    title: 'Calendula'
  }, {
    category: 'Herb',
    title: 'Catnip'
  }, {
    category: 'Herb',
    title: 'Chamomile'
  }, {
    category: 'Oil',
    title: 'Cinnamon'
  }, {
    category: 'Oil',
    title: 'Clary Sage'
  }, {
    category: 'Oil',
    title: 'Clove'
  }, {
    category: 'Oil',
    title: 'Cypress'
  }, {
    category: 'Herb',
    title: 'Dandelion'
  }, {
    category: 'Herb',
    title: 'Echinacea'
  }, {
    category: 'Herb',
    title: 'Elderberry'
  }, {
    category: 'Oil',
    title: 'Eucalyptus'
  }, {
    category: 'Herb',
    title: 'Fenugreek'
  }, {
    category: 'Herb',
    title: 'Feverfew'
  }, {
    category: 'Oil',
    title: 'Frankincense'
  }, {
    category: 'Herb',
    title: 'Garlic'
  }, {
    category: 'Oil',
    title: 'Ginger'
  }, {
    category: 'Herb',
    title: 'Gingko'
  }, {
    category: 'Herb',
    title: 'Ginseng'
  }, {
    category: 'Herb',
    title: 'Goldenseal'
  }, {
    category: 'Oil',
    title: 'Grapefruit'
  }, {
    category: 'Oil',
    title: 'Jojoba'
  }, {
    category: 'Herb',
    title: 'Lavender'
  }, {
    category: 'Oil',
    title: 'Lemon'
  }, {
    category: 'Oil ',
    title: 'Lemongrass'
  }, {
    category: 'Herb',
    title: 'Licorice'
  }, {
    category: 'Oil ',
    title: 'Marjoram'
  }, {
    category: 'Herb',
    title: 'Marshmallow'
  }, {
    category: 'Herb',
    title: 'Milk Thistle'
  }, {
    category: 'Herb',
    title: 'Mountain Mint'
  }, {
    category: 'Herb',
    title: 'Mullein'
  }, {
    category: 'Oil',
    title: 'Oregano'
  }, {
    category: 'Herb',
    title: 'Peppermint'
  }, {
    category: 'Herb',
    title: 'Pot Marigold'
  }, {
    category: 'Oil',
    title: 'Rose'
  }, {
    category: 'Herb',
    title: 'Rosemary'
  }, {
    category: 'Herb',
    title: 'Sage'
  }, {
    category: 'Oil',
    title: 'Sandalwood'
  }, {
    category: 'Herb',
    title: 'Saw Palmetto'
  }, {
    category: 'Oil',
    title: 'Sweet Orange'
  }, {
    category: 'Oil',
    title: 'Tea Tree'
  }, {
    category: 'Oil',
    title: 'Thieves'
  }, {
    category: 'Herb',
    title: 'Thyme'
  }, {
    category: 'Herb',
    title: 'Turmeric'
  }, {
    category: 'Herb',
    title: 'Valerian'
  }, {
    category: 'Oil',
    title: 'Vanilla'
  }, {
    category: 'Oil',
    title: 'Wintergreen'
  }, {
    category: 'Herb',
    title: 'Witch Hazel'
  }, {
    category: 'Oil',
    title: 'Yarrow'
  }, {
    category: 'Herb',
    title: 'Witch Hazel'
  }, {
    category: 'Symptom',
    title: 'Asthma'
  }, {
    category: 'Symptom',
    title: 'Cirrhosis'
  }, {
    category: 'Symptom',
    title: 'Arthritis'
  }, {
    category: 'Symptom',
    title: 'Anti-aging'
  }, {
    category: 'Symptom',
    title: 'Bad Breath'
  }, {
    category: 'Symptom',
    title: 'Canker Sores'
  }, {
    category: 'Symptom',
    title: 'Cold Sores'
  }, {
    category: 'Symptom',
    title: 'Colic'
  }, {
    category: 'Symptom',
    title: 'Common Warts'
  }, {
    category: 'Symptom',
    title: 'Constipation'
  }, {
    category: 'Symptom',
    title: 'Cough'
  }, {
    category: 'Symptom',
    title: 'Cramps'
  }, {
    category: 'Symptom',
    title: 'Dandruff'
  }, {
    category: 'Symptom',
    title: 'Depression'
  }, {
    category: 'Symptom',
    title: 'Diabetes'
  }, {
    category: 'Symptom',
    title: 'Diaper Rash'
  }, {
    category: 'Symptom',
    title: 'Diarrhea'
  }, {
    category: 'Symptom',
    title: 'Digestion'
  }, {
    category: 'Symptom',
    title: 'Dizziness'
  }, {
    category: 'Symptom',
    title: 'Dry Skin'
  }, {
    category: 'Symptom',
    title: 'Dry Sockets'
  }, {
    category: 'Symptom',
    title: 'Ear Infection'
  }, {
    category: 'Symptom',
    title: 'Eczema'
  }, {
    category: 'Symptom',
    title: 'Energy'
  }, {
    category: 'Symptom',
    title: 'Excessive Weight Gain'
  }, {
    category: 'Symptom',
    title: 'Fatigue'
  }, {
    category: 'Symptom',
    title: 'Fatty Liver Disease'
  }, {
    category: 'Symptom',
    title: 'Fevers'
  }, {
    category: 'Symptom',
    title: 'Flu'
  }, {
    category: 'Symptom',
    title: 'Focus'
  }, {
    category: 'Symptom',
    title: 'Fungal Infections'
  }, {
    category: 'Symptom',
    title: 'Gas'
  }, {
    category: 'Symptom',
    title: 'Gastritis'
  }, {
    category: 'Symptom',
    title: 'Gingivitis'
  }, {
    category: 'Symptom',
    title: 'Gum Disease'
  }, {
    category: 'Symptom',
    title: 'Hair Loss'
  }, {
    category: 'Symptom',
    title: 'Headaches'
  }, {
    category: 'Symptom',
    title: 'Heart Disease'
  }, {
    category: 'Symptom',
    title: 'Heartburn'
  }, {
    category: 'Symptom',
    title: 'Hemorrhoids'
  }, {
    category: 'Symptom',
    title: 'Hepatitis'
  }, {
    category: 'Symptom',
    title: 'High Blood Pressure'
  }, {
    category: 'Symptom',
    title: 'High Cholesterol'
  }, {
    category: 'Symptom',
    title: 'Hot Flashes'
  }, {
    category: 'Symptom',
    title: 'Indigestion'
  }, {
    category: 'Symptom',
    title: 'Insect Bites'
  }, {
    category: 'Symptom',
    title: 'Insomnia'
  }, {
    category: 'Symptom',
    title: 'Intestinal Bacterial Overgrowth'
  }, {
    category: 'Symptom',
    title: 'Intestinal Gas'
  }, {
    category: 'Symptom',
    title: 'Irregular Heartbeat'
  }, {
    category: 'Symptom',
    title: 'Irregular Menstrual Periods'
  }, {
    category: 'Symptom',
    title: 'Irritable Bowel Disease'
  }, {
    category: 'Symptom',
    title: 'Itchy Skin'
  }, {
    category: 'Symptom',
    title: 'Jaundice'
  }, {
    category: 'Symptom',
    title: 'Joint Pain'
  }, {
    category: 'Symptom',
    title: 'Lice'
  }, {
    category: 'Symptom',
    title: 'Memory'
  }, {
    category: 'Symptom',
    title: 'Memory Loss'
  }, {
    category: 'Symptom',
    title: 'Menopause'
  }, {
    category: 'Symptom',
    title: 'Menstrual Cramps'
  }, {
    category: 'Symptom',
    title: 'Migraines'
  }, {
    category: 'Symptom',
    title: 'Minor Burns'
  }, {
    category: 'Symptom',
    title: 'Mouth Sores'
  }, {
    category: 'Symptom',
    title: 'Muscle Aches'
  }, {
    category: 'Symptom',
    title: 'Muscle Spasms'
  }, {
    category: 'Symptom',
    title: 'Nausea'
  }, {
    category: 'Symptom',
    title: 'Nosebleeds'
  }, {
    category: 'Symptom',
    title: 'Oral Inflammation'
  }, {
    category: 'Symptom',
    title: 'Osteoporosis'
  }, {
    category: 'Symptom',
    title: 'Peptic Ulcers'
  }, {
    category: 'Symptom',
    title: 'Plaque'
  }, {
    category: 'Symptom',
    title: 'Poor Appetite'
  }, {
    category: 'Symptom',
    title: 'Prostate'
  }, {
    category: 'Symptom',
    title: "St. John's Wort"
  }, {
    category: 'Symptom',
    title: 'Psoriasis'
  }, {
    category: 'Symptom',
    title: 'Respiratory Tract Infections'
  }, {
    category: 'Symptom',
    title: 'Rheumatoid Arthritis'
  }, {
    category: 'Symptom',
    title: 'Ringworm'
  }, {
    category: 'Symptom',
    title: 'Sciatica'
  }, {
    category: 'Symptom',
    title: 'Sinus Congestion'
  }, {
    category: 'Symptom',
    title: 'Skin Inflammation'
  }, {
    category: 'Symptom',
    title: 'Skin Irritation'
  }, {
    category: 'Symptom',
    title: 'Sleeplessness'
  }, {
    category: 'Symptom',
    title: 'Sore Throat'
  }, {
    category: 'Symptom',
    title: 'Stomach Lining Swelling'
  }, {
    category: 'Symptom',
    title: 'Stomach Ulcers'
  }, {
    category: 'Symptom',
    title: 'Stress'
  }, {
    category: 'Symptom',
    title: 'Sunburn'
  }, {
    category: 'Symptom',
    title: 'Testosterone Imbalance'
  }, {
    category: 'Symptom',
    title: 'Throat Inflammation'
  }, {
    category: 'Symptom',
    title: 'Thrush'
  }, {
    category: 'Symptom',
    title: 'Tinnitus'
  }, {
    category: 'Symptom',
    title: 'Toe Nail Fungus'
  }, {
    category: 'Symptom',
    title: 'Toothache'
  }, {
    category: 'Symptom',
    title: 'Ulcers'
  }, {
    category: 'Symptom',
    title: 'Upset Stomach'
  }, {
    category: 'Symptom',
    title: 'Urinary Tract Infections'
  }, {
    category: 'Symptom',
    title: 'Vaginal Infections'
  }, {
    category: 'Symptom',
    title: 'Varicose Veins'
  }, {
    category: 'Symptom',
    title: 'Vomiting'
  }, {
    category: 'Symptom',
    title: 'Wrinkles'
  }, {
    category: 'Symptom',
    title: 'Yeast Infection'
  }];

  /**
   * Semantic UI Autocomplete Category Search
   */
  if ($.fn.search) {
    $('.ui.search').search({
      type: 'category',
      source: categoryContent
    });
  }

  /**
   * Filterizr Grid Layout Configuration
   */
  let filterizd = null;
  if ($.fn.filterizr) {
    filterizd = $('.filtr-container').filterizr({});
    filterizd.filterizr('setOptions', {
      layout: 'vertical',
      delay: 100,
      delayMode: 'alternate',
      filterOutCss: { display: 'none' },
      filterInCss: { display: 'block' }
    });
  }

  /**
   * Active State Toggle for Dropdown Items
   */
  $('.dropdown-item').on('click', function () {
    $('.dropdown-item').removeClass('activated');
    $(this).addClass('activated');
  });

  /**
   * Mobile Navigation Slide Toggle
   */
  const navSlide = () => {
    const burgerWrap = document.querySelector('.nav-burger-wrap');
    const containerNav = document.querySelector('.container-nav');
    const filtrContainer = document.querySelector('.filtr-container');

    if (burgerWrap && containerNav && filtrContainer) {
      burgerWrap.addEventListener('click', () => {
        containerNav.classList.toggle('nav-burger-hide');
        filtrContainer.classList.toggle('filtr-container-hide');
      });
    }
  };

  /**
   * Responsive Viewport Check
   * Restores navigation visibility when viewport expands beyond mobile breakpoint (715px).
   */
  function checkWidth() {
    if ($(window).width() >= 715) {
      $('.container-nav').removeClass('nav-burger-hide');
      $('.filtr-container').removeClass('filtr-container-hide');
    }
  }

  // Initialize mobile drawer and responsive resize listener
  navSlide();
  $(window).on('resize', checkWidth);

  /**
   * Lazy Load Images with Fade-In Effect
   */
  if ($.fn.lazy) {
    $('.lazy').lazy({
      scrollDirection: 'vertical',
      effects: 'fadeIn',
      delay: 50
    });
  }

  /**
   * Dropdown Menu & Search Reset Synchronization
   */
  // Update button label when symptom dropdown item is selected
  $(document).on('click', '#menu-symp .dropdown-item', function (event) {
    $('#btn-symp').html(event.target.innerHTML);
  });

  // Update button label when herb dropdown item is selected
  $(document).on('click', '#menu-herb .dropdown-item', function (event) {
    $('#btn-herb').html(event.target.innerHTML);
  });

  // Reset filters when clicking on text search input
  $(document).on('click', 'input', function () {
    $('.dropdown-item').removeClass('activated');
    $('#btn-herb').html('HERBS + OILS');
    $('#btn-symp').html('SYMPTOMS');
  });

  // Reset all filters and search input on "All" button click
  $(document).on('click', '.all-button', function () {
    $('.dropdown-item').removeClass('activated');
    $('#btn-herb').html('HERBS + OILS');
    $('#btn-symp').html('SYMPTOMS');
    const enterEvent = $.Event('keyup', { keyCode: 13 });
    $('#clear-prompt').val('').trigger(enterEvent).attr('placeholder', 'SEARCH...');
  });

  // Reset symptoms when herbs button is clicked
  $('#btn-herb').on('click', function () {
    $('#btn-symp').html('SYMPTOMS');
    const enterEvent = $.Event('keyup', { keyCode: 13 });
    $('#clear-prompt').val('').trigger(enterEvent).attr('placeholder', 'SEARCH...');
  });

  // Reset herbs when symptoms button is clicked
  $('#btn-symp').on('click', function () {
    $('#btn-herb').html('HERBS + OILS');
    const enterEvent = $.Event('keyup', { keyCode: 13 });
    $('#clear-prompt').val('').trigger(enterEvent).attr('placeholder', 'SEARCH...');
  });
});