import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  disabled?: boolean;
  isDisabled?: boolean;
  filter?: string;
  filter1?: string;
  options: {
    id: any;
    label: string;
    value: string;
    asset_Number_class?: any;
    asset_Number_subclass?: any;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onSelect?: (selectedValue: string | undefined) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  disabled,
  isDisabled,
  filter,
  filter1,
  options,
  onSelect,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValue = column?.getFilterValue() as string | undefined;

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesFilter = filter
        ? option.asset_Number_class?.toString() === filter.toString()
        : true;
      const matchesFilter1 = filter1
        ? option.asset_Number_subclass?.toString() === filter1.toString()
        : true;
      return matchesFilter && matchesFilter1;
    });
  }, [filter, filter1, options]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed dark:border-gray-600 text-black dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          disabled={isDisabled}
        >
          <PlusCircledIcon className="ml-2 h-4 w-4 text-black dark:text-white" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              {/* Mobile View: Show selected value in a badge */}
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {
                  filteredOptions.find(
                    (option) => option.value === selectedValue
                  )?.label
                }
              </Badge>
              {/* Larger Screens: Show selected value */}
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {
                    filteredOptions.find(
                      (option) => option.value === selectedValue
                    )?.label
                  }
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-lg"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={title}
            className="text-black dark:text-white bg-gray-100 dark:bg-gray-700 border-none"
          />
          <CommandList>
            <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSelectedValue = isSelected
                        ? undefined
                        : option.value;
                      column?.setFilterValue(newSelectedValue);

                      if (onSelect) {
                        onSelect(newSelectedValue);
                      }
                    }}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-md px-2 py-1"
                  >
                    <div
                      className={cn(
                        "ml-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="ml-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined);
                      if (onSelect) {
                        onSelect(undefined);
                      }
                    }}
                    className="justify-center text-center hover:bg-red-100 dark:hover:bg-red-700 transition-all duration-200 rounded-md px-2 py-1"
                  >
                    مسح المرشحات
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
