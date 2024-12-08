import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalPages = 10 }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const active = parseInt(searchParam.get("page")) || 1;

  function updateSearchParams(val) {
    const searchParams = new URLSearchParams(searchParam);
    searchParams.set("page", val);
    setSearchParam(searchParams);
  }
  const next = () => {
    if (active === totalPages) return;

    updateSearchParams(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    updateSearchParams(active - 1);
  };

  return (
    <div className="flex items-center gap-8 my-5">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
