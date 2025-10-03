import { clsx } from "clsx"
import languages from "../languages.js"
import { getFarewellText } from "../utils.js"
import Confetti from "react-confetti"
import { useWindowSize } from 'react-use'

const Status = (props) => {
  const { width, height } = useWindowSize()
  const gameStatusClass = clsx("game-status", {
    won: props.isGameWon,
    lost: props.isGameLost,
    fairwell: !props.isGameOver && props.isLastGuessIncorrect
  })

  const renderGameStatus = () => {
    if (!props.isGameOver) {
      if (props.isLastGuessIncorrect) {
        return (
          <p className="fairwell">
            {getFarewellText(languages[props.lostLanguages - 1].name)}
          </p>
        )
      } else {
        return null
      }
    }

    if (props.isGameWon) {
      return (
        <>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
          />
          <h2>"You win!"</h2>
          <p>Well done 🎉</p>
        </>
      )
    } else if (props.isGameLost) {
      return (
        <>
          <h2>"Game over!"</h2>
          <p>You lose! Better start learning Assembly😭</p>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <section
      aria-live="polite"
      role="status"
      className={gameStatusClass}
    >
      {renderGameStatus()}
    </section>
  )
}

export default Status