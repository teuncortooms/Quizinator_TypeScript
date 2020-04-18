class IdiomsStore {
    private idioms: Idiom[];
    private selectedIndices: number[];

    get Idioms() { return this.idioms; }
    get SelectedIdioms(): Idiom[] {
        let selectedIdioms: Idiom[] = [];
        for (let i = 0; i < this.selectedIndices.length; i++) {
            let n: number = this.selectedIndices[i];
            selectedIdioms[i] = this.idioms[n];
        };
        return selectedIdioms;
    }
    get AvailableIdioms(): Idiom[] {
        let availableIdioms: Idiom[] = [];
        for (let i = 0; i < this.idioms.length; i++) {
            let isAvailable = true;
            for (let j = 0; j < this.selectedIndices.length; j++) {
                if (i == this.selectedIndices[j]) {
                    isAvailable = false;
                }
            }
            if (isAvailable) {
                availableIdioms.push(this.idioms[i]);
            }
        }
        return availableIdioms;
    }

    public Init(units: any, selectionSize: any, spreadsheet: Spreadsheet) {
        this.idioms = this.findIdioms(units, spreadsheet);
        this.checkSize(selectionSize);
        this.selectedIndices = this.getRandomIndices(selectionSize);
    }

    public Load(str: string) {
        let json = JSON.parse(str);
        this.idioms = [];
        this.selectedIndices = json.selectedIndices;
        for (let i = 0; i < json.idioms.length; i++) {
            this.idioms[i] = new Idiom();
            this.idioms[i].Load(json.idioms[i]);
        }
    }

    public ReplaceIdiom(oldId: number, newId: number) {
        let selectedIndicesIndex: number;
        let newIndex: number;

        // find newId in idioms
        for (let i = 0; i < this.idioms.length && newIndex == null; i++) {
            if (this.idioms[i].IdiomId == newId) {
                newIndex = i;
            }
        }
        // find oldId in selectedIndices
        for (let i = 0; i < this.selectedIndices.length && selectedIndicesIndex == null; i++) {
            let selectedIndex = this.selectedIndices[i];
            if (this.idioms[selectedIndex].IdiomId == oldId) {
                selectedIndicesIndex = i;
            }
        }
        // replace index in selectedIndices
        this.selectedIndices[selectedIndicesIndex] = newIndex;
    }

    public GetIdiom(id: number): Idiom {
        let requestedIdiom: Idiom;
        for (let idiom of this.idioms) {
            if (idiom.IdiomId == id) {
                requestedIdiom = idiom;
            }
        }
        return requestedIdiom;
    }

    private findIdioms(units: any, spreadsheet: Spreadsheet): Idiom[] {
        let unitCol = 3;
        let idioms: Idiom[] = [];
        // for every selected unit
        for (let i = 0; i < units.length; i++) {
            // check every row in sheetdata
            for (let row in spreadsheet.Data) {
                // if unit matches
                if (spreadsheet.Data[row][unitCol] == units[i]) {
                    // make new idiom
                    let rowData = spreadsheet.Data[row];
                    let idiom = new Idiom();
                    idiom.Init(row, rowData);
                    // add to idioms
                    idioms.push(idiom);
                };
            };
        };
        return idioms;
    };

    private checkSize(selectionSize: any) {
        // Check if sum of requested quiz items isn't higher than max idioms
        let maxIdioms = this.idioms.length;

        if (isNaN(selectionSize) || selectionSize < 1 || selectionSize > maxIdioms) {
            Browser.msgBox('Error', Utilities.formatString('Total number of quiz '
                + 'items ("%s") is not valid. There are not that many idiom items '
                + 'available in your selection (units). Check if your total item count '
                + 'is a number between 1 and %d', selectionSize, maxIdioms), Browser.Buttons.OK);
            throw 'foutje';
        };
        return true;
    }

    private getRandomIndices(selectionSize: number): number[] {
        let idiomIndices: number[] = Util.getNRandomInts(0, this.idioms.length - 1, selectionSize);
        return idiomIndices;
    };
}