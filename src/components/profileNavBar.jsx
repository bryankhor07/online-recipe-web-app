import BackButtonImg from "../photos/ProfileBackbutton.png";
import { useGetCurrentUserInfo } from "../hooks/useGetCurrentUserInfo";
import "./profileNavBar.css";

export default function ProfileNavBar(props) {
  const { userID } = useGetCurrentUserInfo();

  return (
    <div className="profile-navbar">
      <button className="back-btn" onClick={props.goBack}>
        <img src={BackButtonImg} alt="Back Button" className="back-btn-img" />
      </button>
      <h1 className="profile-title">{props.profileInfoData.name}'s Profile</h1>
      {userID === props.profileInfoData.userID ? (
        <button className="save-changes-btn" onClick={props.saveChanges}>
          {props.editProfile ? "Save Changes" : "Edit Profile"}
        </button>
      ) : (
        <div className="save-changes-placeholder"></div>
      )}
    </div>
  );
}
