class Spreadsheet {
    private spreadsheetId: any;
    private sheet: any;

    public constructor() {
        this.spreadsheetId = SpreadsheetApp.getActive();
        this.sheet = this.spreadsheetId.getActiveSheet();
    }

    get Data(): string[][] { return this.sheet.getDataRange().getValues(); };

    get Units(): string[] {
        let data = this.Data;

        // Find all unique units in sheet (for user selection in sidebar)
        let unitCol = 3;
        let units = [];
        let uniqueunits;
        let excludes = ["", "unit", "units", "Unit", "Units"];

        // get every unit of every row
        for (let i = 0; i < data.length; i++) {
            let unit = data[i][unitCol];
            units.push(unit);
        };

        // filter unique units
        uniqueunits = units.filter(function (value, index, arr) {
            return arr.indexOf(value) === index;
        });

        // filter out non-units
        for (let j = 0; j < excludes.length; j++) {
            let index = uniqueunits.indexOf(excludes[j]);
            if (index > -1) {
                uniqueunits.splice(index, 1);
            }
        }

        return uniqueunits;
    }

    public addExampleSheet() {
        let exampleSheet = this.spreadsheetId.getSheetByName("Example sheet");
        if (exampleSheet != null) {
            this.sheet = exampleSheet;
        }
        else {
            this.sheet = this.spreadsheetId.insertSheet('Example sheet');
        }
        this.spreadsheetId.setActiveSheet(this.sheet);
        let values = [
            ["Word", "Translation", "Example sentence", "Unit"],
            ["nice adj", "mooi, lekker", "If the weather isn’t going to be nice, let’s stay in.", "Unit 1"],
            ["spell v", "spellen, schrijven", "Do you spell ‘grey’ with an ‘a’ or an ‘e’?", "Unit 1"],
            ["student n", "student", "Say hello to the other students in the class.", "Unit 1"],
            ["surname n", "achternaam", "What is your surname?", "Unit 1"],
            ["what pron", "wat", "What is your name?", "Unit 1"],
            ["where adv", "waar", "Where are you from?", "Unit 1"],
            ["Excuse me", "beleefdsheidsuitdrukking", "Excuse me, sir, could you help me find my brain?", "Unit 3"],
            ["flowers", "bloemen", "Let me tell you about the birds and the bees, and the flowers and the trees.", "Unit 3"],
            ["evening", "avond", "I pack my bag in the evening, so I don’t need to in the morning.", "Unit 3"],
            ["happy", "blij", "If you’re happy and you know it clap your hands.", "Unit 3"],
            ["Wednesday", "woensdag", "I met my new best friend in the city centre last Wednesday.", "Unit 3"],
            ["always", "altijd", "I should get up earlier, because I am always late.", "Unit 3"],
            ["little", "kleine", "You can't go to bed without a cup of tea. I'm in love with you and all these little things. (One Direction!)", "Unit 3"],
            ["swimming", "zwemmen", "I love to go swimming, because I’m too sexy for sports that need clothes.", "Unit 3"],
            ["cycling", "fietsen", "My dad says he wants to go cycling with me, but I don’t want to go outside.", "Unit 3"],
            ["bath", "bad", "If you put a frog in a pot and slowly turn up the heat, it will enjoy the nice warm bath until it is cooked to death.", "Unit 3"],
            ["finish", "klaar zijn met", "You should do your homework as soon as you can, so you don’t finish it too late.", "Unit 3"],
            ["listen", "luisteren", "Talk to the hand! I won’t listen.", "Unit 3"],
            ["chicken", "kip", "A chicken slurps grass like spaghetti. Yes, you read that right!", "Unit 3"],
            ["foreign", "vreemd/buitendlands", "It's fun to learn about foreign cultures.", "Unit 3"],
            ["takeaway", "afhaalmaaltijd", "If I can’t be bothered cooking, I send out for a takeaway.", "Unit 3"],
            ["Thursday", "donderdag", "On Thursday, it is my job to do the dishes.", "Unit 3"],
            ["exercise", "oefening", "The teacher has given us an exercise to do for homework.", "Unit 3"],
            ["cinema", "bioscoop", "I really want to see that movie. Did you buy tickets for the cinema tonight?", "Unit 3"],
            ["cook", "koken", "My father usually prepares dinner, but sometimes my mother and I cook.", "Unit 3"],
            ["often", "vaak", "I fight with my brother very often - almost every day, in fact.", "Unit 3"],
            ["music", "muziek", "I hate loud music, but I love soft rock.", "Unit 3"],
            ["holiday", "vakantie", "The beaches are busy in August because everyone is on holiday then.", "Unit 3"],
            ["enjoy", "genieten", "It’s nice to do tests. I really enjoy the silence.", "Unit 3"]
        ];
        this.sheet.getRange("A1:D30").setValues(values);
        if (this.sheet.getFilter() == null) {
            this.sheet.getRange("1:30").createFilter();
        }
        this.sheet.getRange("A2")
            .setNote("lexical info like (v), (n), (adj) does not need to be removed for the addon to function");
        this.sheet.setFrozenRows(1);
        this.sheet.autoResizeColumn(1);
        this.sheet.autoResizeColumn(2);
        this.sheet.setColumnWidth(3, 400);
        this.sheet.autoResizeColumn(4);
    }
}