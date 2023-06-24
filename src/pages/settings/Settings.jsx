// style
import "./Settings.scss";

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import { auth, db, storage } from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { getLocalStorage, removeLocalStorage } from "../../utils/SetGetLocalStorage";
import { useEffect } from "react";
import { firebaseLink, imageKitLink } from "../../constants";

const Settings = () => {
  const { state } = useContext(Context);
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [role, setRole] = useState("admins");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [fullName, setFullName] = useState("");
  const oldImageRef = ref(storage, image);
  const usersRef = doc(db, "users", "users");

  const getData = async () => {
    const users = (await getDoc(usersRef)).data();
    const arr = [...users.users, ...users?.admins];
    const user = arr.find(item => item.uid === getLocalStorage("$U$I$D$"));

    // sets
    setUser(user);
    setImage(user?.image || null);
    setFullName(user?.name || "");
    setRole(user?.isAdmin ? "admins" : "users");
  };

  useEffect(() => {
    onSnapshot(usersRef, getData);
  }, []);

  const deleteOldImage = (state = true) => {
    deleteObject(oldImageRef).then(() => {
      console.log("Old profile pic deleted successful");
    });
    if (state) setImage(null);
  };

  const setProfileData = async () => {
    if (!state.isAuth || !getLocalStorage("$U$I$D$")) return;

    if (!!media) {
      const mediaRef = ref(storage, `profiles/${media.name + uuidv4()}`);
      try {
        const uploadTask = uploadBytesResumable(mediaRef, media);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          error => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(image => {
              updateDoc(usersRef, { [role]: [...state.users[role].filter(item => item.uid !== user.uid), { ...user, name: fullName, image }] });
            });
          }
        );
      } finally {
        console.log("image uploaded");
      }
      if (!!image) deleteOldImage(false);
    } else {
      updateDoc(usersRef, { [role]: [...state.users[role].filter(item => item.uid !== user.uid), { ...user, name: fullName, image }] });
    }
    navigate("/");
  };

  const deletingUser = async () => {
    onAuthStateChanged(auth, user => {
      if (!user) return;
      const fileRef = ref(storage, user.photoURL);
      if (user.photoURL) {
        deleteObject(fileRef)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch(() => {
            console.log("Something went wrong");
          });
      }
      deleteUser(user)
        .then(() => {
          console.log("User deleted");
          removeLocalStorage("$T$O$K$E$N$");
          removeLocalStorage("$U$I$D$");
          navigate("/login");
        })
        .catch(err => console.log(err));
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
                src={image ? image?.replace(firebaseLink, imageKitLink) : "/images/temp-image.svg"}
                alt="profile image"
                width={130}
                height={130}
              />
            )}
            {media && (
              <img
                className="form-settings__image"
                src={media ? URL.createObjectURL(media) : "/images/temp-image.svg"}
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
              onChange={e => setFullName(e.target.value)}
              value={fullName === null ? "" : fullName}
            />
            <input
              className="form-settings__file visually-hidden"
              type="file"
              accept="image/*"
              id="settings-image-input"
              onChange={e => setMedia(e.target.files[0] || null)}
            />
            <label className="main-field form-settings__file-label" htmlFor="settings-image-input">
              {media ? "rasm tanlandi" : "rasm yuklang"}
            </label>
          </div>
        </div>
        <div className="form-settings__buttons">
          <button className="button button--green button--block" type="button" onClick={setProfileData}>
            Saqlash
          </button>
          <button onClick={deleteOldImage} className="button button--green" type="button">
            Profil rasmini o'chirish
          </button>
          <button onClick={deletingUser} className="button button--blue" type="button">
            Hisobni o'chirish
          </button>
        </div>
      </form>
    </section>
  );
};

export default Settings;
