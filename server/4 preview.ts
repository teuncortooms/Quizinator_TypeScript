// // Compiled using ts2gas 3.6.1 (TypeScript 3.8.3)
// /**
//  * preview quiz
//  */
// function addUnderlineHTML(sentence, word) {
//     let sentenceWithLayout;
//     let wordIndex;
//     wordIndex = sentence.toLowerCase().indexOf(word.toLowerCase());
//     sentenceWithLayout = [
//         sentence.slice(0, wordIndex),
//         "<u>",
//         sentence.slice(wordIndex, wordIndex + word.length),
//         "</u>",
//         sentence.slice(wordIndex + word.length)
//     ].join('');
//     return sentenceWithLayout;
// }
// function openPreviewStep2(exercises) {
//     let template = HtmlService.createTemplateFromFile('client/preview');
//     let html;
//     let exercisesWithLayout = exercises;
//     let i, k;
//     // put underline html for exercise type 1 in exercises array
//     for (i = 0; i < exercises.length - 1; i++) {
//         if (exercises[i][0] == 1) {
//             for (k = 0; k < exercises[i][2].length; k++) {
//                 exercisesWithLayout[i][2][k] = addUnderlineHTML(exercises[i][2][k], exercises[i][3][k]);
//             }
//         }
//     }
//     // send exercises with layout to template
//     template.exercises = exercisesWithLayout;
//     html = template.evaluate()
//         .setWidth(800)
//         .setHeight(2000);
//     SpreadsheetApp.getUi().showModalDialog(html, 'Preview');
//     return "success";
// }
// /**
// * replace item in preview
// * (newItemId is optional)
// */
// function replaceItem(itemNo, type, newItemId) {
//     let userProperties = PropertiesService.getUserProperties();
//     let exercises = JSON.parse(userProperties.getProperty("exercises"));
//     let idioms = [];
//     let itemIds = [];
//     let randomItemIdArr;
//     let selectedIdiom;
//     let newExerciseItem;
//     let i, j;
//     let regEx, translation, translationsTemp = [], shuffledTranslations = [];
//     let unique = false;
//     Logger.log("type " + type);
//     // populate idioms array from cache // CHANGE N < 5 IF getAllIdiomsFromSelectedUnits CHANGES
//     for (let n = 1; n < 5; n++) {
//         let temp = JSON.parse(userProperties.getProperty("idioms" + n));
//         if (temp == null) {
//             break;
//         }
//         idioms = idioms.concat(temp);
//     }
//     ;
//     // find idiom ids used as quiz items SEE LOADITEMOPTIONS
//     for (i = 0; i < exercises.length - 1; i++) {
//         for (j = 0; j < exercises[i][6].length; j++) {
//             itemIds.push(exercises[i][6][j]);
//         }
//     }
//     Logger.log(idioms);
//     Logger.log(newItemId);
//     // select new item id if it is undefined (or 999 for testing purposes)
//     if (newItemId === undefined || newItemId == 999) {
//         i = 0;
//         while (unique == false) {
//             i++;
//             if (i == 10) {
//                 Browser.msgBox('Error', 'Couldn\'t find unique idiom after 10 attempts.', Browser.Buttons.OK);
//                 throw 'foutje';
//             }
//             randomItemIdArr = Util.getNRandomInts(0, idioms.length, 1);
//             newItemId = randomItemIdArr[0][0];
//             for (j = 0; j < itemIds.length; j++) {
//                 if (newItemId == itemIds[j]) {
//                     unique = false;
//                     break;
//                 }
//                 else {
//                     unique = true;
//                 }
//                 console.log(unique);
//             }
//         }
//     }
//     Logger.log(newItemId);
//     // select new idiom
//     selectedIdiom = idioms[newItemId];
//     Logger.log("selectedIdiom: " + selectedIdiom);
//     // put exercise details in new array to send to the preview window  
//     newExerciseItem = [];
//     newExerciseItem.push(selectedIdiom.sentence);
//     newExerciseItem.push(stripWord(selectedIdiom.word));
//     newExerciseItem.push(selectedIdiom.translation);
//     newExerciseItem.push(itemNo);
//     newExerciseItem.push(selectedIdiom.id);
//     // replace exercise details in exercises array to update cache
//     for (i = 0; i < exercises.length - 1; i++) {
//         if (exercises[i][0] == type) { // filter by type
//             for (j = 0; j < exercises[i][5].length; j++) {
//                 if (exercises[i][5][j] == itemNo) { // filter by itemNo
//                     exercises[i][2][j] = selectedIdiom.sentence;
//                     exercises[i][3][j] = stripWord(selectedIdiom.word);
//                     exercises[i][4][j] = selectedIdiom.translation;
//                     exercises[i][5][j] = itemNo;
//                     exercises[i][6][j] = selectedIdiom.id;
//                 }
//             }
//         }
//     }
//     switch (type) {
//         case 1:
//             // add underline to sentence
//             newExerciseItem[0] = addUnderlineHTML(newExerciseItem[0], newExerciseItem[1]);
//             break;
//         case 2:
//             // remove word from sentence
//             regEx = new RegExp(stripWord(selectedIdiom.word), "ig");
//             newExerciseItem[0] = selectedIdiom.sentence.replace(regEx, "________");
//             // remove word from sentence in cache...
//             for (i = 0; i < exercises.length - 1; i++) {
//                 if (exercises[i][0] == type) { // filter by type
//                     for (j = 0; j < exercises[i][5].length; j++) {
//                         if (exercises[i][5][j] == itemNo) { // filter by itemNo
//                             exercises[i][2][j] = selectedIdiom.sentence.replace(regEx, "________");
//                         }
//                         // ...create new shuffled words string...
//                         translation = exercises[i][4][j];
//                         translationsTemp.push(translation);
//                     }
//                     // ...and replace it in cache
//                     shuffledTranslations = [[Util.shuffle(translationsTemp).join('  *  ')]]; // shuffle translations, turn into string, and put string in double array (needed for quizdoc)
//                     exercises[i][7] = shuffledTranslations;
//                 }
//             }
//             break;
//         case 3:
//             // remove word from sentence and replace with translation
//             regEx = new RegExp(stripWord(selectedIdiom.word), "ig");
//             translation = selectedIdiom.translation;
//             newExerciseItem[0] = selectedIdiom.sentence.replace(regEx, "________") + ' (' + translation + ')';
//             // remove word from sentence in cache and replace with translation
//             for (i = 0; i < exercises.length - 1; i++) {
//                 if (exercises[i][0] == type) { // filter by type
//                     for (j = 0; j < exercises[i][5].length; j++) {
//                         if (exercises[i][5][j] == itemNo) { // filter by itemNo
//                             exercises[i][2][j] = selectedIdiom.sentence.replace(regEx, "________") + ' (' + translation + ')';
//                         }
//                     }
//                 }
//             }
//             break;
//         default:
//             Browser.msgBox('Error', 'Check exercise type.', Browser.Buttons.OK);
//             throw 'foutje';
//     }
//     Logger.log(exercises);
//     // cache the exercises again to be used to generate the quiz
//     let exercisesStringified = JSON.stringify(exercises);
//     userProperties.setProperty('exercises', exercisesStringified);
//     return newExerciseItem;
// }
// /**
//  * returns a list of words from idioms that are not yet used in the exercises
//  */
// function loadItemOptions() {
//     let userProperties = PropertiesService.getUserProperties();
//     let exercises = JSON.parse(userProperties.getProperty("exercises"));
//     let n, temp, idioms = [];
//     let itemIds = [];
//     let opt;
//     let optionsText = [];
//     let optionsValues = [];
//     let options = [];
//     let i, j, available;
//     // populate idioms array from cache // CHANGE N < 5 IF getAllIdiomsFromSelectedUnits CHANGES
//     for (n = 1; n < 5; n++) {
//         temp = JSON.parse(userProperties.getProperty("idioms" + n));
//         if (temp == null) {
//             break;
//         }
//         idioms = idioms.concat(temp);
//         Logger.log(idioms);
//     }
//     ;
//     // find idiom ids used as quiz items SEE REPLACEITEM
//     for (i = 0; i < exercises.length - 1; i++) {
//         for (j = 0; j < exercises[i][6].length; j++) {
//             itemIds.push(exercises[i][6][j]);
//         }
//     }
//     // populate options with available idiom words (excluding used ids from options)
//     for (i = 0; i < idioms.length; i++) {
//         available = true;
//         for (j = 0; j < itemIds.length; j++) {
//             if (idioms[i].id == itemIds[j]) {
//                 available = false;
//             }
//         }
//         if (available) {
//             optionsText.push(idioms[i].id + ". " + stripWord(idioms[i].word));
//             optionsValues.push(idioms[i].id);
//         }
//     }
//     options.push(optionsText);
//     options.push(optionsValues);
//     return options;
// }
// function shuffleTranslations() {
//     let userProperties = PropertiesService.getUserProperties();
//     let exercises = JSON.parse(userProperties.getProperty("exercises"));
//     let shuffledTranslations;
//     for (let i = 0; i < exercises.length; i++) {
//         if (exercises[i][0] == 2) {
//             shuffledTranslations = exercises[i][7][0];
//         }
//     }
//     return shuffledTranslations;
// }
