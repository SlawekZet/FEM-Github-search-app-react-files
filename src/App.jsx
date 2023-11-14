import { useEffect, useState } from "react";
import "./App.css";
import { ProfileCard } from "./components/ProfileCard/ProfileCard";
import { SearchBar } from "./components/SearchBar/SearchBar";
function App() {
  const [theme, setTheme] = useState("dark");
  const [username, setUsername] = useState("octocat");
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserFound, setIsUserFound] = useState(true);

  const handleThemeSwitch = () => {
    let newTheme = "";
    if (theme === "dark") {
      newTheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      newTheme = "dark";
      localStorage.setItem("theme", "dark");
    }
    setTheme(newTheme);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (username) {
      // eslint-disable-next-line no-inner-declarations
      async function fetchUserData(username) {
        try {
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );
          if (response.status === 404) {
            return setIsUserFound(false);
          } else if (!response.ok) {
            throw new Error("Invalid response from the network");
          }
          const data = await response.json();
          setIsUserFound(true);
          setUserData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error getting the data:", error);
        }
      }
      fetchUserData(username);
    }
  }, [username]);

  const handleUsernameUpdate = (updatedUsername) => {
    setUsername(updatedUsername);
  };

  return (
    <>
      <main>
        <div className="upper-bar">
          <p className="logotype">devfinder</p>
          <button
            className="theme-switcher theme-name"
            onClick={handleThemeSwitch}
          >
            {theme === "light" ? (
              <>
                Dark
                <img
                  src="./icon-moon.svg"
                  alt="icon of a moon"
                  className="theme-icon"
                />
              </>
            ) : (
              <>
                Light
                <img
                  src="./icon-sun.svg"
                  alt="icon of a sun"
                  className="theme-icon"
                />
              </>
            )}
          </button>
        </div>

        <SearchBar
          isUserFound={isUserFound}
          handleUsernameUpdate={handleUsernameUpdate}
        />

        {userData ? (
          isLoading === true ? (
            <p>Searching...</p>
          ) : !isUserFound ? null : (
            <ProfileCard userData={userData} />
          )
        ) : null}
      </main>
    </>
  );
}

export default App;
