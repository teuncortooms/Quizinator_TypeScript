class Spreadsheet {
    private spreadsheetId: any;
    private sheet: any;
    private data: string[][];
    private units: string[];

    get Data(): string[][] { return this.data; };
    get Units(): string[] { return this.units; };


    public constructor() {
        this.spreadsheetId = SpreadsheetApp.getActive();
        this.sheet = this.spreadsheetId.getActiveSheet();
        this.data = this.sheet.getDataRange().getValues();
        this.setUnits();
    }

    private setUnits() {
        // Find all unique units in sheet (for user selection in sidebar)
        let unitCol = 3;
        let units = [];
        let uniqueunits;
        let excludes = ["", "unit", "units", "Unit", "Units"];

        // get every unit of every row
        for (let i = 0; i < this.data.length; i++) {
            let unit = this.data[i][unitCol];
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

        this.units = uniqueunits;
    }
}