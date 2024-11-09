"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
  startOfWeek,
  endOfWeek,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfDay,
  endOfDay,
} from "date-fns";
import { toDate, formatInTimeZone } from "date-fns-tz";
import { DateRange } from "react-day-picker";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./ui/calendar";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const dateRanges = [
  { label: "اليوم", start: new Date(), end: new Date() },
  { label: "أمس", start: subDays(new Date(), 1), end: subDays(new Date(), 1) },
  {
    label: "هذا الأسبوع",
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  },
  {
    label: "الأسبوع الماضي",
    start: subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7),
    end: subDays(endOfWeek(new Date(), { weekStartsOn: 1 }), 7),
  },
  { label: "آخر 7 أيام", start: subDays(new Date(), 6), end: new Date() },
  {
    label: "هذا الشهر",
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  },
  {
    label: "الشهر الماضي",
    start: startOfMonth(subDays(new Date(), new Date().getDate())),
    end: endOfMonth(subDays(new Date(), new Date().getDate())),
  },
  {
    label: "هذا العام",
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  },
  {
    label: "العام الماضي",
    start: startOfYear(subDays(new Date(), 365)),
    end: endOfYear(subDays(new Date(), 365)),
  },
];

const multiSelectVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-background",
        link: " underline-offset-4 hover:underline text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CalendarDatePickerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  id?: string;
  className?: string;
  date: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
  onDateSelect: (range: { from: Date; to: Date }) => void;
}

export const CalendarDatePicker = React.forwardRef<
  HTMLButtonElement,
  CalendarDatePickerProps
>(
  (
    {
      id = "calendar-date-picker",
      className,
      date,
      closeOnSelect = false,
      numberOfMonths = 2,
      yearsRange = 10,
      onDateSelect,
      variant,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedRange, setSelectedRange] = React.useState<string | null>(
      numberOfMonths === 2 ? "هذا العام" : "اليوم"
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleClose = () => setIsPopoverOpen(false);

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate =
        numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      closeOnSelect && setIsPopoverOpen(false);
    };

    const formatWithTz = (date: Date, fmt: string) =>
      formatInTimeZone(date, timeZone, fmt);

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            ref={ref}
            {...props}
            className={cn(
              "w-auto",
              multiSelectVariants({ variant, className })
            )}
            onClick={handleTogglePopover}
            suppressHydrationWarning
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {date?.from ? (
                date.to ? (
                  <>
                    <span>{formatWithTz(date.from, "dd MMM, yyyy")}</span>
                    {" - "}
                    <span>{formatWithTz(date.to, "dd MMM, yyyy")}</span>
                  </>
                ) : (
                  <span>{formatWithTz(date.from, "dd MMM, yyyy")}</span>
                )
              ) : (
                <span>حدد التاريخ</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        {isPopoverOpen && (
          <PopoverContent
            dir="rtl" // Setting RTL direction
            className="w-[620px]"
            align="start"
            avoidCollisions={false}
            onInteractOutside={handleClose}
            onEscapeKeyDown={handleClose}
            style={{
              maxHeight: "var(--radix-popover-content-available-height)",
              overflowY: "auto",
            }}
          >
            <div className="flex">
              {numberOfMonths === 2 && (
                <div className="flex flex-col gap-1 pl-4 text-right border-l border-foreground/10">
                  {dateRanges.map(({ label, start, end }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "justify-start hover:bg-primary/90 hover:text-background",
                        selectedRange === label &&
                          "bg-primary text-background hover:bg-primary/90 hover:text-background"
                      )}
                      onClick={() => selectDateRange(start, end, label)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => {
                    if (range && range.from && range.to) {
                      onDateSelect({ from: range.from, to: range.to });
                    }
                  }}
                  numberOfMonths={numberOfMonths}
                  showOutsideDays={false}
                  className={className}
                />
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    );
  }
);

CalendarDatePicker.displayName = "CalendarDatePicker";
