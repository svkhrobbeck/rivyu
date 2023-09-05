// styles
import "./Pagination.scss";
// fc
import { FC } from "react";
// hook
import useParams from "@helpers/useParams";
// components
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "@helpers/constants";
// store
import usePostsStore from "@store/posts.store";

const Paginations: FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total } = usePostsStore();
  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = (e: { selected: number }) => {
    setSearchParams(useParams(searchParams, "page", e.selected + 1));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< avvalgi"
      nextLabel="keyingi >"
      renderOnZeroPageCount={null}
      className="pagination"
      activeClassName="pagination__item--active"
      activeLinkClassName="pagination__link--active"
      disabledClassName="pagination__disabled"
      disabledLinkClassName="pagination__disabled-link"
      previousClassName="pagination__previous"
      previousLinkClassName="pagination__previous-link"
      nextClassName="pagination__next"
      nextLinkClassName="pagination__previous-link"
      pageClassName="pagination__item"
      pageLinkClassName="pagination__link"
      breakClassName="pagination__item pagination__item--break"
      breakLinkClassName="pagination__link"
      initialPage={+(searchParams.get("page") || 0) - 1}
    />
  );
};

export default Paginations;
