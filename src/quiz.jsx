// import { useReducer } from 'react'
// import './quiz.css'
// const Quiz = () =>{
//     const data = [
//         {
//             head: "Which of the following is js framework",
//             option1:"Node-js",
//             option2:"React",
//             option3:"Python",
//             option4:"HTMl"
//         },
//         {
//             head: "Which of the following is built React",
//             option1:"google",
//             option2:"facebook",
//             option3:"microdsoft",
//             option4:"lang"
//         },
//     ]
//     const reducer = (value,action) =>{
//         switch(action.type){
//             case"SHOW":
//             return [...data,{head:action.payload.option1}]
//             console.log(action.payload)
//             // console.log([...data,{head:action.payload.option1}] == true ? "yes" : "no")
//         }
//     }
//     const [state,dispatch] = useReducer(reducer,data)
//     const Handleshow = ()=>{
//         for (let index = 0; index < data.length; index++) {
//             const element = data[index]
//             dispatch({type:"SHOW",payload:element})
//             // console.log(element)
//         }
//     }
//     return(
//         <div className="quiz">
//             {/* <h1>Quiz</h1> */}
//             <h4>
//                 {
//                     state.map((abhi)=>{
//                         <span>{abhi.head}</span>
//                     })
//                 }
//             </h4>
//                 {/* <span>{data.option1}</span>
//                 <span>{data.option2}</span>
//                 <span>{data.option3}</span>
//                 <span>{data.option4}</span> */}
//                 <button onClick={Handleshow}>SHOW</button>
//         </div>
//     )
// }
// export default Quiz
import React, { useReducer } from "react";
import './quiz.css'
const quizData = [
  {
    question: "Who built React-js?",
    options: ["Google", "Microsoft", "OpenAI", "Facebook"],
    correctAnswer: "Facebook"
  },
  {
    question: "Which is of the following is object-oriented language?",
    options: ["JAVA", "Python", "Java-script", "kotlin"],
    correctAnswer: "JAVA"
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: "300,000 km/s"
  },
  {
    question: "print('Hello world') Which of the following language syntax to print hello world ?",
    options: ["Python", "#C", "C++", "Kotlin"],
    correctAnswer: "Python"
  },
  {
    question: "Which language use compiler to translate code to machine language ?",
    options: ["C++", "Java-Script", "Ruby", "php"],
    correctAnswer: "Python"
  },
  {
    question: "What will be the output of the code ? let a = 10; console.log('value of a : ',a)",
    options: ["a", "10", "value of a :", "value of a : 10"],
    correctAnswer: "value of a : 10"
  },
  {
    question: "Which of the following language use echo to print something on Web page",
    options: ["Php", "Dot.net", "Sql", "Panda"],
    correctAnswer: "php"
  }
];

// Initial state
const initialState = {
  currentQuestion: 0,
  score: 0,
  showResults: false
};

// Reducer function
const quizReducer = (state, action) => {
  switch (action.type) {
    case "ANSWER_QUESTION":
      const isCorrect =
        quizData[state.currentQuestion].correctAnswer === action.payload;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        showResults: state.currentQuestion + 1 === quizData.length
      };

    case "RESTART_QUIZ":
      return initialState;

    default:
      return state;
  }
};

const Quiz = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const handleAnswerClick = (answer) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  const handleRestart = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  if (state.showResults) {
    return (
      <div className="result">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {state.score} / {quizData.length}</p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  const currentQuestionData = quizData[state.currentQuestion];

  return (
    <>
    <h1 style={{textAlign:'center',padding:"20px",color:"white"}}>Quiz Game</h1>
    <div className="quiz">
      <h2>{currentQuestionData.question}</h2>
      <div>
      {currentQuestionData.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswerClick(option)}>
          {option}
        </button>
      ))}
      </div>
    </div>
    </>
  );
};

export default Quiz;
