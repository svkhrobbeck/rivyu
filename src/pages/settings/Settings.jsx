import "./Settings.scss";
import { deleteUser, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings({ isAuth }) {
  const user = auth.currentUser;
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      setFullName(displayName);
      setImage(photoURL);
    }
  }, []);

  const setProfileData = () => {
    if (!isAuth || localStorage.getItem("")) return;
    const mediaRef = ref(storage, `profiles/${media.name + uuidv4()}`);
    const desertRef = ref(storage, image);

    if (media !== null) {
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
              updateProfile(user, {
                displayName: fullName,
                photoURL: downloadURL,
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
        deleteObject(desertRef).then(() => {
          console.log("File deleted successfully");
        });
      }
    } else {
      updateProfile(user, {
        displayName: fullName,
        photoURL: image,
      });
    }
    navigate("/");
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
        // console.log("something went wrong!");
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
              onChange={(e) => setMedia(e.target.files[0])}
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
