class IdiomsSupplier {
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

    public constructor(params: IdiomsSupplierConfig = {} as IdiomsSupplierConfig) {
        let {
            units = [],
            selectionSize = null,
            spreadsheetHandler = new SpreadsheetHandler,
            cachehelper = null
        } = params;
        if (cachehelper)
            this.Load(cachehelper);
        else if (units && selectionSize && spreadsheetHandler)
            this.setMembers(units, selectionSize, spreadsheetHandler);
        else throw "Constructor params missing!";
    }

    private setMembers(units: string[], selectionSize: number, spreadsheetHandler: SpreadsheetHandler) {
        this.idioms = this.findIdioms(units, spreadsheetHandler);
        this.checkSize(selectionSize);
        this.selectedIndices = this.getRandomIndices(selectionSize);
    }

    private Load(cachehelper: CacheHelper) {
        let str = cachehelper.Load('idiomsManager')
        let supplierDto: IdiomsSupplierDto = JSON.parse(str);
        this.idioms = [];
        this.selectedIndices = supplierDto.selectedIndices;
        for (let i = 0; i < supplierDto.idioms.length; i++) {
            // TODO: dependency injection!
            this.idioms[i] = (new Mapper).DtoToIdiom(supplierDto.idioms[i]);
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

    private findIdioms(units: string[], SSHandler: SpreadsheetHandler): Idiom[] {
        // TODO: dependency injection!
        let repo: IdiomsRepository = new IdiomsRepository(SSHandler);
        return repo.GetIdiomsFilteredByUnits(units);
    };

    private checkSize(selectionSize: any) {
        // Check if sum of requested exercise questions isn't higher than max idioms
        let maxIdioms = this.idioms.length;

        if (isNaN(selectionSize) || selectionSize < 1 || selectionSize > maxIdioms) {
            Browser.msgBox('Error', Utilities.formatString('Total number of '
                + 'questions ("%s") is not valid. There are not that many idioms '
                + 'available in your selection (units). Check if your total question count '
                + 'is a number between 1 and %d', selectionSize, maxIdioms), Browser.Buttons.OK);
            throw 'foutje';
        };
        return true;
    }

    private getRandomIndices(selectionSize: number): number[] {
        let idiomIndices: number[] = Randomizer.GetNRandomInts(0, this.idioms.length - 1, selectionSize);
        return idiomIndices;
    };
}