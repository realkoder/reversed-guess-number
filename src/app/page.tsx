"use client"

import Link from "next/link";
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

  const handleGuessNumber = () => {
    if (guessedNumbersWithResults.findIndex(guessedNumberWithResult => guessedNumberWithResult.result === Result.CORRECT) !== -1
      || (guessedNumbersWithResults.length > 0 && guessedNumbersWithResults[guessedNumbersWithResults.length - 1].result === Result.WAITING)) return;

    let isRandomNumberCorrectlyGenerated = false;

    while (!isRandomNumberCorrectlyGenerated) {
      const randomNumber = Math.floor(Math.random() * 101);

      if (guessedNumbersWithResults.length === 101) {
        alert("YO I MADE A GUESS FOR ALL NUMBERS BETWEEN 0 - 100");

        setGuessedNumbersWithResults([]);
        console.log(guessedNumbersWithResults);
        isRandomNumberCorrectlyGenerated = true; // Ending this while
      }

      const isDuplicate = guessedNumbersWithResults.some(
        (item) => item.guessedNumber === randomNumber
      );

      if (!isDuplicate) {
        setGuessedNumbersWithResults((cur) => [
          ...cur,
          { guessedNumber: randomNumber, result: Result.WAITING },
        ]);
        isRandomNumberCorrectlyGenerated = true; // A new number has been guessed lets end this while
      }
    }

  }

  return (
    <main className="flex flex-col text-center p-24">

      <Link href="/withLogic" className="my-4 text-blue-500 hover:underline">
        Go to Reversed guess Number Binary Search!
      </Link>

      <div>
        <h1>Lets Guess Some numbers!</h1>
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
                  setGuessedNumbersWithResults(cur => {
                    const updatedArray = [...cur];
                    updatedArray[index].result = Result.TOO_HIGH;
                    return updatedArray;
                  })
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