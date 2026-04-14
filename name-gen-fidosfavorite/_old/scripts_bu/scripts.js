function randomName() {

  // get JSON, filter, randomize, local, output, & store data
  $(document).on('click', '.generate', function () {
    $.getJSON("../data/full-data-set.json", function (json) {

      // reusbale declerations
      const maleNames = "maleNames";
      const femaleNames = "femaleNames";
      const human = "Human";
      const popular = "Popular";
      const funny = "Funny";
      const unique = "Unique";

      // filter
      const genderFilter = [];
      const namesFilter = [];
      const prefixes = [];
      const regex = RegExp(`^[${prefixes.join('')}]`, 'i');
      //console.log(names.filter(name => regex.test(name)));

      // randomize
      const getRandomNumber = max => Math.floor(Math.random() * max);
      const gender = [maleNames, femaleNames];
      const choices = [human, popular, funny, unique];
      let genderRandom = `${gender[Math.floor(Math.random() * gender.length)]}`;
      let choicesRandom = `${choices[Math.floor(Math.random() * choices.length)]}`;
      const getRandomName = () => {
        const arr = json[genderRandom][choicesRandom];
        return `${arr[getRandomNumber(arr.length - 1)]}`;
      }

      // output
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
      console.log(prefixes);
    });
  });
  // store data
  $(document).on('click', '.add-to-list', function () {
    const savedName = $('.random-name').html();
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
    $(".fredoka--li").append('<li>' + savedName + '</li>');
    //  appendNameToList(savedName);
    //  const list = get('namesList', []);
    //  list.push(savedName);
    //  set('namesList', list);
  });
  $(document).on('click', '.fredoka--li li', function () {
    $(this).addClass('display-none');
  });
}
//const list = get('namesList', []);
//console.dir(list)
//for (const name of list) {
//  appendNameToList(name);
//}
//function get(key, def) {
//  let ret;
//  try {
//    ret = JSON.parse(localStorage.getItem(key));
//  } catch (e) {
//    console.log('Error saving to local storage. If you refresh your browser you will have to recompile your');
//  }
//  if (!ret && def) {
//    ret = set(key, def);
//  }
//  return ret;
//}
//function set(key, value) {
//  localStorage.setItem(key, JSON.stringify(value));
//  return value;
//}
//function appendNameToList(name) {
//  $(".fredoka--li").append('<li>' + name + '</li>');
//}
randomName();
function navigation() {
  // click animation not including pet-names transitions & add-to-list (above)
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
    $(".pup-options").addClass("z-front fade-in-top");
  });
  $(document).on('click', '.fa-times--list', function () {
    $(".pup-list").removeClass("z-front fade-in-bottom");
    $(".pup-name").addClass("z-front fade-in-top");
  });
  $(document).on('click', '.my-list-link', function () {
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
  });
  $(document).on('click', '.radio-buttons input', function (event) {
    $($(this)).parent('label').toggleClass("radio-buttons-selected");
    console.log($(this).val());
  });
  $(document).on('click', '.radio-no-radio input', function () {
    $($(this)).parent('label').toggleClass("radio-buttons-selected");
  });
  $(document).on('click', '.radio-buttons--gender input', function () {
    genderFilter.push($(this).val());
  });
  $(document).on('click', '.radio-buttons--names input', function () {
    namesFilter.push($(this).val());
  });
  $(document).on('click', '.radio-no-radio input', function () {
    prefixes.push($(this).val());
  });
};
navigation();
function socialMedia() {
  // display social media modal
  $(document).on('click', '.social-share', function () {
    $('.modal-container').addClass('modal-container-bg');
    $('.social-share-modal').addClass('fade-in social-share-modal-backdrop');
  });
  $(document).on('click', '.modal-close', function () {
    $('.modal-container').removeClass('modal-container-bg');
    $('.social-share-modal').removeClass('fade-in social-share-modal-backdrop');
  });
};
socialMedia();