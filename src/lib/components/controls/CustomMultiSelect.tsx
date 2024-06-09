import { BaseControlProps } from "@/lib/types/baseControlProps";
import { MultiSelect} from "primereact/multiselect";
import { DropdownItemProps } from "./customDropdown";
import { useEffect, useState } from "react";
type CustomMultiSelectProps = {
    placeholder?: string,
    isRequired?:boolean,
    error?:string,
    maxLabels?:number,
    loading?:boolean,
    options?: DropdownItemProps[],
    onChange ?: (value : string | undefined) => void
} & BaseControlProps;;
export default function CustomMultiSelect({
name,
title,
className,
placeholder,
error,
loading = false,
options = [],
onChange,
maxLabels = 1,
isRequired = false
}:CustomMultiSelectProps){

    const [selectedValue,setSelectedValue] = useState<string | undefined>(undefined);

    useEffect(()=>{
     setSelectedValue(undefined);
    },[options]);

    return( <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={name} className=" text-wowPrimary capitalize">{title} {isRequired && <code className="text-red-400">*</code>}</label>
        <MultiSelect name={name}
            value={selectedValue}
            options={[...options]}
            optionLabel="text"
            loading={loading}
            optionValue="value"
            maxSelectedLabels={maxLabels}
            required ={isRequired}
            placeholder={placeholder}
            className={`w-full ${error && 'p-invalid'} ${className}`}
            onChange={(event)=>{
                if(onChange){
                    onChange(event.value);
                    setSelectedValue(event.value);
                }
            }}
             />
         {error && <small className=" text-red-400 ">{error}</small>}
    </div>);
}