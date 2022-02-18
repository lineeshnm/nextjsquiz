import React, { useState, useEffect } from 'react'
import { ContactCard } from '../components';
import { isAuth } from '../actions/auth';
import Switch from '@mui/material/Switch';
import { QuestionCardMin } from '../components';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

const URL = process.env.URL
const APP_NAME = process.env.APP_NAME

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'glass-item',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const options = [
  {
    value: 'Select',
    label: 'Select',
  },
  {
    value: 'A',
    label: 'Option A',
  },
  {
    value: 'B',
    label: 'Option B',
  },
  {
    value: 'C',
    label: 'Option C',
  },
  {
    value: 'D',
    label: 'Option D',
  },
];

const INITIAL_STATE = {
  question: {question: '', optiona: '', optionb: '', optionc: '', optiond: '', answer: '', hint: '', explanation: '', image: ''}
}

export default function CreateQuiz() {
  const [timedGame, setTimedGame] = useState(true);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [quizName, setQuizName] = useState('');
  const [errors, setErrors] = useState('')
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(INITIAL_STATE.question);
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false);
  const [slug, setSlug] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  // console.log({startTime, startDate})
  useEffect(() => {
    if (process.browser) {
        const localquestions = JSON.parse(localStorage.getItem('questions'))
        if(localquestions) {
        setQuestions(localquestions)
        } else {
          setQuestions([])
        }
    }
    return () => {
        console.log("unmounted from localstorage")
    };
  }, []);

  const handleQuestion = (e) => {
    const oldQuestion = question;
    setQuestion({...oldQuestion, [e.target.name]: e.target.value})
  }

  const validate = () => {
    let err = {}
    if (question.question === '') {
        err.question = 'Please enter a Question'
    } 
    if (question.optiona === '') {
        err.optiona = 'Please enter Option A'
    } 
    if (question.optionb === '') {
        err.optionb = 'Please enter Option B'
    }
    if (question.optionc === '') {
        err.optionc = 'Please enter Option C'
    }
    if (question.optiond === '') {
        err.optiond = 'Please enter Option B'
    }
    if (question.explanation === '') {
        err.explanation = 'Please enter Explanation'
    }
    if (question.answer === '' || question.answer === 'Select') {
        err.answer = 'Please Select an Answer'
    }
    return err;
  }

  const uploadValidate = () => {
    let err = {}
    if (quizName === '') {
        err.quizName = 'Please enter a Quiz Name'
    } 
    if (description === '') {
        err.description = 'Please enter a Description'
    } 
    return err;
  }

  const handleQuizSubmission = async () => {
    setUploading(true)
    const errs = uploadValidate()
    console.log({errs})
    setErrors(errs)
  }

  const uploadQuiz = async () => {
    if (Object.keys(errors).length === 0) {
      const newQuestions = questions.map((question, index) => { 
        return { ...question, questionNumber: index + 1 }
      })
      const newStartDate = `${startDate.toLocaleDateString()} ${startTime.toLocaleTimeString()}`
      const newEndDate = `${endDate.toLocaleDateString()} ${endTime.toLocaleTimeString()}`
      const slugName = quizName.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]+/g, '').slice(0,10)
      const slugDate = startDate.toLocaleDateString().replace(/\s/g, '-').replace(/[^\w-]+/g, '').slice(0,10)
      const slugTime = startTime.toLocaleTimeString().replace(/\s/g, '-').replace(/[^\w-]+/g, '').slice(0,10)
      const slug = `${slugName}-${slugDate}-${slugTime}`;
      setSlug(slug)
      const response = await fetch(`${URL}/api/quizes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizName,
          description,
          questions: newQuestions,
          timedGame,
          startDate: newStartDate,
          endDate: newEndDate,
          readyToPlay,
          createdBy: isAuth()._id,
          slug
        })
      })
      const data = await response.json()
      setUploading(false)
      if (data.errors) {
        // setErrors(data.errors)
        console.log(data.errors)
        setUploading(false)
      } else if(data.success === true) {
        handleModalOpen()
        setUploading(false)
        setQuestions([])
        setQuizName('')
        setDescription('')
        setTimedGame(true)
        setReadyToPlay(false)
        setStartDate(new Date())
        setStartTime(new Date())
        setEndDate(new Date())
        setEndTime(new Date())
        setErrors('')
        if (process.browser) {
          localStorage.setItem("questions", JSON.stringify([]));
        }
      }
    } else {
      setUploading(false)
      setErrors(errors)
    }
  }

  const addQuestion = (e) => { 
    // e.preventDefault();
    let errs = validate()
    setErrors(errs)
    setSubmitting(true)
  }

  const deleteQuestion = (question) => {
    const newQuestions = questions.filter(q => q.question !== question.question)
    setQuestions(newQuestions)
    if (process.browser) {
      localStorage.setItem("questions", JSON.stringify(newQuestions));
    }
  }

  useEffect(() => {
    if (submitting) {
        if (Object.keys(errors).length === 0 && question.question !== '') {
            const newQuestion = {...question, options: [question.optiona, question.optionb, question.optionc, question.optiond], }
            delete newQuestion.optiona
            delete newQuestion.optionb
            delete newQuestion.optionc
            delete newQuestion.optiond
            const newQuestions = [...questions, newQuestion]
            setQuestions(newQuestions)
            if (process.browser) {
              localStorage.setItem("questions", JSON.stringify(newQuestions));
            }
            setQuestion(INITIAL_STATE.question)
        } else {
            setSubmitting(false)
        }
    }
    if (uploading) {
      if (Object.keys(errors).length === 0 && quizName !== '' && description !== '') {
        uploadQuiz()
      } else {
          setUploading(false)
      }
    }
    return () => {
        console.log("unmounted from errors")
    }
  }, [errors])  

  return (
    <div className='page-banner-container'>
      <div className="page-banner">
        {APP_NAME} - Create Quiz
      </div>
      {
          isAuth() && (
            <>
                <ul className='grid-container'>
                  <li className='grid-item'>
                    <form>
                      <div className='grid-item-h4'>Stage 1: Add Questions</div>
                      <div className='grid-item-h6'>{questions.length} Questions added</div>
                      <div className='grid grid-cols-2 grid-rows-5 gap-2 '>
                        <div className='py-2 flex gap-2'>
                          <Typography className='px-3'>Q</Typography>
                          <TextField 
                            fullWidth 
                            value={question.question} 
                            placeholder="Question" 
                            label="Question" 
                            color="primary" 
                            name="question"
                            error={errors.question ? true: false} 
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='py-2 flex gap-2'>
                          <Typography className='px-3'>Answer</Typography>
                          <TextField
                            fullWidth 
                            sx={{ width: '65%' }}
                            id="answer"
                            name="answer"
                            select
                            label="Option"
                            value={question.answer}
                            error={errors.answer ? true: false}
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value} >
                                {option.label}
                              </MenuItem>
                              // <div>{option.label}</div>
                            ))}
                          </TextField>
                        </div>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>A</Typography>
                          <TextField 
                            fullWidth 
                            value={question.optiona} 
                            placeholder="Option A" 
                            label="Option A" 
                            color="primary" 
                            name="optiona"
                            error={errors.optiona ? true: false} 
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='pr-2 flex gap-2'>
                          <Typography className='px-2'>B</Typography>
                          <TextField 
                            fullWidth 
                            value={question.optionb} 
                            placeholder="Option B" 
                            label="Option B" 
                            color="primary" 
                            name="optionb"
                            error={errors.optionb ? true: false} 
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>C</Typography>
                          <TextField 
                            fullWidth 
                            value={question.optionc} 
                            placeholder="Option C" 
                            label="Option C" 
                            color="primary" 
                            name="optionc"
                            error={errors.optionc ? true: false} 
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='pr-2 flex gap-2'>
                          <Typography className='px-2'>D</Typography>
                          <TextField 
                            fullWidth 
                            value={question.optiond} 
                            placeholder="Option D" 
                            label="Option D" 
                            color="primary" 
                            name="optiond"
                            error={errors.optiond ? true: false} 
                            onChange={(event) => handleQuestion(event)}
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='py-2 flex gap-2'>
                          <Typography className='px-2'>Hint</Typography>
                          <TextField 
                            fullWidth 
                            value={question.hint} 
                            placeholder="Ques Hint" 
                            label="Ques Hint" 
                            color="primary" 
                            name="hint"
                            error={errors.hint ? true: false} 
                            onChange={(event) => handleQuestion(event)} 
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='pr-2 flex gap-2'>
                          <Typography className='px-1'>Info</Typography>
                          <TextField 
                            fullWidth 
                            value={question.explanation} 
                            placeholder="Explanation" 
                            label="Explanation" 
                            color="primary" 
                            name="explanation"
                            error={errors.explanation ? true: false} 
                            onChange={(event) => handleQuestion(event)} 
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}  
                          />
                        </div>
                        <div className='py-2 flex justify-evenly gap-10 col-span-2'>
                        <Tooltip title="Clear the Form">
                          <IconButton onClick={() => setQuestion(INITIAL_STATE.question)}>
                            <ClearSharpIcon variant="contained" className='bg-orange-400 hover:bg-red-700 h-12 w-12 md:h-8 md:w-8 sm:h-6 sm:w-6 rounded-full' />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Question">
                          <IconButton onClick={addQuestion}>
                            <AddCircleSharpIcon variant="contained" className='bg-blue-400 hover:bg-blue-700 h-12 w-12 md:h-8 md:w-8 sm:h-6 sm:w-6 rounded-full' />
                          </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                      </form>
                  </li>
                  <li className='grid-item'>
                    <div className='grid-item-h4'>Stage 2: Review Questions</div>
                    <div className='grid grid-cols-1 grid-row-4 gap-2 grid-flow-row p-2 h-26-r overflow-y-auto'>
                      {questions.reverse().map((question, index) => (
                        <QuestionCardMin key={index} question={question} index={index} deleteQuestion={deleteQuestion}/>
                      ))}
                    </div>
                  </li>
                  <li className='grid-item'>
                      <form>
                      <div className='grid-item-h4'>Stage 3: Quiz Controls</div>
                      <div className='pr-2 flex-col'>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>Quiz Name</Typography>
                          <TextField 
                            fullWidth 
                            value={quizName} 
                            placeholder="Quiz Name" 
                            label="Quiz Name" 
                            color="primary" 
                            error={errors.quizName ? true: false} 
                            onChange={(event) => setQuizName(event.target.value)} 
                            InputLabelProps={{
                              style: { color: 'white'},
                            }}  
                          />
                        </div>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>Quiz Description</Typography>
                          <TextField 
                            fullWidth 
                            value={description} 
                            placeholder="Quiz Description" 
                            label="Quiz Description" 
                            color="primary" error={errors.description ? true: false} 
                            onChange={(event) => setDescription(event.target.value)} 
                            InputLabelProps={{
                              style: { color: 'white'}, 
                            }}
                          />
                        </div>
                        <div className='p-2 flex gap-16'>
                          <Typography >Timed Quiz ?</Typography>
                          <FormControlLabel 
                            control={<Switch checked={timedGame} />} 
                            label={timedGame? "Yes": "No"} 
                            onChange={() => setTimedGame(!timedGame)}
                          />
                        </div>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>Start Date</Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                              <DesktopDatePicker
                                  label="Start Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={startDate}
                                  onChange={(newDate) => setStartDate(newDate)}
                                  renderInput={(params) => <TextField {...params} />}
                              />
                              </Stack>
                          </LocalizationProvider>
                          <Typography className='px-2'>Start Time</Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={2}>
                            <TimePicker
                              label="Start Time"
                              inputFormat="hh:mm a"
                              value={startTime}
                              renderInput={(params) => <TextField {...params} />}
                              onChange={(newValue) => {
                                setStartTime(newValue);
                              }}
                            />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                        <div className='py-2 flex gap-4'>
                          <Typography className='px-2'>End Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                              <DesktopDatePicker
                                  label="End Date"
                                  inputFormat="MM/dd/yyyy"
                                  value={endDate}
                                  onChange={(newDate) => setEndDate(newDate)}
                                  renderInput={(params) => <TextField {...params} />}
                              />
                              </Stack>
                          </LocalizationProvider>
                          <Typography className='px-2'>End Time</Typography>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              label="End Time"
                              value={endTime}
                              // inputFormat="hh:mm:ss a"
                              onChange={(newValue) => {
                                setEndTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </div>
                        <div className='p-2 flex gap-10'>
                          <Typography >Ready to Launch ?</Typography>
                          <FormControlLabel control={<Switch checked={readyToPlay} />} label={readyToPlay? "Yes": "No"} onChange={() => setReadyToPlay(!readyToPlay)}/>
                        </div>
                        <div className='justify-center py-2 flex gap-10'>
                          <Typography className='px-2'>Final Submission</Typography>
                          <Button variant="contained" onClick={handleQuizSubmission} className='bg-blue-500 hover:bg-blue-700' >Submit</Button>
                        </div>
                      </div>
                      </form>
                  </li>
                  <li><div className='h-24 sm:h-0'></div></li>
                  <li><div className='h-24 sm:h-0'></div></li>
                  <li><div className='h-24 sm:h-0'></div></li>
                  <li><div className='h-24 sm:h-0'></div></li>
                </ul>
            </>
          )
      }
      {
        !isAuth() && (
        <div className='h-full w-full relative overflow-hidden flex justify-center py-6'>
            <ContactCard />
        </div>
        )
      }
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='text-white'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Quiz is created
          </Typography>
          <p className='text-sm py-6'>URL to Share it with participants: </p>
          <a className='text-sm' href={`${URL}/quizes/${slug}`} target="_blank" rel="noopener noreferrer">{`${URL}/quizes/${slug}`}.</a>
        </Box>
      </Modal>
    </div>
  )
}