import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

const useCollection = (queryRef) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  if (!queryRef) {
    setData([]);
    setLoading(false);
    return;
  }

    setLoading(true);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setData(result);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [queryRef]);

  return {
    data,
    loading,
    error,
  };
};

export default useCollection;