import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectComponentProps {
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  list: { id: string; name: string }[];
  error?: string;
}

export function SelectComponent({
  title,
  list,
  value,
  onChange,
  error,
}: SelectComponentProps) {
  return (
    <Fragment>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="min-w-[70px] w-full rounded-[5px] bg-white shadow-sm border select-none text-[12px]">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {list?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-600 text-[10px]">{error}</p>}
    </Fragment>
  );
}

// --- Multi Select Component ---

interface MultiSelectProps {
  title: string;
  list: { id: string; name: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
}

export function MultiSelect({
  title,
  list,
  value = [],
  onChange,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (id: string) => {
    if (value.includes(id)) {
      onChange?.(value.filter((v) => v !== id));
    } else {
      onChange?.([...value, id]);
    }
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between rounded-[8px] text-gray-600 font-[400] bg-white shadow-sm border text-[12px]"
          >
            {value.length > 0
              ? list
                  .filter((item) => value.includes(item.id))
                  .map((item) => item.name)
                  .join(", ")
              : title}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              className="focus:outline-none focus:ring-0 border-transparent focus:border-transparent text-[12px]"
              placeholder={`Search ${title}...`}
            />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  className="text-[12px]"
                  key={item.id}
                  onSelect={() => handleSelect(item.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(item.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-600 text-[10px] mt-[5px]">{error}</p>}
    </div>
  );
}
