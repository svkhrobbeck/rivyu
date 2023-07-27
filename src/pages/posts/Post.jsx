// style
import "./Posts.scss";

// components
import { MiniSideBar, Toast } from "../../components";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { firebaseLink, imageKitLink } from "../../constants";
import { copyLink } from "../../utils/copyLink";
import YouTube from "react-youtube";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";

const Post = () => {
  const { type, id } = useParams();
  const dataRef = doc(db, type, id);

  const [isShowToast, setIsShowToast] = useState(false);
  const handleCloseSuccessToast = () => setIsShowToast(false);
  const handleOpenSuccessToast = () => setIsShowToast(true);
  const [{ image, title, tags, videoId, createdAt, description }, setData] = useState({});
  const isTrailer = type === "trailers";
  const stateText = type === "reviews" ? "maqola" : type === "trailers" ? "treyler" : "yangilik";

  const getData = useCallback(async () => {
    const data = (await getDoc(dataRef)).data();
    setData(data);
  }, [id]);

  useEffect(() => {
    onSnapshot(dataRef, getData);
  }, [getData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="post">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div className="post__wrapper container">
        <div className="post__article article-post">
          <div className="article-post__inner">
            {!!image && <span className="article-post__badge">{stateText}</span>}
            {!isTrailer ? (
              <>{!!image && <img className="article-post__image" src={image?.replace(firebaseLink, imageKitLink)} alt={title} />}</>
            ) : (
              <YouTube videoId={videoId} className="article-post__iframe" />
            )}

            <div className="article-post__time-like-wrapper">
              <time className="article-post__time" dateTime={createdAt}>
                {!!image ? createdAt : "yuklanmoqda..."}
              </time>
              <div className="article-post__buttons-wrapper">
                <button onClick={() => copyLink(handleOpenSuccessToast, handleCloseSuccessToast)} className="article-post__button">
                  <img src="/images/icon-link.svg" />
                </button>
              </div>
            </div>
            {image && (
              <>
                <h2 className="article-post__title">{title}</h2>
                <div className="article-post__descs">
                  {description.split("\n").map(desc => (
                    <p key={uuidv4()} className="article-post__desc">
                      {desc}
                    </p>
                  ))}
                </div>
                {tags.length ? (
                  <ul className="article-post__tags">
                    {tags &&
                      tags.map(tag => (
                        <li key={tag} className="article-post__tag">
                          <Link to={`/search/${tag.toLowerCase()}`}>{tag}</Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className="post__side-bar">
          <MiniSideBar arr={state.arr.filter(item => item.type === type && item.id !== id).slice(0, 6)} title={`So'nggi ${stateText}lar`} />
        </div>
      </div>
      <Toast handleClose={handleCloseSuccessToast} isOpen={isShowToast}>
        Havola nusxalandi!
      </Toast>
    </section>
  );
};

export default Post;
