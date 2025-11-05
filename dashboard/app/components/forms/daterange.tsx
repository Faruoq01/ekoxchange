"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

type FormattedRange = {
  from: string | null;
  to: string | null;
};

type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: FormattedRange) => void;
  className?: string;
};

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const currentYear = new Date().getFullYear();

  // Default range: Jan 1 to Dec 31 of current year
  const defaultRange: DateRange = {
    from: new Date(`${currentYear}-01-01`),
    to: new Date(`${currentYear}-12-31`),
  };

  const [date, setDate] = React.useState<DateRange>(value || defaultRange);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    setDate(range);

    if (range?.from) {
      const formatted: FormattedRange = {
        from: format(range.from, "yyyy-MM-dd"),
        to: range.to ? format(range.to, "yyyy-MM-dd") : null,
      };
      onChange?.(formatted);
    }
  };

  const displayDate = () => {
    if (date?.from && date?.to) {
      return `${format(date.from, "MMM d, yyyy")} → ${format(
        date.to,
        "MMM d, yyyy"
      )}`;
    }
    if (date?.from) {
      return format(date.from, "MMM d, yyyy");
    }
    return "Select date range";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full max-w-[250px] justify-start text-left font-medium tracking-tight",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="truncate">{displayDate()}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto p-3 rounded-2xl shadow-lg border border-gray-200 bg-background"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="rounded-lg"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
