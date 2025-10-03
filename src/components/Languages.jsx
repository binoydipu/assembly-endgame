import { clsx } from "clsx"
import languages from "../languages.js"

const Languages = (props) => {

  const languageList = languages.map((language, index) => {
    const isLanguageLost = index < props.lostLanguages
    const className = clsx("language", isLanguageLost && "lost")
    return (
      <span
        className={className}
        key={language.name}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color
        }}
      >{language.name}</span>
    )
  })

  return (
    <section className="language-container">
      {languageList}
    </section>
  )
}

export default Languages