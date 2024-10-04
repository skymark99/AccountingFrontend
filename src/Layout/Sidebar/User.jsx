import { useSelector } from "react-redux";

function User() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      {user && user?.name && (
        <div className="sideBar__user" style={{ paddingBlockStart: "1rem" }}>
          <div className="profile-card__info">
            <span className="profile-card__name">{user?.name}</span>

            <span className="profile-card__email">{user?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
