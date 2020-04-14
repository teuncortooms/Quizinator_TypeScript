class UserInput {
    private units: string[];
    private title: string;
    private typePerExercise: string[];
    private sizePerExercise: number[];

    public constructor(formObject: any) {
        this.setUnits(formObject.inputUnits);
        this.setTitle(formObject.inputName);
        this.setTypePerExercise(formObject.inputExTypeArr);
        this.setSizePerExercise(formObject.inputItemsPerExArr);
    }

    get Units() { return this.units }; // cannot make private setters in typescript, see methods below
    get Title() { return this.title };
    get TypePerExercise() { return this.typePerExercise };
    get SizePerExercise() { return this.sizePerExercise };

    
    public getTotalSize() {
        let totalSize = 0;
        for (let i = 0; i < this.sizePerExercise.length; i++) {
            totalSize += this.sizePerExercise[i];
        };
        return totalSize;
    }
    
    private setUnits(units: any) {   
        // make sure 'units' is an array before saving
        if (typeof units === 'string' || typeof units === 'number') {
            this.units = [units.toString()];
        }
        else {
            this.units = units;
        }
    }

    private setTitle(title: any) {
        this.title = title;
    }

    private setTypePerExercise(types: any) {
        this.typePerExercise = [];
        for (let i = 0; i < types.length; i++) {
            this.typePerExercise[i] = types[i];
        }
    }

    private setSizePerExercise(sizes: any) {
        this.sizePerExercise = [];
        for (let i = 0; i < sizes.length; i++) {
            this.sizePerExercise[i] = Number(sizes[i]);
        };
    }
}