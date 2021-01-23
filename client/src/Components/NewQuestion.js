import React, { useState } from "react";
import Navbar from "./Navbar";
import { FormGroup } from "reactstrap";
import Modal from "../Modal/Modal";
export default function NewQuestion() {
	
	const [modalText, setModalText] = useState(null);
	const [noAnswerModalText, setNoAnswerModalText] = useState(null);
	const [questionToSet, setQuestionToSet] = useState({
		question: "",
		description: "",
		answers: {
			answer_a: "",
			answer_b: "",
			answer_c: "",
			answer_d: "",
			answer_e: "",
			answer_f: "",
		},
		multiple_correct_answers: false,
		correct_answers: {
			answer_a_correct: false,
			answer_b_correct: false,
			answer_c_correct: false,
			answer_d_correct: false,
			answer_e_correct: false,
			answer_f_correct: false,
		},
		explanation: "",
		tip: "",
		tags: [],
		question_code: "",
		difficulty: "",
	});

	const [markdown, setMarkdown] = useState("");
	const questionHandler = (e) => {
		setMarkdown(e.target.value);
		setQuestionToSet({
			...questionToSet,
			question: e.target.value,
		});
	};
	const submitionProcess = () => {
		fetch("/api/question", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(questionToSet),
		})

			.then((response) => {
				response.json();
				if (response.statusText == "OK") {
					setModalText("submitted successfully");
				} else {
					setModalText(`something went wrong error code ${response.statusText} `);
				}
			});
	};
	const codeHandler = (event) => {
		setQuestionToSet({
			...questionToSet,
			question_code: event.target.value,
		});
	};
	const tagHandler = (event) => {
		const tempTags = event.target.value.split(",");
		const lowerTags = tempTags.map((tag) => tag.toLowerCase().trim());
		setQuestionToSet({
			...questionToSet,
			tags: lowerTags,
		});
	};

	const answerHandler = (event) => {
		setQuestionToSet({
			...questionToSet,
			answers: {
				...questionToSet.answers,
				[event.target.name]: event.target.value,
			},
		});
	};
	const refreshPage = () => {
		location.reload();
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (questionToSet.answers.answer_a === ""
			&& questionToSet.answers.answer_b === ""
			&& questionToSet.answers.answer_c === ""
			&& questionToSet.answers.answer_d === ""
			&& questionToSet.answers.answer_e === ""
			&& questionToSet.answers.answer_f === ""
		) {
			setNoAnswerModalText("write down some answers");
		} else if (
			questionToSet.correct_answers.answer_a_correct === false
			&& questionToSet.correct_answers.answer_b_correct === false
			&& questionToSet.correct_answers.answer_c_correct === false
			&& questionToSet.correct_answers.answer_d_correct === false
			&& questionToSet.correct_answers.answer_e_correct === false
			&& questionToSet.correct_answers.answer_f_correct === false
		) {
			setNoAnswerModalText("check the boxes near correct answers");
		} else {
			submitionProcess();
		}

		// setModalText("submitted");


	};


	const answerCheck = (event) => {
		setQuestionToSet({
			...questionToSet,
			correct_answers: {
				...questionToSet.correct_answers,
				[event.target.name]: event.target.checked ? true : false,
			},
		});
	};

	return (
		<div >
			<Navbar mentors="Mentors" results="Results" newquestion="New Question" />
			<div className="row formPage margin-body">
				<form className="survey-form col-8" id="newQuestionForm" onSubmit={submitHandler} >
					<textarea onKeyUp={codeHandler} className="text-area" placeholder="Code illustration" />
					<textarea onKeyUp={questionHandler} className="text-area" required placeholder="Question text use markdown" />

					<div className="formLeftAlign">
						<FormGroup className="form-element">
							<input
								type="text"
								className="tagField col-12"
								onKeyUp={tagHandler}
								placeholder="Tags, coma separated *required"
								name="answer_a"
								required
							/>

						</FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer a"
								name="answer_a"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_a_correct"}
								onChange={answerCheck}
							/></FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer b"
								name="answer_b"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_b_correct"}
								onChange={answerCheck}
							/>
						</FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer c"
								name="answer_c"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_c_correct"}
								onChange={answerCheck}
							/>
						</FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer d"
								name="answer_d"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_d_correct"}
								onChange={answerCheck}
							/>
						</FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer e"
								name="answer_e"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_e_correct"}
								onChange={answerCheck}
							/>
						</FormGroup>
						<FormGroup className="form-element">
							<input
								type="text"
								onKeyUp={answerHandler}
								placeholder="answer f"
								name="answer_f"
							/>
							<input className="checkB"
								type="checkbox"
								name={"answer_f_correct"}
								onChange={answerCheck}
							/>
						</FormGroup>

					</div>
					<button className="btn btn-secondary" > Submit question</button>
				</form>
				{modalText ? <Modal modalText={modalText} setModalText={setModalText} func={refreshPage} close={false} /> : null}
				{noAnswerModalText ? <Modal modalText={noAnswerModalText} setModalText={setNoAnswerModalText} close={true} /> : null}

			</div></div>
	);
}
