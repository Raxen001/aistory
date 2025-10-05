import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dropdown({ onChange }) {
  const [layout, setLayout] = React.useState("paginated");

  const handleChange = (value) => {
    setLayout(value);
    onChange?.(value);
  };

  return (
    <Select  value={layout}  onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select layout" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Layout</SelectLabel>
          <SelectItem value="paginated">Paginated</SelectItem>
          <SelectItem value="scrolled">Scrolled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
