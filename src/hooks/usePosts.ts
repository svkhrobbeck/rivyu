// hooks
import { useCallback, useEffect } from "react";
// firebase
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";
// store
import usePostsStore from "@store/posts.store";
// interface
import { IPost } from "@interfaces/posts.interface";

const usePosts = () => {
  const { setError, setPosts, setIsLoading, setPost } = usePostsStore();

  const getPosts = (type: string) => {
    const dataRef = collection(db, type);

    const fetchData = useCallback(async () => {
      setIsLoading(true);

      try {
        const data = await getDocs(dataRef);
        const posts: IPost[] = data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IPost[];
        const payload = posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(payload);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, [type]);

    useEffect(() => {
      onSnapshot(query(dataRef), fetchData);
      fetchData();
    }, [fetchData]);
  };

  const getPost = (type: string, id: string) => {
    const postDoc = doc(db, type, id);

    const fetchData = useCallback(async () => {
      try {
        const data = await getDoc(postDoc);
        const post = data.data() as IPost;
        setPost(post);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      }
    }, [id]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);
  };

  const deletePost = async (type: string, id: string, media?: keyof IPost) => {
    const postDoc = doc(db, type, id);
    const post = (await getDoc(postDoc)).data() as IPost;
    const mediaData = post[media as keyof IPost];

    if (mediaData) {
      const mediaRef = ref(storage, mediaData as string);
      deleteObject(mediaRef)
        .then(() => deleteDoc(postDoc))
        .catch(err => console.log(err));
    } else deleteDoc(postDoc);
    console.log("Post deleted successful");
  };

  return { getPosts, getPost, deletePost };
};

export default usePosts;
