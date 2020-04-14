/**
 * generate quiz form (beta) [SET ANSWER FOR TEXTITEM VIA SCRIPT NOT YET AVAILABLE]
 */
function generateQuizForm() {
  let userProperties = PropertiesService.getUserProperties();
  let exercises = JSON.parse(userProperties.getProperty("exercises"));
//  let exercises = [[1, "Translate the underlined words into Dutch.", ["1. They were impressed with the body-builder at the gym.", "2. Getting home from work was the biggest obstacle because the transport workers were on strike.", "3. Learn how to fly a kite and do stunts and tricks.", "4. Poverty is a big problem in Africa. Many people don't have enough money to buy things like food and clothing.", "5. It was an open microphone show and the audience were allowed to performrophone show and the audience were allowed to perform."], ["body-builder", "obstacle", "stunt", "poverty", "open microphone [show]"], ["bodybuilder", "obstakel", "stunt", "armoede", "open podium"]], [2, "Complete the sentences with words from the box.", ["6. The new programme to help the homeless was aimed at dealing with social ________.", "7. Don't worry about Julie too much. It is just a ________ she is going through.", "8. He was always having fun; in fact he was a bit of a ________.", "9. Let's go down to the river and ________ on the water.", "10. The shop assistant only let her take one ________ into the changing room.", "11. I learned to ________ in a small boat last summer.", "12. He tried to ________ her from going, but she really wanted to.", "13. The country was a ________ where everyone could vote in the elections."], ["injustice", "phase", "clown", "mess about", "garment", "row", "prevent", "democracy"], [["onrecht  *  democratie  *  fase  *  voorkómen  *  rondhangen  *  clown  *  roeien  *  kledingstuk"]]], [3, "Translate the words.", ["14. Geoff decided that he was not going to vote in the ________. (verkiezing)", "15. The visitors to the art museum queued to see the new art ________. (expositie)", "16. I work for a charity called ________elief. (hongersnood)", "17. Rupert had an average-sized waist. He could always buy his suits ________. (confectie-)", "18. He had fallen over and broken a ________ in his leg. (bot)", "19. A small ________ uses a lot of energy to cool a room. (airconditioningsapparaat)", "20. The Titanic sunk on its maiden ________. (reis)", "21. Mike was ________, he hadn't eaten anything today. (hongerend)", "22. My brother was juggling three apples and he dropped them all. (jongleren)", "23. Lois was used to living in a city. When she moved to the village it was a ________. (cultuurschok)"], ["election", "installation", "famine [Relief]", "off the peg", "bone", "air-conditioner unit", "voyage", "starving", "juggle", "culture shock"], ["verkiezing", "expositie", "hongersnood", "confectie-", "bot", "airconditioningsapparaat", "reis", "hongerend", "jongleren", " cultuurschok"]], " SO Unit 88 versie 20171124 09:01:56"];
  // let quizForm; 
  let formName = exercises[exercises.length - 1]; 
  let successMessage
  
  // create Form
  let quizForm = FormApp.create(formName);
  quizForm.setTitle(formName).setDescription("Good luck!").setIsQuiz(true).setRequireLogin(true).setCollectEmail(true);
  
  // insert Exercises
  let i
  let k
//  let exercisesTable = [];
  let table
  let regExp
  let foundWord
  let wordText
  let startWord
  let endWord
  let u
  let uc
  
  for (i = 0; i < exercises.length - 1; i++){    // for each exercise in array (-1 to ignore quiz title at end of array)
     let header = quizForm.addSectionHeaderItem();    //append heading into doc
     header.setTitle(exercises[i][1]);
    
    if (exercises[i][0] == 2) { 
     quizForm.addSectionHeaderItem().setTitle(exercises[i][4]); // insert Dutch words array into section header (if type 2)
    } 
    
    for (k = 0; k < exercises[i][2].length; k++) {
      let item = quizForm.addTextItem();
      item.setPoints(1).setRequired(true).setTitle(exercises[i][2][k]);
      if (exercises[i][0] == 1) { 
        item.setHelpText("(" + exercises[i][3][k] + ")");
      }
    }     
  }


  // success message
  successMessage = HtmlService.createHtmlOutput(''
    + 'Quiz Form successfully created. Click the link.<br><br>'
    + 'Your quiz: <a target=_new href="'+quizForm.getPublishedUrl()+'">'+formName+'</a>');
  SpreadsheetApp.getUi().showModalDialog(successMessage, 'Success');
  
  return "success";
}



