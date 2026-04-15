$(document).ready(function () {

    var frm = $('#keto-container');

    frm.submit(function (ev) {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
        });

        ev.preventDefault();
    });

    $("#keto-container").validate({
        rules: {
            "gender": {
                required: true,
            },
            "age": {
                required: true,
            },
            "heightft": {
                required: true,
            },
            "heightin": {
                required: true,
            },
            "weight": {
                required: true,
            },
            "bfp": {
                required: true,
            },
            "activity": {
                required: true,
            },
            "proteinratio": {
                required: true,
            },
            "totalcarbs": {
                required: true,
            },
            "weightGoal": {
                required: true,
            }
        },
        messages: {
            "gender": {
                required: function () {
                    toastr.error('You forgot to select your gender');
                },
            },
            "age": {
                required: function () {
                    toastr.error('Hey, what about your age?');
                },
            },
            "heightft": {
                required: function () {
                    toastr.error('Please enter your height in feet');
                },
            },
            "heightin": {
                required: function () {
                    toastr.error('Please enter your height in inches');
                },
            },
            "weight": {
                required: function () {
                    toastr.error('The calculator requires that you input your weight');
                },
            },
            "bfp": {
                required: function () {
                    toastr.error('Please estimate your Body Fat Percentage');
                },
            },
            "activity": {
                required: function () {
                    toastr.error('Enter your activity amount');
                },
            },
            "proteinratio": {
                required: function () {
                    toastr.error('Your protein ration is required');
                },
            },
            "totalcarbs": {
                required: function () {
                    toastr.error('Your total carbs is required');
                },
            },
            "weightGoal": {
                required: function () {
                    toastr.error('Select your weight goal');
                },
            },
        },
        submitHandler: function (form, e) {

            // get the submit button
            var submit_button = $('.btn-submit', form);
            // disable login button
            submit_button.button('loading');

            // Form Variables
            var ketoGender = $('input[name=gender]:checked').val();
            var ketoAge = $(".ketoAge").val();
            var ketoHeightft = $(".ketoHeightft").val();
            var ketoHeightin = $(".ketoHeightin").val();
            var ketoHeightcm = (ketoHeightft * 30.48) + (ketoHeightin * 2.54);
            var ketoWeight = $(".ketoWeight").val();
            var ketoWeightkg = (ketoWeight / 2.2046);
            var ketoBodyFatPercentage = $(".ketoBodyFatPercentage").val();
            var ketoBodyFatP = (ketoBodyFatPercentage / 100);
            var ketoActivity = $(".ketoActivity").val();
            var ketoProteinGrams = $(".ketoProteinGrams").val();
            var ketoCarbs = $(".ketoCarbs").val();
            var ketoWeightChoice = $('input[name=weightGoal]:checked').val();

            // Carb Formulas 
            var ketoCarbCalories = 4 * ketoCarbs; // calories from carbs

            // Protein Formulas 
            var ketoBodyFatLB = ketoWeight * ketoBodyFatP; // pounds of lean body mass
            var ketoLean = ketoWeight - ketoBodyFatLB; // pounds of lean body mass
            var ketoProGramCalc = ketoLean * ketoProteinGrams; // grams of protein converted
            var ketoProCalc = 4 * ketoProGramCalc; // grams of protein calories

            // weight is in kg, height is in cm
            if (ketoGender == 'male') {
                var bmr = 66 + (13.7 * ketoWeightkg) + (5 * ketoHeightcm) - (6.8 * ketoAge);
            } else {
                var bmr = 655 + (9.6 * ketoWeightkg) + (1.8 * ketoHeightcm) - (4.7 * ketoAge);
            }

            var TDEE = bmr * ketoActivity;

            if (document.getElementById("weightGoalLose").checked == true) {
                var weightGoalAdjust = TDEE - (TDEE * '.12'); // add why it's adjusted to here
            }
            if (document.getElementById("weightGoalMaintain").checked == true) {
                var weightGoalAdjust = TDEE;
            }
            if (document.getElementById("weightGoalGain").checked == true) {
                var weightGoalAdjust = TDEE + (TDEE * '.12');
            }

            var calweek = weightGoalAdjust * 7;

            // Fat Formulas
            var ketoFatCalories = weightGoalAdjust - (ketoProCalc + ketoCarbCalories);
            var ketoFatGrams = ketoFatCalories / 9;

            var ketoCarbPercentage = (ketoCarbCalories / weightGoalAdjust) * 100;
            var ketoProteinPercentage = (ketoProCalc / weightGoalAdjust * 100);
            var ketoFatPercentage = (ketoFatCalories / weightGoalAdjust * 100);

            var weightGoalAdjust = weightGoalAdjust.toFixed(0);
            var bmr = bmr.toFixed(0);
            var TDEE = TDEE.toFixed(0);
            var ketoProGramCalc = ketoProGramCalc.toFixed(0);
            var ketoProCalc = ketoProCalc.toFixed(0);
            var ketoCarbPercentage = ketoCarbPercentage.toFixed(0);
            var ketoProteinPercentage = ketoProteinPercentage.toFixed(0);
            var ketoFatPercentage = ketoFatPercentage.toFixed(0);
            var ketoFatCalories = ketoFatCalories.toFixed(0);
            var ketoFatGrams = ketoFatGrams.toFixed(0);
            var calweek = calweek.toFixed(0);

            // Display Calculations
            $('#ketoResults').append(
                ` <div class="keto-container-wrapper">
                <div id="ketoTableResults" class="container-fluid">
              <h3 class="tableHeadline">Your Keto Diet Breakdown</h3>
              <table class="ketoTable">
                <tr class="ketoTR">
                  <th class="ketoTH">Type</th>
                  <th class="ketoTH">Amoutn in Grams</th>
                  <th class="ketoTH">kcal Value</th>
                  <th class="ketoTH">Diet Break Down</th>
                </tr>
                <tr class="ketoTR">
                  <td class="ketoTD"><strong>Carbs</strong></td>
                  <td class="ketoTD">${ketoCarbs} grams</td>
                  <td class="ketoTD">${ketoCarbCalories} </td>
                  <td class="ketoTD">${ketoCarbPercentage}%</td>
                </tr>
                <tr class="ketoTR">
                  <td class="ketoTD"><strong>Protein</strong></td>
                  <td class="ketoTD">${ketoProGramCalc} grams</td>
                  <td class="ketoTD">${ketoProCalc} kcal</td>
                  <td class="ketoTD">${ketoProteinPercentage}%</td>
                </tr>
                <tr class="ketoTR">
                  <td class="ketoTD"><strong>Fat</strong></td>
                  <td class="ketoTD">${ketoFatGrams} grams</td>
                  <td class="ketoTD">${ketoFatCalories} kcal</td>
                  <td class="ketoTD">${ketoFatPercentage}%</td>
                </tr>
                <tr class="ketoTR">
                  <td class="ketoTD"><strong>Calories</strong></td>
                  <td class="ketoTD">${weightGoalAdjust} grams</td>
                  <td class="ketoTD">${bmr} kcal</td>
                  <td class="ketoTD">${calweek} cals/week</td>
                </tr>
              </table>
                <button type="button" class="btn btn-keto keto-darkgreen-bg btn-center" onclick="ketoCalcReload();">Run New Test</button>
            <div class="keto-disclaimer">
                    <p>
                        The results of this calculator should only be taken as a suggestion, and is not a
                        substitute for
                        guided diet and
                        nutrition
                        planning from a physician. Consult your doctor or nutritionist for precise measurements
                        designed
                        for your needs.
                    </p>
                </div></div></div>`,
            );
        }
    });
});

function ketoCalcReload() {
    location.reload(true);
}