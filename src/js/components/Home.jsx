import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [Tarea, setTarea] = useState("");
	const [Lista, setLista] = useState([]);

	const getLista = () => {
		fetch("https://playground.4geeks.com/todo/users/andylj01")
			.then(res => res.json())
			.then(data => {
				setLista(data.todos || []);
			})
			.catch(Error => console.log(Error));
	};

	
	const createUser = () => {
		fetch("https://playground.4geeks.com/todo/users/andylj01", {
			method: "POST"
		})
			.then(res => {
				if (res.status !== 201 && res.status !== 200) {
					return;
				}
			})
			.catch(Error => console.log(Error));
	};

	const addTarea = (label) => {
		fetch("https://playground.4geeks.com/todo/todos/andylj01", {
			method: "POST",
			body: JSON.stringify({
				label: label,
				done: false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => getLista())
			.catch(Error => console.log(Error));
	};

const deleteTarea = (id) => {
	fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method: "DELETE"
	})
		.then(() => getLista())
		.catch(Error => console.log(Error));
};


	useEffect(() => {
		createUser();
		getLista();
	}, []);

	return (
		<div className="lista">
			<h1 className="titulo">Mis Tareas:</h1>

			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setTarea(e.target.value)}
						value={Tarea}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (Tarea.trim() !== "") {
									addTarea(Tarea);
									setTarea("");
								}
							}
						}}
						placeholder="Añade Tareas"
					/>
				</li>

				{Lista.map((item) => (
					<li key={item.id}>
						{item.label}
						<i
							className="fa-solid fa-x"
							onClick={() => deleteTarea(item.id)} 
						></i>
					</li>
				))}
			</ul>

			<div className="numero">{Lista.length} Tasks</div>

		</div>
	);
};

export default Home;