import { useEffect, useMemo, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"


export const useQuoteTyping = () => {

    const [isRacing, setIsRacing] = useState(false);
 
    const { quotes } = useAppContext()
    const [quote, setQuote] = useState(null)
    const [quoteWords, setQuoteWords] = useState(null)

    const [userInput, setUserInput] = useState("")
    const userInputRef = useRef(null)
    const [currentWord, setCurrentWord] = useState(null)
    const [wordIndex, setWordIndex] = useState(0)

    const [inputBgColor, setInputBgColor] = useState("bg-white");

    const [elapsedTime, setElapsedTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0)

    const prevUserInputRef = useRef("");
    const [wrongCharactersCount, setWrongCharactersCount] = useState(0);

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


    // Randomize quote
    useEffect(() => {
        const tmpQuote = quotes[~~(Math.random() * quotes.length)]

        setQuote(tmpQuote)
        tmpQuote && setQuoteWords(tmpQuote.text.split(' '))
    }, [quotes])


    // Set word index in quote
    useEffect(() => {
        setWordIndex(0)
        setUserInput('')
    }, [quoteWords])


    // Set current word
    useEffect(() => {
        quoteWords && setCurrentWord(quoteWords[wordIndex])
    }, [wordIndex, quoteWords])


    // Evaluate userInput with current word
    useEffect(() => {
        if (userInput.slice(-1) !== ' ' && wordIndex !== quoteWords?.length - 1) return

        if (userInput.trimEnd() === currentWord) {
            setUserInput('')
            setWordIndex(() => wordIndex + 1)
        }

    }, [userInput, currentWord, wordIndex, quoteWords])


    // Set input background color
    useEffect(() => {
        (wrongWordPart || userInput.length > currentWord?.length) ? setInputBgColor("bg-red-300") :
                                                                    setInputBgColor("bg-white")
    }, [wrongWordPart, userInput, currentWord]);


    // Calculate wpm
    useEffect(() => {
        if (!elapsedTime || !isRacing) return

        const wordsTyped = typedWords?.length / 5 // Convert to words (5 chars = 1 word)
        const timeMinutes = elapsedTime / 1000 / 60

        setWpm(~~(wordsTyped / timeMinutes))
    }, [typedWords]) // eslint-disable-line react-hooks/exhaustive-deps


    // Count user typing errors
    useEffect(() => {
        const prevUserInput = prevUserInputRef.current;
        
        if (wrongWordPart && userInput.length > prevUserInput.length) {
            setWrongCharactersCount(() => wrongCharactersCount + 1)
        }

        prevUserInputRef.current = userInput
    }, [userInput, wrongWordPart, wrongCharactersCount])


    // End game
    useEffect(() => {
        if (wordIndex === quoteWords?.length) {
            setIsRacing(false)
            userInputRef.current.disabled = true

            const totalCharacters = quote?.text.length
            const totalCharactersTypes = totalCharacters + wrongCharactersCount
            setAccuracy(~~((totalCharacters / totalCharactersTypes) * 100))
        }
    }, [wordIndex, quoteWords, quote, wrongCharactersCount])

    return {
        isRacing,
        setIsRacing,
        quote,
        typedWords,
        remainingWords,
        correctWordPart,
        wrongWordPart,
        currentWord,
        userInput,
        setUserInput,
        userInputRef,
        inputBgColor,
        wpm,
        accuracy,
        setElapsedTime,
    }
}