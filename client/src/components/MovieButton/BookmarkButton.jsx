export function BookmarkButton() {
  return (
    <button className="flex items-center justify-center bg-[#1E2A47] rounded-full p-[15px] hover:bg-[#253d60] transition-all duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M17 3h-2V1H9v2H7c-1.1 0-1.99.9-1.99 2L5 21l7-4 7 4V5c0-1.1-.9-2-2-2z" />
      </svg>
    </button>
  );
}