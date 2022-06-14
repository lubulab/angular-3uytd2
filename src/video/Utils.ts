const modalConstants = {
  CENTER: {
    instruction: 'Gira il volto al centro',
  },
  LEFT: {
    instruction: 'Gira il volto a sinistra',
  },
  RIGHT: {
    instruction: 'Gira il volto a destra',
  },
};

export class Utils {
  
  public static getInstruction(key: string): string {
    let utterance = new SpeechSynthesisUtterance(modalConstants[key].instruction);
    utterance.rate = 1.5;
    speechSynthesis.speak(utterance);
    return modalConstants[key].instruction;
  }

}
