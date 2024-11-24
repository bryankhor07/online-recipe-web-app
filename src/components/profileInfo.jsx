import "./profileInfo.css";

export default function ProfileInfo(props) {
  return (
    <div className="profile-info">
      <div className="profile-info-left-section">
        <img
          src={props.profileInfoData.profilePhoto}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="profile-info-right-section">
        <div className="field-container">
          <label className="name-label">Name:</label>
          <p className="name-p">{props.profileInfoData.name}</p>
        </div>
        <div className="field-container">
          <label className="bio-label">Bio:</label>
          {props.editProfile ? (
            <input
              type="text"
              name="bio"
              className="bio-input"
              placeholder={props.profileInfoData.bio}
              onChange={props.handleChange}
              value={props.profileInfoData.bio}
            />
          ) : (
            <p className="bio-p">{props.profileInfoData.bio}</p>
          )}
        </div>
        <div className="field-container">
          <label className="cooking-experience-label">
            Cooking Experience:
          </label>
          {props.editProfile ? (
            <input
              type="text"
              name="cookingExperience"
              className="cooking-experience-input"
              placeholder={props.profileInfoData.cookingExperience}
              onChange={props.handleChange}
              value={props.profileInfoData.cookingExperience}
            />
          ) : (
            <p className="cooking-experience-p">
              {props.profileInfoData.cookingExperience}
            </p>
          )}
        </div>
        <div className="field-container">
          <label className="favorite-cuisine-label">Favorite Cuisine:</label>
          {props.editProfile ? (
            <input
              type="text"
              name="favoriteCuisine"
              className="favorite-cuisine-input"
              placeholder={props.profileInfoData.favoriteCuisine}
              onChange={props.handleChange}
              value={props.profileInfoData.favoriteCuisine}
            />
          ) : (
            <p className="favorite-cuisine-p">
              {props.profileInfoData.favoriteCuisine}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
