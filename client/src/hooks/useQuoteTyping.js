import { useEffect, useMemo, useState } from "react"
import { useAppContext } from "../context/AppContext"


export const useQuoteTyping = () => {
 
    const { quotes } = useAppContext()
    const [quote, setQuote] = useState(null)
    const [quoteWords, setQuoteWords] = useState(null)

    const [userInput, setUserInput] = useState("")
    const [isWrongInput, setIsWrongInput] = useState(false)
    const [currentWord, setCurrentWord] = useState(null)
    const [wordIndex, setWordIndex] = useState(0)

    const typedWords = useMemo(
        () => quoteWords?.slice(0, wordIndex).join(' '),
        [quoteWords, wordIndex]
    )

    const remainingWords = useMemo(
        () => quoteWords?.slice(wordIndex + 1, quoteWords?.length).join(' '),
        [quoteWords, wordIndex]
    )

    const correctWordPart = useMemo(() => {
        if (currentWord) {
            let i = 0;
            while (i < userInput.length) {
                if (userInput[i] !== currentWord[i]) {
                    break;
                }
                i++;
            }
            return userInput.slice(0, i);
        }

        return "";
    }, [currentWord, userInput])

    const wrongWordPart = useMemo(
        () => currentWord?.slice(correctWordPart.length,userInput.length),
        [correctWordPart, currentWord, userInput]
    )

    useEffect(() => {
        wrongWordPart ? setIsWrongInput(true) : setIsWrongInput(false)
    }, [wrongWordPart])

    useEffect(() => {
        const tmpQuote = quotes[~~(Math.random() * quotes.length)]

        setQuote(tmpQuote)
        tmpQuote && setQuoteWords(tmpQuote.text.split(' '))
    }, [quotes])

    useEffect(() => {
        setWordIndex(0)
        setUserInput('')
    }, [quoteWords])

    useEffect(() => {
        quoteWords && setCurrentWord(quoteWords[wordIndex])
    }, [wordIndex, quoteWords])

    useEffect(() => {
        if (userInput.slice(-1) !== ' ' && wordIndex !== quoteWords?.length - 1) return

        if (userInput.trimEnd() === currentWord) {
            setUserInput('')
            setWordIndex(() => wordIndex + 1)
        }

    }, [userInput, currentWord, wordIndex, quoteWords])

    useEffect(() => {
        if (wordIndex === quoteWords?.length) {
            // End game
        }
    }, [wordIndex, quoteWords])

    return {
        quote,
        typedWords,
        remainingWords,
        correctWordPart,
        wrongWordPart,
        currentWord,
        userInput,
        setUserInput,
        isWrongInput
    }
}