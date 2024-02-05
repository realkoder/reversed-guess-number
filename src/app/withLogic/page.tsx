"use client"

import { useState } from "react";

enum Result {
  WAITING,
  TOO_LOW,
  TOO_HIGH,
  CORRECT,
}

type GuessedNumberWithResult = {
  guessedNumber: number;
  result: Result;
}

export default function Home() {
  const [guessedNumbersWithResults, setGuessedNumbersWithResults] = useState<GuessedNumberWithResult[]>([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(100);
  const maxGuessAmount = Math.ceil(Math.log2(end));

  const handleGuessNumber = () => {
    if (guessedNumbersWithResults.findIndex(guessedNumberWithResult => guessedNumberWithResult.result === Result.CORRECT) !== -1
      || (guessedNumbersWithResults.length > 0 && guessedNumbersWithResults[guessedNumbersWithResults.length - 1].result === Result.WAITING)) return;

    if (guessedNumbersWithResults.length === maxGuessAmount) {
      alert("YO I MUST HAVE GUESSED THE RIGHT NUMBER BY NOW!");
      setGuessedNumbersWithResults([]);
      setStart(1);
      setEnd(100);
      return;
    }

    const calculatedMiddle = calculateMiddle(start, end);

    setGuessedNumbersWithResults((cur) => [
      ...cur,
      { guessedNumber: calculatedMiddle, result: Result.WAITING },
    ]);

  }

  return (
    <main className="flex flex-col text-center p-24">

      <div>
        <h1>Lets Guess Some numbers (with the use of binary search)!</h1>
        <button
          className="max-w-36 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
          onClick={handleGuessNumber}
        >
          Click here for my guess!
        </button>
      </div>

      {guessedNumbersWithResults.map((guessedNumberWithResult, index) => (
        <div key={index} className="p-4">

          {guessedNumberWithResult.result == Result.WAITING &&
            <div>
              <span>{index + 1}. Im guessing {guessedNumberWithResult.guessedNumber} - is that</span>
              <button
                className="max-w-36 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded inline-block"
                onClick={() => {
                  const calculatedMiddle = calculateMiddle(start, end);
                  setStart(calculatedMiddle + 1);
                  setGuessedNumbersWithResults(cur => {
                    const updatedArray = [...cur];
                    updatedArray[index].result = Result.TOO_LOW;
                    return updatedArray;
                  })
                }}
              >
                Too low!
              </button>

              <button
                className="max-w-36 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded inline-block"
                onClick={() => {
                  const calculatedMiddle = calculateMiddle(start, end);
                  setEnd(calculatedMiddle - 1);

                  setGuessedNumbersWithResults(cur => {
                    const updatedArray = [...cur];
                    updatedArray[index].result = Result.TOO_HIGH;
                    return updatedArray;
                  });
                }}
              >
                Too high!
              </button>

              <button
                className="max-w-36 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded inline-block"
                onClick={() => {
                  setGuessedNumbersWithResults(cur => {
                    const updatedArray = [...cur];
                    updatedArray[index].result = Result.CORRECT;
                    return updatedArray;
                  });
                  alert("EYYYY!!!");
                }}
              >
                Correct!
              </button>
              <span>?</span>
            </div>
          }
          {guessedNumberWithResult.result !== Result.WAITING &&
            <span>
              {index + 1}. I guessed {guessedNumberWithResult.guessedNumber} - and that was<span> </span>
              {guessedNumberWithResult.result === Result.TOO_LOW ? "too low" :
                guessedNumberWithResult.result === Result.TOO_HIGH ? "too high" : "CORRECT"}!
            </span>
          }
        </div>
      ))}

    </main >
  );
}

const calculateMiddle = (start: number, end: number) => {  
  return start + Math.floor((end - start) / 2);
}