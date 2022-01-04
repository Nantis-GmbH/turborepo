import * as React from "react";
import { BackendStack } from "../aws-config.json";
import { useState } from "react";

function App() {
  const sayHello = (
    name: string
  ): Promise<{
    message: string;
  }> => {
    return fetch(`${BackendStack.HttpApiUrl}hello?name=${name}`).then(
      (response) => response.json()
    );
  };

  const [name, setName] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await sayHello(name);
      setApiResponse(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    setApiResponse(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Turborepo AWS-CDK Frontend</h1>

        {apiResponse === null && (
          <form onSubmit={handleSubmit}>
            <label>
              <p>Tell the backend who you are:</p>
              <input type="text" value={name} onChange={handleChange} />
            </label>

            <input type="submit" value="Say hello to the backend" />
          </form>
        )}

        {apiResponse !== null && (
          <>
            <p>The backend responded with:</p>
            <p>{apiResponse}</p>

            <button onClick={reset}>Reset</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
