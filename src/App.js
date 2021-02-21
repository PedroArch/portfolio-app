import React from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = React.useState([]);
  
  React.useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  
  
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Novo Repo",
      url: "http://github.com/novorepo",
      techs: ["Node", "Python"]
      })

      setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`)
    
      setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
