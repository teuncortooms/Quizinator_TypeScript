// /**
//  * create a new doc, put it in a specified folder (UNFINISHED) and add a heading
//  */

// function createDoc(docName){

//   let quizDoc = DocumentApp.create(docName);
//   let quizDocBody = quizDoc.getBody();
//   let quizDocHeader = quizDoc.addHeader();

// //  let quizDocFile = DriveApp.getFileById(quizDoc.getId());  
// //  DriveApp.getFolderById('0B7rkLeoPDJXbUmUzMXI4eFY5bms').addFile(quizDocFile);
// //  DriveApp.getRootFolder().removeFile(quizDocFile);

//   quizDocHeader.insertParagraph(0, "\n\nName: _______________________").setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
//   quizDocBody.insertParagraph(0, quizDoc.getName()).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  
//   return quizDoc;
// }


// /**
//  * insert exercises into the doc based on the idioms array and form input.
//  */
// function insertExercises(exercises, quizDocBody){
//   let i
//   let k
// //  let exercisesTable = [];
//   let table
//   let row
//   let cell1
//   let listItem
//   let listId = "notsetyet"
//   let regExp
//   let word
//   let foundWord
//   let foundWordText
//   let foundWordStart
//   let foundWordEnd
//   let u
//   let uc

//   for (i = 0; i < exercises.length - 1; i++){    // for each exercise in array (-1 to ignore quiz title at end of array)
//     quizDocBody.appendParagraph(exercises[i][1]).setHeading(DocumentApp.ParagraphHeading.HEADING3)    //append heading into doc
    
//     if (exercises[i][0] == 2) { 
//       table = quizDocBody.appendTable(exercises[i][7]);    // insert Dutch words array into doc as table (if type 2)
//     } 
    
//     table = quizDocBody.appendTable();    // insert sentence array into doc as table
    
//     for (k = 0; k < exercises[i][2].length; k++) {
//       row = table.appendTableRow();
      
//       cell1 = row.appendTableCell();
//       listItem = cell1.appendListItem(exercises[i][2][k]); //.setIndentFirstLine(6).setIndentStart(20); Resets after copy-paste, which is annoying.
//       if (listId == "notsetyet") {
//         listId = listItem;
//       }
//       else {
//         listItem.setListId(listId);
//       }
//       listItem.getPreviousSibling().removeFromParent(); // removes empty paragraph from cell
      
//       row.appendTableCell();
//       table.setColumnWidth(0, 350);
//     } 
        
//     if (exercises[i][0] == 1) { 
//       for (k = 0; k < exercises[i][2].length; k++) {
//         word = exercises[i][3][k];
//         foundWord = table.findText(word); 
//         if (foundWord) {
//           foundWordText = foundWord.getElement().asText(); // identify word position and underline
//           foundWordStart = foundWord.getStartOffset();
//           foundWordEnd = foundWord.getEndOffsetInclusive();
//           foundWordText.setUnderline(foundWordStart, foundWordEnd, true);  
//         }
//       } 
//     }    
//   }
  
// //BACKUP
// //  for (i = 0; i < exercises.length - 1; i++){    // for each exercise in array (-1 to ignore quiz title at end of array)
// //    quizDocBody.appendParagraph(exercises[i][1]).setHeading(DocumentApp.ParagraphHeading.HEADING3)    //append heading into doc
// //    
// //    if (exercises[i][0] == 2) { 
// //      table = quizDocBody.appendTable(exercises[i][4]);    // insert Dutch words array into doc as table (if type 2)
// //    } 
// //    
// //    for (k = 0; k < exercises[i][2].length; k++) {
// //      exercisesTable.push([exercises[i][2][k],""]);
// //    } 
// //    
// //    table = quizDocBody.appendTable(exercisesTable);    // insert sentence array into doc as table
// //    table.setColumnWidth(0, 350);
// //    exercisesTable = [];
// //    
// //    if (exercises[i][0] == 1) { 
// //      for (k = 0; k < exercises[i][2].length; k++) {
// //        let word = exercises[i][3][k];
// //        foundWord = table.findText(word); 
// //        if (foundWord) {
// //          foundWordText = foundWord.getElement().asText(); // identify word position and underline
// //          foundWordStart = foundWord.getStartOffset();
// //          foundWordEnd = foundWord.getEndOffsetInclusive();
// //          foundWordText.setUnderline(foundWordStart, foundWordEnd, true);  
// //        }
// //      } 
// //    }    
// //  }
// }  


// /**
//  * generate quiz key doc
//  */
// function createKey(quizDoc, exercises, docName, norm) {
//   let keyDoc
//   let i
//   let k
// //  let exercisesTable = [];
//   let table
//   let row
//   let cell1
//   let listItem
//   let listId = "notsetyet"
//   let maxPoints = 0;
//   let normTable1 = [];
//   let normTable2 = [];
//   let cijfer
  
  
//   keyDoc = createDoc(docName + ' key');
//   keyDoc.getBody().appendParagraph("Link to SO").editAsText().setLinkUrl(quizDoc.getUrl()).appendText("\r");

  
//   for (i = 0; i < exercises.length - 1; i++){    // for each exercise in array (-1 to ignore quiz title at end of array)
   
//     table = keyDoc.getBody().appendTable();    // insert sentence array into doc as table
  
//     for (k = 0; k < exercises[i][2].length; k++) {
//       row = table.appendTableRow();
   
//       cell1 = row.appendTableCell();
//       listItem = cell1.appendListItem(exercises[i][2][k]); //.setIndentFirstLine(6).setIndentStart(20); Resets after copy-paste, which is annoying.
//       if (listId == "notsetyet") {
//         listId = listItem;
//       }
//       else {
//         listItem.setListId(listId);
//       }
//       listItem.getPreviousSibling().removeFromParent(); // removes empty paragraph from cell
      
//       if (exercises[i][0] == 1) {
//         row.appendTableCell(exercises[i][4][k]);
//       } else {
//         row.appendTableCell(exercises[i][3][k]);
//       }
      
//       table.setColumnWidth(0, 350);
//     } 
  
    
//     maxPoints += exercises[i][2].length; 
//   }

  
//   // Add grading info to doc
//   normTable1 = [["Max Punten: " + maxPoints + "\r" + norm + "% goed = " + Math.round(norm*maxPoints)/100 + " punten = cijfer 6"]];
//   normTable2 = [["aantal goed", "aantal fout", "cijfer"]];
  
//   for (i = 0; i < maxPoints; i++) {
//     cijfer = Math.round((10-i*4/(maxPoints-norm/100*maxPoints)) * 10) / 10
//     if (cijfer > 1) {
//       normTable2.push([maxPoints-i,i, cijfer]);
//     }
//   }
  
//   keyDoc.getBody().editAsText().appendText("\r\r");
//   keyDoc.getBody().appendTable(normTable1);
//   keyDoc.getBody().appendTable(normTable2);
  
  
//   return keyDoc;
// }
  
  
// /**
//  * generate quiz doc
//  */
// function generateQuiz(formObject) {
//   let userProperties = PropertiesService.getUserProperties();
//   let exercises = JSON.parse(userProperties.getProperty("exercises"));
//   let norm 
//   let quizDoc; 
//   let docName = exercises[exercises.length - 1]; 
//   let keyDoc;
//   let successMessage
  
//   quizDoc = createDoc(docName);
//   insertExercises(exercises, quizDoc.getBody());
  
//   norm = formObject.percentage; 
//   if (norm == 'other'){
//     norm = formObject.other_percentage;
//   }
//   keyDoc = createKey(quizDoc, exercises, docName, norm);
  
  
//   successMessage = HtmlService.createHtmlOutput(''
//     + 'Files successfully created. Click the links.<br><br>'
//     + 'Your quiz: <a target=_blank href="'+quizDoc.getUrl()+'">'+docName+'</a><br>'
//     + 'Answer key: <a target=_blank href="'+keyDoc.getUrl()+'">'+docName+' key'+'</a>');
//     //.setWidth(250) //optional
//     //.setHeight(50); //optional
//   SpreadsheetApp.getUi().showModalDialog(successMessage, 'Success');
  
//   return "success";
// }

