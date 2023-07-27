import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import usePostsStore from "../store/posts.store";
import sortData from "../utils/sortData";

const usePosts = () => {
  const { setError, dispatch, setIsLoading, setCurrentPost } = usePostsStore();

  const getPosts = type => {
    const dataRef = collection(db, type);

    const fetchData = useCallback(async () => {
      setIsLoading(true);

      try {
        const data = await getDocs(dataRef);
        const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const payload = sortData(posts, "time");
        dispatch({ type, payload });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }, [type]);

    useEffect(() => {
      onSnapshot(query(dataRef), fetchData);
      fetchData();
    }, [fetchData]);
  };

  const getPost = (type, id) => {
    const postDoc = doc(db, type, id);

    const fetchData = useCallback(async () => {
      try {
        const data = await getDoc(postDoc);
        const post = data.data();
        setCurrentPost(post);
      } catch (err) {
        setError(err);
      }
    }, [id]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);
  };

  const deletePost = async (type, id, media) => {
    const postDoc = doc(db, type, id);
    const post = (await getDoc(postDoc)).data();

    if (post[media]) {
      const mediaRef = ref(storage, post[media]);
      deleteObject(mediaRef)
        .then(() => deleteDoc(postDoc))
        .catch(err => console.log(err));
    } else deleteDoc(postDoc);
    console.log("Post deleted successful");
  };

  return { getPosts, getPost, deletePost };
};

export default usePosts;
