/* eslint-disable react/prop-types */

import "./ProfileCard.css";

export const ProfileCard = ({ userData }) => {
  const blogChecker = (url) => {
    if (url.startsWith("https://" || "http://")) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  const ifAvailableChecker = (data) => {
    return data ? data : "Not Available";
  };

  const ifAvailableStylesChecker = (data) => {
    return data ? "address" : "address unavailable";
  };

  return (
    <>
      <div className="profile-card-wrapper">
        <img
          src={userData.avatar_url}
          alt="avatar of an user"
          className="user-avatar"
        />
        <div className="user-data-wrapper">
          <div className="user-name-joining-date">
            <img
              src={userData.avatar_url}
              alt="avatar of an user"
              className="inner-user-avatar"
            />
            <div className="username-data-wrapper">
              <div className="username-wrapper">
                <h2>{userData.name}</h2>
                <p className="username primary">@{userData.login}</p>
              </div>
              <div className="join-data">
                <p className="primary">Joined at</p>
                <p className="primary">{userData.created_at.slice(0, 10)}</p>
              </div>
            </div>
          </div>

          {userData.bio ? (
            <p className="user-bio primary">{userData.bio}</p>
          ) : (
            <p className="user-bio primary unavailable">This user has no bio</p>
          )}

          <div className="github-stats-wrapper">
            <div className="stats">
              <p className="stat-header">Repos</p>
              <p className="stat">{userData.public_repos}</p>
            </div>
            <div className="stats">
              <p className="stat-header">Followers</p>
              <p className="stat">{userData.followers}</p>
            </div>
            <div className="stats">
              <p className="stat-header">Following</p>
              <p className="stat">{userData.following}</p>
            </div>
          </div>
          <div className="addresses-wrapper">
            <div className={ifAvailableStylesChecker(userData.location)}>
              <img
                src="./icon-location.svg"
                alt="icon of geo location pin"
                className="addresses-icon"
              />
              <p className="primary available">
                {ifAvailableChecker(userData.location)}
              </p>
            </div>
            <div
              className={ifAvailableStylesChecker(userData.twitter_username)}
            >
              <img
                src="./icon-twitter.svg"
                alt="icon of twitter"
                className="addresses-icon"
              />
              <p className="primary ">
                {ifAvailableChecker(userData.twitter_username)}
              </p>
            </div>
            <div className={ifAvailableStylesChecker(userData.blog)}>
              <img
                src="./icon-website.svg"
                alt="icon of website link"
                className="addresses-icon"
              />
              {userData.blog ? (
                <a
                  href={blogChecker(userData.blog)}
                  className="primary available"
                  target="_blank"
                  rel="noreferrer"
                >
                  {userData.blog}
                </a>
              ) : (
                <p>Not Available</p>
              )}
            </div>
            <div className={ifAvailableStylesChecker(userData.company)}>
              <img
                src="./icon-company.svg"
                alt="icon of office building"
                className="addresses-icon"
              />
              <p className="primary available">
                {ifAvailableChecker(userData.company)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
