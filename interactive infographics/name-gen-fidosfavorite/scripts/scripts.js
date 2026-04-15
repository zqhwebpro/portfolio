function randomName() {

  //filter data
  var genderFilter = [];
  var namesFilter = [];
  var prefixes = [];

  // filter click
  $(document).on('click', '.radio-buttons--gender', function () {
    genderFilter.push($(this).val());
  });
  $(document).on('click', '.radio-buttons--names', function () {
    namesFilter.push($(this).val());
  });
  $(document).on('click', '.radio-buttons--letter', function () {
    prefixes.push($(this).val())
  });

  $(document).on('click', '.generate', function () {
    
    // get JSON
    $.getJSON("data/full-data-set.json", function (json) {

      // randomize
      const getRandomNumber = max => Math.floor(Math.random() * max);
      const gender = ["maleNames", "femaleNames"];
      const choices = ["Human", "Popular", "Funny", "Unique"];
      const genderRandom = `${gender[Math.floor(Math.random() * gender.length)]}`;
      const choicesRandom = `${choices[Math.floor(Math.random() * choices.length)]}`;
      const getRandomName = () => {
        const arr = json[genderRandom][choicesRandom];
        return `${arr[getRandomNumber(arr.length - 1)]}`;
      }

      const arrx = json[genderRandom][choicesRandom];
      const arry = json[genderRandom][namesFilter];
      const arrz = json[genderRandom][choicesRandom];

      const regx = RegExp(`^[${genderFilter.join('')}]`, 'i');
      const regy = RegExp(`^[${namesFilter.join('')}]`, 'i');
      const regz = RegExp(`^[${prefixes.join('')}]`, 'i');
      
      console.log(arrx.filter(arrx => arrx.match(regx)));
      console.log(arry.filter(arry => arry.match(regy)));
      console.log(arrz.filter(arrz => arrz.match(regz)));

      console.log(regx, regy, regz);

      // color animation shifting
      $(".random-name").html(getRandomName);

      if (genderRandom === "maleNames") {
        $('.pup-name--bg').animate({ backgroundColor: "#78cbff" });
        $('.random-name').animate({ color: "#274961" });
        $('.try-again').animate({ color: "#274961" });
        $('.btn--hover--color--dark').animate({ backgroundColor: "#274961" });
      } else {
        $('.pup-name--bg').animate({ backgroundColor: "#a76fd6" });
        $('.random-name').animate({ color: "#573773" })
        $('.try-again').animate({ color: "#573773" })
        $('.btn--hover--color--dark').animate({ backgroundColor: "#573773" });
      };
    });
  });

  // display data
  $(document).on('click', '.add-to-list', function () {
    const savedName = $('.random-name').html();
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
    $(".fredoka--li").append('<li>' + savedName + '</li>');
  });
  $(document).on('click', '.fredoka--li li', function () {
    $(this).addClass('display-none');
  });

  // navigation
  $(document).on('click', '.get-started', function () {
    $(".pup-options").addClass("z-front fade-in-bottom");
  });
  $(document).on('click', '.fa-times--filter', function () {
    $(".pup-name").addClass("z-front fade-in-top");
    $(".pup-options").removeClass("z-front fade-in-bottom fade-in-top");
  });
  $(document).on('click', '.show-me', function () {
    $(".pup-options").removeClass("z-front fade-in-bottom fade-in-top");
    $(".pup-name").addClass("z-front fade-in-top");
  });
  $(document).on('click', '.try-again', function () {
    $(".pup-name").addClass("z-front");
  });
  $(document).on('click', '.filter', function () {
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-options").addClass("z-front fade-in-bottom");
  });
  $(document).on('click', '.fa-times--list', function () {
    $(".pup-list").removeClass("z-front fade-in-bottom");
    $(".pup-name").addClass("z-front fade-in-top");
  });
  $(document).on('click', '.my-list-link', function () {
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
  });
  $(document).on('click', '.radio-buttons input', function () {
    $($(this)).parent('label').toggleClass("radio-buttons-selected");
  });
  $(document).on('click', '.radio-no-radio input', function () {
    $($(this)).parent('label').toggleClass("radio-buttons-selected");
  });
  $(document).on('click', '.social-share', function () {
    $('.modal-container').addClass('modal-container-bg');
    $('.social-share-modal').addClass('fade-in social-share-modal-backdrop');
  });
  $(document).on('click', '.modal-close', function () {
    $('.modal-container').removeClass('modal-container-bg');
    $('.social-share-modal').removeClass('fade-in social-share-modal-backdrop');
  });
}
randomName();