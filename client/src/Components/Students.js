import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./App.css";
// import "./grid.css";
// import Students from "./Components/Students.js";
import Mentors from "./Mentors.js";
import NewQuestion from "./NewQuestion.js";
import Results from "./Results.js";

const App = () => {
	const [questions, setQuestions] = useState(null);
	const [quizzes, setQuizzes] = useState([]);
	const [route, setRoute] = useState("");
	const [quizId, setQuizId] = useState("");
	const [code, setCode] = useState("");

	useEffect(() => {
		fetch("/api/questions")
			.then((res) => res.json())
			.then((data) => setQuestions(data))
			.catch((err) => console.error(err));
		fetch("/api/quizzes")
			.then((res) => res.json())
			.then((data) => setQuizzes(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<main role="main">
			<Router>
				<nav className="navbar">
					<Link to="/" exact="true">
						<img
							src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
							alt="cyf_brand.png"
							className="cyf-log"
						/>
					</Link>
					<Link to="/Students" exact="true" className="link-button">
            Student
					</Link>
					<Link to="/Mentors" exact="true" className="link-button">
            Mentor
					</Link>
					<Link to="/Results" exact="true" className="link-button">
            Quiz rezults
					</Link>
					<Link to="/NewQuestion" exact="true" className="link-button">
            New question
					</Link>
				</nav>
				<div className="body">
					<Switch>
						<Route exact path="/Mentors">
							<Mentors
								questions={questions}
								quizzes={quizzes}
								setRoute={setRoute}
								setQuizId={setQuizId}
								setCode={setCode}
								code={code}
							/>
						</Route>
						<Route exact path="/Results">
							<Results questions={questions} quizes={quizzes} />
						</Route>
						<Route exact path="/Students">
							{quizzes.length > 0 ? (
								<Students
									quizData={quizzes}
									route={route}
									code={code}
									setCode={setCode}
									quizId={quizId}
								/>
							) : (
								<p>There is no quiz to show</p>
							)}
						</Route>
						<Route exact path="/NewQuestion">
							<NewQuestion />
						</Route>
					</Switch>
				</div>
			</Router>
		</main>
	);
};

export default App;
