import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { User } from "../../models/user";
import {
  MovieInput,
  addMovie,
  deleteAccount,
  getLoggedInUser,
  logout,
  updateUserInfo,
} from "../../network/backend-api";

interface ButtonProps {
  variant?: "delete" | "cancel";
}
// Button component to avoid repeated styles
const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 999px;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.variant === "delete"
      ? `
        background-color: #dc3545;

        &:hover {
          background-color: #c82333;
        }
      `
      : props.variant === "cancel"
      ? `
        background-color: #ddd;
        color: black;

        &:hover {
          background-color: #ccc;
        }
      `
      : `
        background-color: #0077cc;

        &:hover {
          background-color: #005ea3;
        }
      `}
`;

interface MyProfileProps {
  loggedInUser: User | null;
}
interface MyProfileProps {
  loggedInUser: User | null;
}

const MyProfile: React.FC<MyProfileProps> = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const user = props.loggedInUser;
  const [loggedInUser, setLoggedInUser] = useState(user ? user.user! : null);

  const navigate = useNavigate();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);
  // useEffect(() => {
  //   // setLoggedInUser(user);
  // }, [user]);

  // Avoid unnecessary rendering
  if (!loggedInUser) {
    navigate("/login");
    return null;
  }
  const handleEditSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const updated = await updateUserInfo(loggedInUser!.id, updatedUser);
      setLoggedInUser(updated);
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMovieSubmit = async () => {
    try {
      const newMovie = await addMovie({
        title: "Inception",
        director: "Christopher Nolan",
        yearReleased: 2010,
        actors: [
          "Leonardo DiCaprio",
          "Tom Hardy",
          "Ellen Page",
          "Joseph Gordon-Levitt",
          "Ken Watanabe",
          "Dileep Rao",
          "Cillian Murphy",
          "Tom Berenger",
          "Marion Cotillard",
        ],
        genre: "Action, Sci-Fi, Thriller",
        duration: 148,
        language: "English",
        poster:
          "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        description:
          "A skilled thief, Cobb, is offered a chance to regain his old life as payment for a task that requires him to enter the dreams of a target and plant an idea in his mind. To accomplish this, Cobb and his team must navigate through layers of dreams within dreams, and face challenges from the target's subconscious mind. As the mission grows more complex, Cobb's own past begins to interfere with the team's success, leading to unexpected twists and turns.",
      });
      setShowConfirmationDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (deleteConfirmation === "DELETE") {
      try {
        console.log("User prop:", loggedInUser);
        await deleteAccount(loggedInUser!.id);
        setShowDeleteModal(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <ProfileHeading>{loggedInUser.username}'s Profile</ProfileHeading>
      <ProfileInfo>
        <ProfileLabel>Email:</ProfileLabel> {loggedInUser.email}
      </ProfileInfo>
      <ProfileInfo>
        <ProfileLabel>Admin:</ProfileLabel>{" "}
        {loggedInUser.isAdmin ? "Yes" : "No"}
      </ProfileInfo>
      {loggedInUser.isAdmin && (
        <Button onClick={() => handleMovieSubmit()}>Add Movie</Button>
      )}
      <Button onClick={() => setShowEditModal(true)}>Edit Profile</Button>
      <Button onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
      <Button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>

      {/* Edit User Modal */}
      <StyledModal isOpen={showEditModal} ariaHideApp={false}>
        <ModalHeading>Edit Profile</ModalHeading>
        <form onSubmit={handleEditSubmit}>
          <FormLabel htmlFor="username">Username:</FormLabel>
          <FormInput
            id="username"
            type="text"
            value={updatedUser.username || loggedInUser.username}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, username: e.target.value })
            }
          />
          {/* <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            id="email"
            type="email"
            value={updatedUser.email || loggedInUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            id="password"
            type="password"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, password: e.target.value })
            }
          /> */}
          <Button type="submit">Submit</Button>
          <Button
            variant="cancel"
            type="button"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </Button>
        </form>
      </StyledModal>

      <StyledModal isOpen={showDeleteModal} ariaHideApp={false}>
        <ModalHeading>Delete Account</ModalHeading>
        <ModalText>Are you sure you want to delete your account?</ModalText>
        <ModalText>Type "DELETE" to confirm:</ModalText>
        <FormLabel htmlFor="deleteConfirmation">Delete Confirmation:</FormLabel>
        <FormInput
          id="deleteConfirmation"
          type="text"
          value={deleteConfirmation}
          onChange={(e) => setDeleteConfirmation(e.target.value)}
        />
        <Button variant="delete" onClick={handleDeleteSubmit}>
          Delete
        </Button>
        <Button variant="cancel" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
      </StyledModal>
      {showConfirmationDialog && (
        <StyledModal isOpen={showConfirmationDialog} ariaHideApp={false}>
          <ModalHeading>Movie Added</ModalHeading>
          <ModalText>The movie has been successfully added.</ModalText>
          <Button onClick={handleConfirmationDialogClose}>Close</Button>
        </StyledModal>
      )}
    </Container>
  );
};
const Container = styled.div`
  min-height: calc(100vh - 160px);
  padding: 0 calc(3.5vw + 5px);
`;
// Update FormLabel style
const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #0077cc; // change color to a dark blue
`;

// Update StyledModal style
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #16262e; // change color to a light grey
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  outline: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // add a subtle shadow
`;
const ProfileHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProfileInfo = styled.p`
  margin-bottom: 0.5rem;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
`;

const ModalHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ModalText = styled.p`
  margin-bottom: 0.5rem;
`;

const ModalInput = styled(FormInput)`
  margin-bottom: 1rem;
`;
export {
  Container,
  ProfileHeading,
  ProfileInfo,
  ProfileLabel,
  Button,
  ModalHeading,
  FormLabel,
  FormInput,
  ModalText,
  ModalInput,
};
export default MyProfile;
