class UserInputConverter {
    private units: string[];
    private title: string;
    private exerciseTypes: string[];
    private exerciseSizes: number[];

    public constructor(formObject: any) {
        this.setUnits(formObject.inputUnits);
        this.setTitle(formObject.inputName);
        this.setExerciseTypes(formObject.userinput_ExerciseTypes);
        this.setExerciseSizes(formObject.userinput_ExerciseSizes);
    }

    get Units() { return this.units }; 
    get Title() { return this.title };
    get ExerciseTypes() { return this.exerciseTypes };
    get ExerciseSizes() { return this.exerciseSizes };    
    get TotalSize() {
        let totalSize = 0;
        for (let i = 0; i < this.exerciseSizes.length; i++) {
            totalSize += this.exerciseSizes[i];
        };
        return totalSize;
    }
    
    // cannot make private setters in typescript
    
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

    private setExerciseTypes(types: any) {
        this.exerciseTypes = [];
        for (let i = 0; i < types.length; i++) {
            this.exerciseTypes[i] = types[i];
        }
    }

    private setExerciseSizes(sizes: any) {
        this.exerciseSizes = [];
        for (let i = 0; i < sizes.length; i++) {
            this.exerciseSizes[i] = Number(sizes[i]);
        };
    }
}