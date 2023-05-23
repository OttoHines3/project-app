import {cva, VariantProps} from 'class-variance-authority';
import {FC} from 'react';


const buttonClasses = cva()

const Button = ({children}) => {
    return(
        <button>
            {children}
        </button>
    )
}

export default Button