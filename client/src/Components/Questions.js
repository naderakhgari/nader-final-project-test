import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import Modal from "../Modal/Modal";
const Questions = (props) => {

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [isChecked, setIsChecked] = useState(false);
	const [radioId, setRadioId] = useState("");
	const [route, setRoute] = useState("");
	const [postData, setPostData] = useState({});
	const [modalText, setModalText] = useState(null);
	const [submittedModalText, setSubmittedModalText] = useState(null);
	const [questionData, setQuestionData] = useState({});
	const [requestOption, setRequestOption] = useState({ method: "GET" });
	const [answer, setAnswer] = useState({
		question_id: props.quizData.questions_id[currentQuestionIndex],
		correct: false,
		value: "",
		quiz_id: props.quizData._id,
		timestamp: dayjs().format(),
		studentName: "",
	});

	useEffect(() => {
		fetch(`/api/question/${props.quizData.questions_id[currentQuestionIndex]}`)
			.then((res) => res.json())
			.then((data) => setQuestionData(data))
			.catch((err) => console.error(err));
		fetch(`/api/${route}`, requestOption)
			.then((res) => res.json())
			.then((data) => setPostData(data))
			.catch((err) => console.error(err));
	}, [props.quizData.questions_id[currentQuestionIndex], route, requestOption]);
	const submitionProcess = () => {
		setCurrentQuestionIndex(currentQuestionIndex + 1);
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		setAnswer({
			...answer,
			question_id: props.quizData.questions_id[currentQuestionIndex + 1],
			timestamp: dayjs().format(),
			value: "",
			correct: false,
		});
		setIsChecked(false);
	};
	const submitHandler = (e) => {
		e.preventDefault();

		if (answer.value == "") {
			setModalText("Are you sure you want to skip this question?");

		} else {
			submitionProcess();
		}
	};
	const submitForm = (event) => {
		setRoute("results");
		setRequestOption({
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(answer),
		});
		event.target.reset;
		setSubmittedModalText("Form submitted successfully");
	};
	const refreshPage = () => {
		location.reload();
	};
	const checkHandler = (e) => {
		setAnswer({
			...answer,
			value: e.target.value,
			correct: questionData.correct_answer === e.target.id,
		});
		setIsChecked(e.target.checked);
		setRadioId(e.target.id);
	};

	if (!questionData.answers) {
		return <p className="centered">There is no question to show</p>;
	}
	let {
		answer_a,
		answer_b,
		answer_c,
		answer_d,
		answer_e,
		answer_f,
	} = questionData.answers;
	const changeHandler = (e) => {
		setAnswer({
			...answer,
			studentName: e.target.value,
		});
	};

	return (
		<div>
			<Form className="survey-form" onSubmit={submitHandler}>

				<FormGroup >
					<FormGroup className="answers">
						{currentQuestionIndex == 0 ? <input
							type="text"
							placeholder="Enter your name"
							onChange={changeHandler}
							className="input"
							required
							autoFocus
						/> : null}
						{questionData.question_code ? (
							<ReactMarkdown className="code">
								{questionData.question_code}
							</ReactMarkdown>
						) : null}
						<ReactMarkdown>{questionData.question}</ReactMarkdown>
					</FormGroup>

					{answer_a ? (<FormGroup className="answers">
						<Input
							type="radio"
							name="answer"
							value={answer_a}
							onChange={checkHandler}
							id="answer_a"
							checked={isChecked && radioId == "answer_a" ? true : false}
						/>
						<Label for="answer_a">{answer_a}</Label></FormGroup>) : null}


					<FormGroup className="answers">
						{answer_b ? (
							<Input
								type="radio"
								name="answer"
								value={answer_b}
								onChange={checkHandler}
								id="answer_b"
								checked={isChecked && radioId == "answer_b" ? true : false}
							/>
						) : null}
						{answer_b ? <Label for="answer_b">{answer_b}</Label> : null}
					</FormGroup>
					<FormGroup className="answers">
						{answer_c ? (
							<Input
								type="radio"
								name="answer"
								value={answer_c}
								onChange={checkHandler}
								id="answer_c"
								checked={isChecked && radioId == "answer_c" ? true : false}
							/>
						) : null}
						{answer_c ? <Label for="answer_c">{answer_c}</Label> : null}
					</FormGroup>
					<FormGroup className="answers">
						{answer_d ? (
							<Input
								type="radio"
								name="answer"
								value={answer_d}
								onChange={checkHandler}
								id="answer_d"
								checked={isChecked && radioId == "answer_d" ? true : false}
							/>
						) : null}
						{answer_d ? <Label for="answer_d">{answer_d}</Label> : null}
					</FormGroup>
					<FormGroup className="answers">
						{answer_e ? (
							<Input
								type="radio"
								name="answer"
								value={answer_e}
								onChange={checkHandler}
								id="answer_e"
								checked={isChecked && radioId == "answer_e" ? true : false}
							/>
						) : null}
						{answer_e ? <Label for="answer_e">{answer_e}</Label> : null}
					</FormGroup>
					<FormGroup className="answers">
						{answer_f ? (
							<Input
								type="radio"
								name="answer"
								value={answer_f}
								onClick={checkHandler}
								id="answer_f"
								checked={isChecked && radioId == "answer_f" ? true : false}
							/>
						) : null}
						{answer_f ? <Label for="answer_f">{answer_f}</Label> : null}
					</FormGroup>
					<hr style={{ margin: "40px 0" }} />
				</FormGroup>
				{currentQuestionIndex < props.quizData.questions_id.length - 1
					? (
						<Button
							className="answers">
							Next</Button>
					)
					: (
						<Button type="button" className="answers" onClick={submitForm}>
							Submit
						</Button>
					)}

			</Form>
			{modalText
				? <Modal modalText={modalText} setModalText={setModalText} func={submitionProcess} />
				: null}
			{submittedModalText
				? <Modal modalText={submittedModalText} setModalText={setSubmittedModalText} func={refreshPage} close={false} />
				: null}
		</div>
	);
};

export default Questions;
