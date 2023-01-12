

function UserProfile(props) {
  return (
    <div>
      <img
        alt={props.firstName + " " + props.lastName}
        src={props.pictureUrl}
      />

      <h2>{props.firstName + " " + props.lastName}</h2>
    </div>
  );
}

export default UserProfile