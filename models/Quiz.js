const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
    },
    questions: [{
        questionNumber: {
            type: Number,
        },
        question: {
            type: String,
            trim: true,
            required: true
        },
        options: [{
            type: String
        }],
        answer: {
            type: String,
        },
        hint: {
            type: String,
        },
        explanation: {
            type: String,
        },
        image: {
            type: Buffer
        }
    }],
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    timedGame: {
        type: Boolean,
        required: true
    },
    readyToPlay: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
})

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)