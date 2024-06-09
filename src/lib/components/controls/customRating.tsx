import { BaseControlProps } from "@/lib/types/baseControlProps";
import { Rating } from "primereact/rating";
import { useState } from "react";

type CustomRatingProps = {
  isRequired?:boolean,
  error?:string,
  onChange?:(value : number)=> void
} & BaseControlProps;
export default function CustomRating(
    {
        name,
        title,
        className,
        error,
        isRequired = false,
        onChange
    } : CustomRatingProps
) {
    const [value,setValue] = useState(0);
    
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{title} {isRequired && <code className="text-red-400">*</code>}</label>
            <Rating className={className} value={value} onChange={(e) =>{
                setValue(e.value ?? 0)
                if(onChange){
                    onChange(e.value ?? 0);
                }
            } } cancel={false} />
            {error && <small className=" text-red-400 ">{error}</small>}
        </div>
    )
}