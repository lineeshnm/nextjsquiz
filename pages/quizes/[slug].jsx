import React, { useState, useEffect } from 'react'
import { QuestionCard, CountDownTimer } from '../../components';
import IconButton from '@mui/material/IconButton';
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Button from '@mui/material/Button';

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const QuizPage = ({quiz}) => {
  const [questions, setQuestions] = useState([]);
  const [qNumber, setQNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [points, setPoints] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(1);
  const [right, setRight] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleInfoOpen = () => setInfoOpen(true);
  const handleInfoClose = () => setInfoOpen(false);
  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => {
    setRight(null)
    setConfirmOpen(false)
    console.log({questions})
    console.log({qNumber})
    if (qNumber + 2 > questions.length) {
      setQNumber(qNumber + 1)
      stopQuiz()
    } else {
      setQNumber(qNumber + 1)
      setIsPlaying(true)
    }
    setSelectedOption('')
  };

  const startQuiz = () => {
    setFlag(true)
    setQuestions(quiz.questions)
    setQNumber(0)
    setPoints(0)
    setIsPlaying(true)
  }

  const stopQuiz = () => {
    setIsPlaying(false)
    setFlag(false)
  }

  const selectedAnswer = (option) => {
    setIsPlaying(false)
    setSelectedOption(option)
  }

  const checkForAnswer = () => {
    if (selectedOption === '') {
      console.log("Do nothing")
    } else if (selectedOption === questions[qNumber].answer) {
      setRight(true)
      setPoints(points+currentPoint)
      handleConfirmOpen()
    } else {
      setRight(false)
      handleConfirmOpen()
    }
  }

  useEffect(() => {
    checkForAnswer()
    return () => {
      console.log("unmount from selectedOption")
    };
  }, [selectedOption]);

  return (
    <div className='page-banner-container'>
      {
        quiz && quiz.quizName && (
          <>
          
          <div className="page-banner">
            {APP_NAME} - {quiz.quizName ? quiz.quizName : "Loading.."}
          </div>
          <div className='grid-container'>
            <div className='grid-item'>
              <div className='grid-item-h4'>Quiz Details</div>
              <div className='grid-item-h6'>{quiz.quizName}</div>
              <div className='h-12 lg:h-20 md:h-16 sm:h-12 text-center pb-4'>
              <Tooltip title="More details">
                <IconButton onClick={handleInfoOpen} className='p-0 gap-3'>
                <div className='animate-bounce text-yellow-500'>👉{' '}</div><div className='text-white grid-item-body2'>More ... </div><InfoIcon variant="contained" className='grid-icon-button bg-blue-500 hover:bg-blue-700' />
                </IconButton>
              </Tooltip>
              </div>
              <div className='flex justify-evenly'>
                <div className='grid-item-body2'>Starts At: {quiz.startDate}</div>
                <div className='grid-item-body2'>Ends At: {quiz.endDate}</div>
              </div>
              <div className='flex justify-evenly'>
                <div className='grid-item-body2'>Timed Game?: {quiz.timedGame.toString()}</div>
                <div className='grid-item-body2'>Live Game?: {quiz.readyToPlay.toString()}</div>
              </div>
              <div className='h-12 lg:h-20 md:h-16 sm:h-12 text-center pb-4' >
                <Tooltip title="Start the Quiz">
                  <IconButton onClick={startQuiz} className='p-0 gap-3'>
                  <div className='animate-bounce text-yellow-500'>👉{' '}</div><div className='text-white grid-item-body2'>Start {'  '}</div><FlagIcon variant="contained" className='grid-icon-button bg-green-500 hover:bg-green-700' />
                  </IconButton>
                </Tooltip>   
              </div>
            </div>
            <div className='grid-item'>
              <div className='grid-item-h4'>Questions</div>
              {
                isPlaying && quiz.timedGame && (<div className='grid-item-h6'>Check for Timer</div>)
              }
              {
                questions && questions[qNumber] && (
                  <>
                    <QuestionCard key={qNumber} question={questions[qNumber]} selectedAnswer={selectedAnswer}/>
                    <Modal
                      open={confirmOpen}
                      onClose={handleConfirmClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className='modal-box glass-item'>
                        {
                          right && (
                            <>
                              <InsertEmoticonIcon className='grid-icon-button text-yellow-400'/>
                              <div className='grid-item-h6'>
                                You are Right!!. You got some Point. 
                              </div>
                              <div className='grid-item-body1'>
                                Explanation: {questions[qNumber].explanation}
                              </div>
                              <div key="upload" className='button'>
                                <Button variant="contained" component="span" className='bg-blue-400 button-text' onClick={handleConfirmClose}>
                                  Dismiss
                                </Button>
                              </div>
                            </>
                          )
                        }
                        {
                          !right && (
                            <>
                              <SentimentVeryDissatisfiedIcon className='grid-icon-button text-yellow-400'/>
                              <div className='grid-item-h6'>
                              oh oh. Not went well :-{'('}
                              </div>
                              <div className='grid-item-body1'>
                              Explanation: {questions[qNumber].explanation}
                              </div>
                              <div key="upload" className='button'>
                                <Button variant="contained" component="span" className='bg-blue-400 button-text' onClick={handleConfirmClose}>
                                  Dismiss
                                </Button>
                              </div>
                            </>
                          )
                        }

                      </Box>
                    </Modal>
                  </>
                )
              }
            </div>
            {
              isPlaying && quiz.timedGame && (
                <div className='grid-item-special'>
                  <div className="time">
                    <CountDownTimer duration={30} selectedAnswer={selectedAnswer} isPlaying={isPlaying} setCurrentPoint={setCurrentPoint} />
                  </div>
                </div>
              )
            }
            <div className='grid-item'>
              <div className='grid-item-h4'>Points</div>
              <div className='grid-item-h6'>
                <Tooltip title={questions[qNumber] ? questions[qNumber].hint : "null"}>
                  <IconButton className='p-0 gap-3' onClick={() => {}}>
                  <div className='animate-bounce text-yellow-500'>👉{' '}</div><div className='text-white'>Hint</div><LightbulbIcon variant="contained" className='grid-icon-button text-white hover:text-yellow-400' />
                  </IconButton>
                </Tooltip> 
                {
                  isPlaying ? (
                  <div className='grid-item-h6'>Your Points: {points}</div>
                  ) : (
                  <div className='grid-item-h2'>Your Points: {points}</div>
                  )
                }  
                
              </div>
              {
                !flag && (
                  <div className='text-center'>
                    <Tooltip title={"Quiz Stopped / Completed"}>
                      <EmojiEventsIcon className='grid-icon-button bg-blue-500 hover:bg-green-500 text-white hover:text-yellow-400' />
                    </Tooltip>
                  </div>
                )
              }
            </div>
            <div className='grid-placeholder'></div>
            <div className='grid-placeholder'></div>
            <div className='grid-placeholder'></div>
            <div className='grid-placeholder'></div>
          </div>
          <Modal
            open={infoOpen}
            onClose={handleInfoClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className='modal-box glass-item'>
              <div className='grid-item-h6'>
              {quiz.quizName}
              </div>
              <div className='grid-item-body1'>
              {quiz.description}
              </div>
              <div key="upload" className='button'>
                <Button variant="contained" component="span" className='bg-blue-400 button-text' onClick={handleInfoClose}>
                  Dismiss
                </Button>
              </div>
            </Box>
          </Modal>
          </>
      )}
    </div>
  )
};

export default QuizPage;

export const getStaticProps = async ({params}) => {
  let slug = params.slug
  const res = await fetch(`${URL}/api/quizes/${slug}`)
  const data = await res.json()
  // console.log({data})
  if (!data.success) {
    return {
      notFound: true,
      revalidate: 10
    }
  }
  return {
    props: { quiz: data.data }, // will be passed to the page component as props
    revalidate: 10
  }
}

export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    };
}
