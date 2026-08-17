/**
 * Ketogenic Diet Macro & Calorie Calculator
 * -------------------------------------------------------------
 * Validates user physical characteristics and goals, computes daily caloric expenditure (BMR & TDEE)
 * using the Harris-Benedict formula, adjusts for deficit/surplus goals, and calculates optimal
 * macronutrient distributions (Carbohydrates, Protein, and Fat in grams, kcal, and percentage ratios).
 */

$(document).ready(function () {
    'use strict';

    const $frm = $('#keto-container');

    // Prevent direct form POST and handle asynchronously
    $frm.on('submit', function (ev) {
        ev.preventDefault();
        $.ajax({
            type: $frm.attr('method') || 'POST',
            url: $frm.attr('action') || '#',
            data: $frm.serialize()
        });
    });

    /**
     * jQuery Validation Configuration
     * Requires all biometric and preference inputs before calculating.
     */
    $frm.validate({
        rules: {
            gender: { required: true },
            age: { required: true },
            heightft: { required: true },
            heightin: { required: true },
            weight: { required: true },
            bfp: { required: true },
            activity: { required: true },
            proteinratio: { required: true },
            totalcarbs: { required: true },
            weightGoal: { required: true }
        },
        messages: {
            gender: { required: () => toastr.error('You forgot to select your gender') },
            age: { required: () => toastr.error('Hey, what about your age?') },
            heightft: { required: () => toastr.error('Please enter your height in feet') },
            heightin: { required: () => toastr.error('Please enter your height in inches') },
            weight: { required: () => toastr.error('The calculator requires that you input your weight') },
            bfp: { required: () => toastr.error('Please estimate your Body Fat Percentage') },
            activity: { required: () => toastr.error('Enter your activity amount') },
            proteinratio: { required: () => toastr.error('Your protein ratio is required') },
            totalcarbs: { required: () => toastr.error('Your total carbs is required') },
            weightGoal: { required: () => toastr.error('Select your weight goal') }
        },
        submitHandler: function (form) {
            // Disable button during calculation
            const $submitButton = $('.btn-submit', form);
            if (typeof $submitButton.button === 'function') {
                $submitButton.button('loading');
            }

            // 1. Parse user inputs
            const ketoGender = $('input[name=gender]:checked').val();
            const ketoAge = parseFloat($('.ketoAge').val()) || 0;
            const ketoHeightft = parseFloat($('.ketoHeightft').val()) || 0;
            const ketoHeightin = parseFloat($('.ketoHeightin').val()) || 0;
            const ketoWeight = parseFloat($('.ketoWeight').val()) || 0;
            const ketoBodyFatPercentage = parseFloat($('.ketoBodyFatPercentage').val()) || 0;
            const ketoActivity = parseFloat($('.ketoActivity').val()) || 1.2;
            const ketoProteinGrams = parseFloat($('.ketoProteinGrams').val()) || 0.8;
            const ketoCarbs = parseFloat($('.ketoCarbs').val()) || 25;

            // 2. Unit Conversions (Imperial to Metric)
            const ketoHeightcm = (ketoHeightft * 30.48) + (ketoHeightin * 2.54);
            const ketoWeightkg = ketoWeight / 2.2046;
            const ketoBodyFatP = ketoBodyFatPercentage / 100;

            // 3. Carbohydrate Calories (4 kcal per gram of carbs)
            const ketoCarbCalories = 4 * ketoCarbs;

            // 4. Lean Body Mass & Protein Calculation (4 kcal per gram of protein)
            const ketoBodyFatLB = ketoWeight * ketoBodyFatP;
            const ketoLean = Math.max(0, ketoWeight - ketoBodyFatLB);
            const ketoProGramCalc = ketoLean * ketoProteinGrams;
            const ketoProCalc = 4 * ketoProGramCalc;

            // 5. Basal Metabolic Rate (BMR) - Revised Harris-Benedict Equation
            let bmr = 0;
            if (ketoGender === 'male') {
                bmr = 66 + (13.7 * ketoWeightkg) + (5 * ketoHeightcm) - (6.8 * ketoAge);
            } else {
                bmr = 655 + (9.6 * ketoWeightkg) + (1.8 * ketoHeightcm) - (4.7 * ketoAge);
            }

            // 6. Total Daily Energy Expenditure (TDEE)
            const TDEE = bmr * ketoActivity;

            // 7. Adjust for Weight Goal (12% deficit for loss, 12% surplus for gain)
            let dailyCalorieTarget = TDEE;
            if ($('#weightGoalLose').is(':checked')) {
                dailyCalorieTarget = TDEE * 0.88; // 12% deficit
            } else if ($('#weightGoalGain').is(':checked')) {
                dailyCalorieTarget = TDEE * 1.12; // 12% surplus
            }

            const calweek = dailyCalorieTarget * 7;

            // 8. Fat Formulas (9 kcal per gram of dietary fat, fills remaining calorie budget)
            const ketoFatCalories = Math.max(0, dailyCalorieTarget - (ketoProCalc + ketoCarbCalories));
            const ketoFatGrams = ketoFatCalories / 9;

            // 9. Macro Percentages of Total Daily Calories
            const safeTotalCals = dailyCalorieTarget > 0 ? dailyCalorieTarget : 1;
            const ketoCarbPercentage = (ketoCarbCalories / safeTotalCals) * 100;
            const ketoProteinPercentage = (ketoProCalc / safeTotalCals) * 100;
            const ketoFatPercentage = (ketoFatCalories / safeTotalCals) * 100;

            // 10. Format results for UI display
            const displayDailyCals = Math.round(dailyCalorieTarget);
            const displayBMR = Math.round(bmr);
            const displayWeeklyCals = Math.round(calweek);
            const displayProGrams = Math.round(ketoProGramCalc);
            const displayProKcal = Math.round(ketoProCalc);
            const displayFatGrams = Math.round(ketoFatGrams);
            const displayFatKcal = Math.round(ketoFatCalories);
            const displayCarbPct = Math.round(ketoCarbPercentage);
            const displayProPct = Math.round(ketoProteinPercentage);
            const displayFatPct = Math.round(ketoFatPercentage);

            // 11. Render Results Card & Macro Breakdown Table
            $('#ketoResults').empty().append(`
                <div class="keto-container-wrapper">
                    <div id="ketoTableResults" class="container-fluid">
                        <h3 class="tableHeadline">Your Keto Diet Breakdown</h3>
                        <table class="ketoTable">
                            <thead>
                                <tr class="ketoTR">
                                    <th class="ketoTH">Type</th>
                                    <th class="ketoTH">Amount in Grams</th>
                                    <th class="ketoTH">kcal Value</th>
                                    <th class="ketoTH">Diet Breakdown</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="ketoTR">
                                    <td class="ketoTD"><strong>Carbs</strong></td>
                                    <td class="ketoTD">${Math.round(ketoCarbs)} grams</td>
                                    <td class="ketoTD">${Math.round(ketoCarbCalories)} kcal</td>
                                    <td class="ketoTD">${displayCarbPct}%</td>
                                </tr>
                                <tr class="ketoTR">
                                    <td class="ketoTD"><strong>Protein</strong></td>
                                    <td class="ketoTD">${displayProGrams} grams</td>
                                    <td class="ketoTD">${displayProKcal} kcal</td>
                                    <td class="ketoTD">${displayProPct}%</td>
                                </tr>
                                <tr class="ketoTR">
                                    <td class="ketoTD"><strong>Fat</strong></td>
                                    <td class="ketoTD">${displayFatGrams} grams</td>
                                    <td class="ketoTD">${displayFatKcal} kcal</td>
                                    <td class="ketoTD">${displayFatPct}%</td>
                                </tr>
                                <tr class="ketoTR">
                                    <td class="ketoTD"><strong>Total Calories</strong></td>
                                    <td class="ketoTD">${displayDailyCals} kcal/day</td>
                                    <td class="ketoTD">BMR: ${displayBMR} kcal</td>
                                    <td class="ketoTD">${displayWeeklyCals} cals/week</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-keto keto-darkgreen-bg btn-center" onclick="ketoCalcReload();">Run New Test</button>
                        <div class="keto-disclaimer">
                            <p>
                                The results of this calculator should only be taken as a suggestion, and is not a substitute for guided diet and nutrition planning from a physician. Consult your doctor or nutritionist for precise measurements designed for your needs.
                            </p>
                        </div>
                    </div>
                </div>
            `);
        }
    });
});

/**
 * Reset and reload calculator view
 */
function ketoCalcReload() {
    'use strict';
    location.reload(true);
}