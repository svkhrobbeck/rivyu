import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

function useData(db, collectionType) {
  const [data, setData] = useState([]);
  const newsCollectionRef = collection(db, collectionType);

  useEffect(() => {
    const getArr = async () => {
      const data = await getDocs(newsCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getArr();
  }, []);

  return data;
}

export default useData;
