function randomName() {

  $(document).on('click', '.generate', function () {
    $.getJSON("../data/full-data-set.json", function (json) {

      //logic to figure out
      //listen input selection 
      //filter the json array for results
      //array['gender'] = input[value = gender]
      //array['']['namestyle'] input[value = gender]
      //array[''][''][''] = first letter of a name

      const names = ['hello', 'foo'];
      const prefixes = ['C', 'B'];
      const regex = RegExp(`^[${prefixes.join('')}]`, 'i');
      console.log(names.filter(name => regex.test(name)));

      // Randomize Arrays
      
      // Math
      const getRandomNumber = max => Math.floor(Math.random() * max);
      
      // Options
      const gender = ["maleNames", "femaleNames"];
      const choices = ["Human", "Popular", "Funny", "Unique"];
      
      // Randomize Options
      let genderRandom = `${gender[Math.floor(Math.random() * gender.length)]}`;
      let choicesRandom = `${choices[Math.floor(Math.random() * choices.length)]}`;
      
      // Run Randomizer
      const getRandomName = () => {
        const arr = json[genderRandom][choicesRandom];
        return `${arr[getRandomNumber(arr.length - 1)]}`;
      }
      
      // Display Calculation
      $(".random-name").html(getRandomName);
            
      // Switch Colors on Names Page
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

  $(document).on('click', '.add-to-list', function () {
    const savedName = $('.random-name').html();

    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
    appendNameToList(savedName);

    const list = get('namesList', []);

    // Local Storage/Save List
    list.push(savedName);

    set('namesList', list);
  });
}

const list = get('namesList', []);
console.dir(list)
for(const name of list) {
  appendNameToList(name);
}

function get(key, def) {
  let ret;
  try {
    ret = JSON.parse(localStorage.getItem(key));
  } catch (e) { 

    console.log('Error saving to local storage. If you refresh your browser you will have to recompile your'); 
  }

  if (!ret && def) {
    ret = set(key, def);
  }

  return ret;
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function appendNameToList(name) {
  $(".fredoka--li").append('<li>' + name + '</li>');
}

randomName();