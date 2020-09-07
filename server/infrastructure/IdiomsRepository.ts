class IdiomsRepository {
    private context: SpreadsheetHandler;

    public constructor(idiomsContext: SpreadsheetHandler) {
        this.context = idiomsContext;
    }

    public GetUniqueUnits(): string[] {
        let data = this.context.Data;

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

    public GetIdiomsFilteredByUnits(units: string[]): Idiom[] {
        let data = this.context.Data;

        const wordIndex = 0;
        const translationIndex = 1;
        const sentenceIndex = 2;
        const unitIndex = 3;

        let idioms: Idiom[] = [];
        // for every selected unit
        for (let i = 0; i < units.length; i++) {
            // check every row in sheetdata
            for (let row in data) {
                // if unit matches
                if (data[row][unitIndex] == units[i]) {
                    // make new idiom
                    let rowData = data[row];
                    let id = Number(row);
                    let word = rowData[wordIndex];
                    let sentence = rowData[sentenceIndex];
                    let translation = rowData[translationIndex];
                    let idiom = new Idiom(id, word, sentence, translation);
                    // add to idioms
                    idioms.push(idiom);
                };
            };
        };
        return idioms;
    }
}
