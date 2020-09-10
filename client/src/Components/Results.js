import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

export default function Results(props) {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [students, setStudents] = useState([]);

	// const [resultRoute, setResultRoute] = useState("");
	const [resultRoute, setResultRoute] = useState("");
	const [quizRoute, setQuizRoute] = useState("");
	const [allResults, setAllResults] = useState(null);
	const [quizSelected, setQuizSelected] = useState({});
	const [quizSelectedResult, setQuizSelectedResult] = useState([]);
	const [attempt, setAttempt] = useState(0);

	console.log(quizSelected);
	console.log(allResults);
	console.log(quizSelectedResult);
	console.log(quizQuestions);
	console.log(students);

	useEffect(() => {
		fetch("/api/results")
			.then((response) => response.json())
			.then((data) => setAllResults(data))
			.catch((err) => console.error(err));

		fetch(`/api/${quizRoute}`)
			.then((response) => response.json())
			.then((data) => setQuizSelected(data))
			.catch((err) => console.error(err));
	}, [quizRoute]);

	//Remove the duplicated data from array
	function uniqBy(array, key) {
		let seen = {};
		return array.filter(function (item) {
			let k = key(item);
			return seen.hasOwnProperty(k) ? false : (seen[k] = true);
		});
	}

	const changeHandler = (event) => {
		setQuizRoute(`quizzes/${event.target.value}`);
		const selectedResult = allResults.filter(
			(result) => result.quiz_id === event.target.value
		);
		setQuizSelectedResult(selectedResult);
		const names = selectedResult.map((result) => result.studentName);
		if (selectedResult.length > 0) {
			setStudents(uniqBy(names, JSON.stringify));

			const ids = props.quizzes.find((quiz) => quiz._id === event.target.value)
				.questions_id;
			const questions = ids.map((id) => {
				return props.questions.find((question) => question._id === id);
			});
			setQuizQuestions(questions);
		}
	};



	const getValues = (student, id)=>{
		const allatemmpt = quizSelectedResult
			.filter(
				(quizResult) =>
					quizResult.studentName === student
			);
		const lastAtemmpt = allatemmpt.splice((allatemmpt.length>quizQuestions.length ? allatemmpt.length -quizQuestions.length:0),quizQuestions.length);
		const finalResult = lastAtemmpt.find((attempt) => attempt.question_id === id);
		if(finalResult) {
			return (
				<td key={finalResult._id} className={colorState(finalResult.correct)}>{finalResult.value}</td>//{result.timestamp}
			);
		}else{
			<td className="unknown"></td>;//{result.timestamp}
		}
	};

	const colorState = (correct)=>{
		if(correct){
			return("corect");
		}else{
			return("incorect");
		}
	};

	return (
		<div>
			<div>
				<h1> no results for this quiz have been submitted yet</h1>
				<div className="col-12">
					<h1>Welcome to QuizzTime</h1>
					<select className="input select-input" onChange={changeHandler}>
						<option>Select a Quiz</option>
						{props.quizzes.map((quiz) => {
							return (
								<option key={quiz._id} value={quiz._id}>
									{quiz.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div>
				{quizSelected._id ? (
					<table>
						<thead>
							<tr>
								<th></th>
								{quizQuestions.length > 0
									? quizQuestions.map((question) => {
										return <th key={question._id}>{question.question}</th>;
									})
									: null}
							</tr>
						</thead>
						<tbody>
							{students.map((student, index) => {
								return (
									<tr key={index}>
										<th>{student}</th>
										{quizQuestions.map((question) => getValues(student,question._id))}

									</tr>
								);
							})}
						</tbody>
					</table>
				) : null}
			</div>
		</div>
	);

	// const increaseAttemptNumber = () => setAttemptNumber(attemptNumber + 1);
	// const decreaseAttemptNumber = () => {
	// 	if (attemptNumber > 0) {
	// 		setAttemptNumber(attemptNumber - 1);
	// 	} else {
	// 		alert("can't increase");
	// 	}
	// };

	// // const findQuestionResult = (questionId, studentName) => {
	// // 	let resultsforThisQuestion = allResults.filter(
	// // 		(result) => result.question_id === questionId
	// // 	);
	// // 	let studentsAttemptsOnQuestion = resultsforThisQuestion.filter(
	// // 		(result) => result.studentName === studentName
	// // 	);
	// // 	if (studentsAttemptsOnQuestion.length === 0) {
	// // 		return "unknown";
	// // 	}
	// // 	if (studentsAttemptsOnQuestion[attemptNumber] === undefined) {
	// // 		return "unknown";
	// // 	}
	// // 	if (
	// // 		studentsAttemptsOnQuestion !== undefined
	// //   && studentsAttemptsOnQuestion[attemptNumber].correct
	// // 	) {
	// // 		return "corect";
	// // 	} else {
	// // 		return "incorect";
	// // 	}
	// // };
	// const [resultStat, setResultState]=useState("");

	// // const findStudenAnswerResult = (questionId, studentName) => {
	// // 	let studentAnsweredId = allResults.filter(
	// // 		(result) => result.question_id === questionId
	// // 	);
	// // 	let studentAnsweredQuestion = studentAnsweredId.filter(
	// // 		(el) => el.studentName === studentName
	// // 	);
	// // 	if (studentAnsweredQuestion.length === 0) {
	// // 		return "unknown";
	// // 	}
	// // 	if (
	// // 		studentAnsweredQuestion !== undefined
	// //   && studentAnsweredQuestion[attemptNumber]
	// // 	) {
	// // 		return studentAnsweredQuestion[attemptNumber].value;
	// // 	}
	// // };

	// const [resultValue, setResultValue]=useState("");

	// useEffect(() => {
	// 	fetchResults();
	// }, [quizRoute]);

	// useEffect(() => {
	// 	if (quizSelected !== null) {
	// 		const makeQuestions = () => {
	// 			let selectedQuizQuestions = [];
	// 			selectedQuizQuestions = quizSelected.questions_id.filter((selId) => result.studentName === student).map{
	// 				let found = props.questions.find((question) => question._id == selId);
	// 				selectedQuizQuestions.push(found);
	// 				setSelectedQuizQuestions(selectedQuizQuestions);
	// 			});
	// 		};
	// 		makeQuestions();
	// 	}
	// }, [quizSelected]);
	// const makeNames = () => {
	// 	let tempNames = [];
	// 	if (allResults !== "not found!") {
	// 		allResults.map((oneAnswer) => {
	// 			if (studentNames && !tempNames.includes(oneAnswer.studentName)) {
	// 				tempNames.push(oneAnswer.studentName);
	// 			}
	// 		});
	// 		setStudentNames(tempNames);
	// 	}
	// };
	// useEffect(() => {
	// 	if (allResults) {
	// 		makeNames();
	// 	}
	// }, [allResults]);

	// const quizToSeeResultsChosen = (e) => {
	// 	setQuizRoute(e.target.value);
	// 	const selectedQuiz = props.quizzes.find(
	// 		(quiz) => quiz._id == e.target.value
	// 	);
	// 	setSelectedQuizQuestions([]);
	// 	setQuizSelected(selectedQuiz);
	// };
	// if (allResults == "not found!") {
	// 	return (
	// 		<div className="col-12 centered">
	// 			<h1> no results for this quiz have been submitted yet</h1>
	// 			<div className="col-12">
	// 				<h1>Welcome to QuizzTime</h1>
	// 				<select
	// 					name="quizez"
	// 					className="quizez"
	// 					onChange={quizToSeeResultsChosen}
	// 				>
	// 					<option>select a quiz</option>
	// 					{props.quizzes.map((quiz) => {
	// 						return <option key={quiz._id} value={quiz._id}>{quiz.name}</option>;
	// 					})}
	// 				</select>
	// 			</div>
	// 		</div>
	// 	);
	// } else if (props.quizzes) {
	// 	return (
	// 		<div className="col-12 centered">
	// 			<h1>Chosse a quizz to see student results</h1>
	// 			<select
	// 				name="quizzez"
	// 				className="quizzez"
	// 				onChange={quizToSeeResultsChosen}
	// 			>
	// 				<option value="" disabled selected hidden>
	//         select a quiz
	// 				</option>
	// 				{props.quizzes.map((quiz) => {
	// 					return <option key={quiz._id} value={quiz._id}>{quiz.name}</option>;
	// 				})}
	// 			</select>

	// 			{quizSelected && allResults && allResults !== "not found!" ? (
	// 				<div className="col-12">
	// 					<div className="result-handler col-12">
	// 						<div >
	// 							<h3>attempt number {attemptNumber + 1} </h3>
	// 							<p>(change to see if some students made multiple attempts)</p>
	// 						</div>
	// 						<div className="col-6 attempt-buttons">
	// 							<button onClick={decreaseAttemptNumber} className="quiz-button">decrease attempt number{" "}
	// 							</button>
	// 							<button onClick={increaseAttemptNumber} className="quiz-button">increase attempt number{" "}
	// 							</button>
	// 						</div>
	// 					</div>
	// 					<table>
	// 						<thead>
	// 							<tr>
	// 								<td></td>
	// 								{selectedQuizQuestions ? (
	// 									selectedQuizQuestions.map((question, index) => {
	// 										return (
	// 											<th key={index} className="col-2">
	// 												{question !== undefined ? (
	// 													<p>{question.question}</p>
	// 												) : (
	// 													<p>Loading question</p>
	// 												)}
	// 											</th>
	// 										);
	// 									})
	// 								) : (
	// 									<tr></tr>
	// 								)}
	// 							</tr>
	// 							{studentNames && quizSelected
	// 								? studentNames.filter(Boolean).map((oneName, index) => {
	// 									return (
	// 										<tr key={index}>
	// 											<td>{oneName}</td>
	// 											{selectedQuizQuestions
	// 												? selectedQuizQuestions.map((question) => {
	// 													return (
	// 														<th key={question._id}
	// 															className={findQuestionResult(
	// 																question._id,
	// 																oneName
	// 															)}
	// 														>
	// 															{question !== undefined ? (
	// 																<p>
	// 																	{findStudenAnswerResult(
	// 																		question._id,
	// 																		oneName
	// 																	)}
	// 																</p>
	// 															) : (
	// 																<p>Loading question</p>
	// 															)}
	// 														</th>
	// 													);
	// 												})
	// 												: null}
	// 										</tr>
	// 									);
	// 								})
	// 								: null}
	// 						</thead>
	// 					</table>
	// 				</div>
	// 			) : null}
	// 		</div>
	// 	);
	// } else {
	// 	return <div>no props</div>;
	// }
}
