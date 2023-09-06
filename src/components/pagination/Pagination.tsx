// styles
import "./Pagination.scss";
// fc
import { FC } from "react";
// hook
import useParams from "@helpers/useParams";
// components
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { limit } from "@helpers/constants";
// store
import usePostsStore from "@store/posts.store";

const Paginations: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total } = usePostsStore();
  const pageCount = Math.ceil(total / limit);
  const currentPage = +(searchParams.get("page") || 1) - 1;

  const handlePageClick = (e: { selected: number }) => {
    setSearchParams(useParams(searchParams, "page", e.selected + 1));
  };

  const paginationClassNames = {
    className: "pagination",
    activeClassName: "pagination__item--active",
    activeLinkClassName: "pagination__link--active",
    disabledClassName: "pagination__disabled",
    disabledLinkClassName: "pagination__disabled-link",
    previousClassName: "pagination__previous",
    previousLinkClassName: "pagination__previous-link",
    nextClassName: "pagination__next",
    nextLinkClassName: "pagination__next-link",
    pageClassName: "pagination__item",
    pageLinkClassName: "pagination__link",
    breakClassName: "pagination__item pagination__item--break",
    breakLinkClassName: "pagination__link",
  };

  return (
    <ReactPaginate
      {...paginationClassNames}
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel=""
      nextLabel=""
      initialPage={currentPage}
    />
  );
};

export default Paginations;
