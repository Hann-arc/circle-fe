import { Input, InputProps } from "@chakra-ui/react";
import React from "react";


interface InputFieldProps extends InputProps {
  type: string;
  placeholder: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({  placeholder, ...props }, ref) => (
    <Input
      placeholder={placeholder}
      bg="#2D2D2D"
      padding={6}
      borderRadius="12px"
      border="none"
      color="white"
      ref={ref}
      {...props}
    />
  )
);


export default InputField;
