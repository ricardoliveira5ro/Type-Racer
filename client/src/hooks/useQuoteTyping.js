import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

export const useQuoteTyping = (quote, playerIndex) => {

    const [isRacing, setIsRacing] = useState(false)
    const [hasEnded, setHasEnded] = useState(false)
 
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

    const [distanceToMove, setDistanceToMove] = useState(0)

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


    // Set quote
    useEffect(() => {
        quote && setQuoteWords(quote.text.split(' '))
    }, [quote])


    // Set word index in quote
    useEffect(() => {
        setWordIndex(0)
        setUserInput('')
    }, [quoteWords])


    // Set current word
    useEffect(() => {
        quoteWords && setCurrentWord(quoteWords[wordIndex])
    }, [wordIndex, quoteWords])


    // Wait until it renders and set distance to move after each word
    useLayoutEffect(() => {
        setTimeout(() => {
            const carDiv = document.getElementById(`div-car-${playerIndex + 1}`)
            const carImg = document.getElementById(`img-car-${playerIndex + 1}`)
            if (!carDiv || !carImg || !quoteWords) return

            const spaceAvailable = (carDiv.offsetWidth - (carImg.offsetWidth || 64))
            setDistanceToMove(~~(spaceAvailable / quoteWords.length))
        }, 2000)

    }, [quoteWords, playerIndex])


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


    // Translate car
    useEffect(() => {
        const carImg = document.getElementById(`img-car-${playerIndex + 1}`)
        if (!carImg || !typedWords || !distanceToMove) return

        carImg.style.transform = `translateX(${(distanceToMove * wordIndex)}px)`

    }, [typedWords, distanceToMove, wordIndex, playerIndex])


    // End game
    useEffect(() => {
        if (wordIndex === quoteWords?.length) {
            setIsRacing(false)
            setHasEnded(true)
            userInputRef.current.disabled = true

            const totalCharacters = quote?.text.length
            const totalCharactersTypes = totalCharacters + wrongCharactersCount
            setAccuracy(~~((totalCharacters / totalCharactersTypes) * 100))
        }
    }, [wordIndex, quoteWords, quote, wrongCharactersCount])

    return {
        isRacing,
        setIsRacing,
        hasEnded,
        wordIndex,
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
        elapsedTime,
        setElapsedTime,
        distanceToMove
    }
}