class Util {

  // // Generate a random integer
  // public static getRandomInt(min: number, max: number): number {
  //   return Math.round(Math.random() * (max - min) + min);
  // }

  // Generate an array of random integers (used to select random idioms)
  public static getNRandomInts(from: number, to: number, n: number): number[] {
    let numbers: number[] = [];
    let shuffledNumbers: number[] = [];
    let selection: number[] = [];
    for (let i = from; i <= to; i++) {
      numbers.push(i);
    }
    shuffledNumbers = this.shuffle(numbers);
    for (let i = 0; i < n; i++) {
      selection.push(shuffledNumbers[i]);
    }
    return selection;
  }

  // Shuffle an array
  public static shuffle(array: any[]): any[] {
    let currentIndex: number = array.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      let temporaryValue: any;
      let randomIndex: number;
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}