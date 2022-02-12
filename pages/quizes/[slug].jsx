import React, { useState, useEffect } from 'react'
import { QuestionCard, CountDownTimer } from '../../components';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DangerousIcon from '@mui/icons-material/Dangerous';

const APP_NAME = process.env.APP_NAME
const URL = process.env.URL

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'glass-item',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
};

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
    <div className='flex-grow px-12 pt-40 w-screen'>
      {
        quiz && quiz.quizName && (
          <>
          
          <div className="text-center h-full text-4xl font-semibold py-2 glass-item">
            {APP_NAME} - {quiz.quizName ? quiz.quizName : "Loading.."}
          </div>
          <div className='grid grid-cols-6 grid-rows-5 gap-2 grid-flow-col py-12'>
            <div className='col-start-1 col-span-1 row-start-1 row-span-5 glass-item'>
              <div className='text-center text-xl pt-6'>Quiz Details</div>
              <div className='text-center text-lg py-2'>{quiz.quizName}</div>
              <div className='h-20 text-center py-2'>
              <Tooltip title="More details">
                <IconButton onClick={handleInfoOpen} className='h-16'>
                  <InfoIcon variant="contained" className='h-16 bg-blue-500 hover:bg-blue-700 rounded-full' />
                </IconButton>
              </Tooltip>
              </div>
              <div className='text-center text-base py-2'>Start Time: {quiz.startDate}</div>
              <div className='text-center text-base py-2'>End Time: {quiz.endDate}</div>
              <div className='text-center text-base py-2'>Timed Game?: {quiz.timedGame.toString()}</div>
              <div className='text-center text-base py-2'>Live Game?: {quiz.readyToPlay.toString()}</div>
              <div className='h-20 text-center py-2'>
                <Tooltip title="Start the Quiz">
                  <IconButton onClick={startQuiz}>
                    <FlagIcon variant="contained" className=' h-20 w-20 rounded-full bg-green-500 hover:bg-green-700 ' />
                  </IconButton>
                </Tooltip>   
              </div>
            </div>
            <div className='col-start-2 col-span-4 row-start-1 row-span-5 glass-item'>
              <Typography variant="h6" className='text-center py-6'>Questions</Typography>
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
                      <Box sx={style} className='text-white py-6'>
                        {
                          right && (
                            <>
                              <InsertEmoticonIcon className='h-24 w-24 rounded-full text-yellow-400'/>
                              <Typography id="modal-modal-title" variant="h6" component="h2" className='p-4'>
                              You are Right!!. You got one Point. 
                              </Typography>
                              <Typography id="modal-modal-title" variant="body2" component="h2" className='p-4'>
                              Explanation: {questions[qNumber].explanation}
                              </Typography>
                            </>
                          )
                        }
                        {
                          !right && (
                            <>
                              <SentimentVeryDissatisfiedIcon className='h-24 w-24 rounded-full text-yellow-400'/>
                              <Typography id="modal-modal-title" variant="h6" component="h2" className='p-4'>
                              oh oh. Not went well :-
                              </Typography>
                              <Typography id="modal-modal-title" variant="body2" component="h2" className='p-4'>
                              Explanation: {questions[qNumber].explanation}
                              </Typography>
                            </>
                          )
                        }

                      </Box>
                    </Modal>
                  </>
                )
              }
            </div>
            <div className='col-start-6 col-span-1 row-start-1 row-span-5 glass-item'>
              <Typography variant="h6" className='text-center pt-6'>Points</Typography>
              <div className='text-center py-6'>
                <Tooltip title={questions[qNumber] ? questions[qNumber].hint : "null"}>
                  <IconButton onClick={() => {}}>
                    <LightbulbIcon variant="contained" className=' h-20 w-20 rounded-full text-white hover:text-yellow-400' />
                  </IconButton>
                </Tooltip> 
                {
                  isPlaying ? (
                  <Typography variant="body1" className='text-center py-6'>Your Points:{points}</Typography>
                  ) : (
                  <Typography variant="h2" className='text-center py-6'>Your Points:{points}</Typography>
                  )
                }  
                
              </div>
              {
                isPlaying && quiz.timedGame && (
                  <div className="time">
                    <CountDownTimer duration={30} selectedAnswer={selectedAnswer} isPlaying={isPlaying} setCurrentPoint={setCurrentPoint} />
                  </div>
                )
              }
              {
                !flag && (
                  <div className='text-center'>
                    <Tooltip title={"Quiz Stopped / Completed"}>
                      <DangerousIcon className='h-20 w-20 bg-red-500 text-white hover:text-yellow-400' />
                    </Tooltip>
                  </div>
                )
              }
            </div>
            <div className='h-24'></div>
            <div className='h-24'></div>
            <div className='h-24'></div>
            <div className='h-24'></div>
          </div>
          <Modal
            open={infoOpen}
            onClose={handleInfoClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='text-white py-6'>
              <Typography id="modal-modal-title" variant="h6" component="h2" className='p-4'>
              {quiz.quizName}
              </Typography>
              <Typography id="modal-modal-title" variant="body2" component="h2" className='p-4'>
              {quiz.description}
              </Typography>
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
