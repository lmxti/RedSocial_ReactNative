import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const CircleInfoIcon = (props) => (
  <FontAwesome6 name="circle-info" size={24} color="white" {...props} />
);


export const HomeIcon = (props) => (
  <FontAwesome name="home" size={24} color="white" {...props} />
);

export const InfoIcon = (props) => (
  <FontAwesome name="info" size={24} color="white" {...props} />
);

export const ProfileIcon = (props) => (
  <FontAwesome name="user-circle" size={24} color="white" {...props} />
);

export const MessageIcon = (props) => (
  <FontAwesome6 name="message" size={24} color="black" {...props} />
);

export const SearchIcon = (props) => (
  <FontAwesome name="search" size={24} color="black" {...props} />
);

export const AddPhoto = (props) => (
  <MaterialIcons name="add-a-photo" size={24} color="black" {...props} />
);

export const Clear = (props) => (
  <MaterialIcons name="clear" size={24} color="black" {...props} />
);

export const Send = (props) => {
  return <MaterialIcons name="send" size={24} color="white" {...props} />;
};

export const Logout = (props) => {
  return <MaterialIcons name="logout" size={24} color="white" {...props} />
}