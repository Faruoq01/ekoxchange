import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment, useState, useMemo } from "react";

interface SelectComponentProps {
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  list: { id: string; name: string }[];
  error?: string;
}

// Memoized individual SelectItem to avoid unnecessary re-renders
const MemoSelectItem = React.memo(
  ({ id, name }: { id: string; name: string }) => (
    <SelectItem value={id}>{name}</SelectItem>
  )
);
MemoSelectItem.displayName = "MemoSelectItem";

const SelectComponentBase = ({
  title,
  list,
  value,
  onChange,
  error,
}: SelectComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce the search term to improve typing smoothness
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 150);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Filter list based on debounced search term
  const filteredList = useMemo(() => {
    return list.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [list, debouncedSearch]);

  return (
    <Fragment>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full flex flex-row bg-white items-center text-[12px] px-[15px] py-[8px] rounded-md border">
          <SelectValue placeholder={title} />
        </SelectTrigger>

        <SelectContent>
          {/* Search Input */}
          <div
            onKeyDown={(e) => e.stopPropagation()}
            className="sticky p-0 top-0 px-[10px] py-[5px] bg-white z-10 border-b"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:outline-none focus:border-gray-300 focus:ring-0"
            />
          </div>

          <SelectGroup className="text-[12px]">
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <MemoSelectItem key={item.id} id={item.id} name={item.name} />
              ))
            ) : (
              <div className="px-2 py-1 text-gray-500 text-sm">
                No results found
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <p className="text-red-600 text-[10px]">{error}</p>}
    </Fragment>
  );
};

// Memoize the whole component so it only re-renders if props change
export const SelectComponent = React.memo(SelectComponentBase);
