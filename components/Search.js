import { MdOutlineShortText } from 'react-icons/md'

export default function Search({ search, setSearch }) {
  return (
    <div
      className="flex max-w-[1150px] items-center rounded-full border-2
     border-[#333333] bg-[#1A1A1A] p-1.5 px-5 pr-8"
    >
      <div className="mr-4 h-4 w-4 flex-shrink-0 animate-pulse rounded-full border-2" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-14 border-none bg-[#1A1A1A] text-xs text-white
         placeholder-[#FAFAFA] outline-none focus:ring-0 md:w-full lg:w-full"
        placeholder="Search..."
      />

      <div className="ml-auto flex items-center divide-x-2 divide-dotted divide-[#333333]">
        <div className="hidden space-x-2 pr-5 md:flex lg:flex">
          <button className="tag">Minimal</button>
          <button className="tag">House</button>
          <button className="tag">Minimal</button>
        </div>

        <div className="flex items-center space-x-1.5 pl-4 text-[#CECECE]">
          <MdOutlineShortText className="animate-pulse text-2xl" />
          <span className="text-sm font-medium">Filters</span>
        </div>
      </div>
    </div>
  )
}
