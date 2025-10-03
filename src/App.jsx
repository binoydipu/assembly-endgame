import Header from "./components/Header"
import Status from "./components/Status"
import Languages from "./components/Languages"
import { useState } from "react"
import { clsx } from "clsx"
import languages from "./languages.js"
import { getRandomWord } from "./utils.js"


const AssemblyEndgame = () => {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const wrongGuessCount =
    guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon =
    currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz"

  const addGuessedLetter = (letter) => {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    )
  })

  const keyboardElements = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })

    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
    )
  })

  const startNewGame = () => {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  return (
    <main>
      <Header />
      <Status
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        lostLanguages={wrongGuessCount}
        isLastGuessIncorrect={isLastGuessIncorrect}
      />
      <Languages lostLanguages={wrongGuessCount} />

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver &&
        <button
          onClick={startNewGame}
          className="new-game"
        >
          New Game</button>}
      
      <a
        href="https://github.com/binoydipu"
        target="_blank"
        className="binoy-barman"
      >&copy; Binoy Barman</a>
    </main>
  )
}

export default AssemblyEndgame