import github from "./db";
import { useCallback, useEffect, useState } from "react";
import githubQuery from "./Query";

function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        setUserName(viewer.name);
        setRepoList(viewer.repositories.nodes);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill">Repos</i>
        <p>Hey there {userName}</p>
      </h1>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <li className="list-group-item" key={repo.id.toString()}>
              <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                {repo.name}
              </a>
              <p className="small">{repo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
