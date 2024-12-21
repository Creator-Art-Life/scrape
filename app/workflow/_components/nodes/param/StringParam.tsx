"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import { useEffect, useId, useState } from "react";
import { ParamProps } from "@/types/appNodes";
import { Textarea } from "@/components/ui/textarea";

function StringParam({
  param,
  value,
  disabled,
  updateNodeParamValue,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex ">
        {param.name}
        {param.required && <p className="text-red-400"> *</p>}
      </Label>
      <Component
        id={id}
        disabled={disabled}
        className="text-sx"
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default StringParam;
