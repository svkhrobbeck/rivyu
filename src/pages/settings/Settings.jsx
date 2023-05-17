// style
import "./Settings.scss";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteUser } from "firebase/auth";
import { db, storage } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { doc, updateDoc } from "firebase/firestore";

export default function Settings() {
  const { state, dispatch } = useContext(Context);
  const [image, setImage] = useState(state.currentUser.image || null);
  const [media, setMedia] = useState(null);
  const [fullName, setFullName] = useState(state.currentUser.name || "");
  const navigate = useNavigate();

  if (!Object.keys(state.currentUser).length) {
    window.location.pathname = "/";
  }
  const oldImageRef = ref(storage, image);

  const deleteOldImage = () => {
    deleteObject(oldImageRef).then(() => {
      console.log("Old profile pic deleted successful");
    });
    setImage(null);
  };

  const setProfileData = async () => {
    if (!state.isAuth || !localStorage.getItem("$U$I$D$")) return;
    const updateRef = doc(db, "users", "users");

    if (media !== null) {
      const mediaRef = ref(storage, `profiles/${media.name + uuidv4()}`);
      try {
        const uploadTask = uploadBytesResumable(mediaRef, media);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (state.isAdmin) {
                const idx = state.users.admins.findIndex(
                  (item) => item.uid === state.currentUser.uid
                );
                const arr = [...state.users.admins];
                arr.splice(idx, 1);
                updateDoc(updateRef, {
                  admins: [
                    ...arr,
                    {
                      ...state.currentUser,
                      name: fullName,
                      image: downloadURL,
                    },
                  ],
                });
              } else {
                const idx = state.users.users.findIndex(
                  (item) => item.uid === state.currentUser.uid
                );
                const arr = [...state.users.users];
                arr.splice(idx, 1);
                updateDoc(updateRef, {
                  users: [
                    ...arr,
                    {
                      ...state.currentUser,
                      name: fullName,
                      image: downloadURL,
                    },
                  ],
                });
              }

              // currentUser
              dispatch({
                type: "GET_USER",
                payload: {
                  ...state.currentUser,
                  name: fullName,
                  image: downloadURL,
                },
              });
            });
          }
        );
      } catch {
        console.log("error");
      } finally {
        console.log("image uploaded");
      }
      if (image !== null) {
        deleteObject(oldImageRef).then(() => {
          console.log("Old profile pic deleted successful");
        });
      }
    } else {
      if (state.isAdmin) {
        const idx = state.users.admins.findIndex(
          (item) => item.uid === state.currentUser.uid
        );
        const arr = [...state.users.admins];
        arr.splice(idx, 1);
        await updateDoc(updateRef, {
          admins: [...arr, { ...state.currentUser, name: fullName, image }],
        });
      } else {
        const idx = state.users.users.findIndex(
          (item) => item.uid === state.currentUser.uid
        );
        const arr = [...state.users.users];
        arr.splice(idx, 1);
        await updateDoc(updateRef, {
          users: [...arr, { ...state.currentUser, name: fullName, image }],
        });
      }
      // currentUser
      dispatch({
        type: "GET_USER",
        payload: {
          ...state.currentUser,
          name: fullName,
          image,
        },
      });
    }
    navigate("/");
    dispatch({ type: "IS_UPDATED" });
  };

  const deletingUser = async () => {
    if (!user) return;
    const fileRef = ref(storage, user.photoURL);
    if (user.photoURL) {
      deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    }
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="settings container">
      <h2 className="settings__title">Sozlamalar</h2>
      <form className="form-settings">
        <div className="form-settings__inner">
          <div className="form-settings__image-wrapper">
            {!media && (
              <img
                className="form-settings__image"
                src={image ? image : "/images/temp-image.svg"}
                alt="profile image"
                width={130}
                height={130}
              />
            )}
            {media && (
              <img
                className="form-settings__image"
                src={
                  media ? URL.createObjectURL(media) : "/images/temp-image.svg"
                }
                alt="profile image"
                width={130}
                height={130}
              />
            )}
          </div>
          <div className="form-settings__fields">
            <input
              className="main-field form-settings__field"
              type="text"
              name="full_name"
              placeholder="Ismingizni kiriting!"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName === null ? "" : fullName}
            />
            <input
              className="form-settings__file visually-hidden"
              type="file"
              accept="image/*"
              id="settings-image-input"
              onChange={(e) => setMedia(e.target.files[0] || null)}
            />
            <label
              className="main-field form-settings__file-label"
              htmlFor="settings-image-input"
            >
              {media ? "rasm tanlandi" : "rasm yuklang"}
            </label>
          </div>
        </div>
        <div className="form-settings__buttons">
          <button
            className="button button--green button--block"
            type="button"
            onClick={setProfileData}
          >
            Saqlash
          </button>
          <button
            onClick={deleteOldImage}
            className="button button--green"
            type="button"
          >
            Profil rasmini o'chirish
          </button>
          <button
            onClick={deletingUser}
            className="button button--block"
            type="button"
          >
            Hisobni o'chirish
          </button>
        </div>
      </form>
    </section>
  );
}
