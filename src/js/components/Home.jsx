import React,{useState}from "react";

//create your first component
const Home = () => {
	const [Tarea,setTarea]=useState("")
	const [Lista,setLista]=useState([])

	return (
		<div className="lista">
          <h1 className="titulo">Mis Tareas:</h1>
         <ul>
			<li>
			<input type="text"
            onChange={(e)=>setTarea(e.target.value)}
			value={Tarea}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					if (Tarea.trim() !== "") {
						setLista([...Lista, Tarea]);
						setTarea("");
					}
				}
			}}
			placeholder="Añade Tareas"></input></li>
			{Lista.map((item,index)=>
			<li key={index}>
				{item} 
				<i className="fa-solid fa-x" 
				onClick={() => setLista(Lista.filter((_, i) => i !== index))}></i>
			</li>)}
		 </ul>
	      <div className="numero">{Lista.length} Tasks</div>
		</div>
	);
};

export default Home;