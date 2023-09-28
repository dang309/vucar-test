// hooks
import useAuth from "../hooks/useAuth";
import createAvatar from "../utils/createAvatar";

//
import { MAvatar } from "./@material-extend";

// ----------------------------------------------------------------------

const MyAvatar = ({ ...other }) => {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.username}
      color={user?.photoURL ? "default" : createAvatar(user?.username)?.color}
      {...other}
    >
      {createAvatar(user?.username)?.name}
    </MAvatar>
  );
};

export default MyAvatar;
