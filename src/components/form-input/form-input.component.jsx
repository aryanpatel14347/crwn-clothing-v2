import './form-input.styles.scss';

import {FormInputLabel, Group, MyInput} from './form-input.styles';
const FormInput = ({label, ...otherProps}) => {
return(

    <Group>
        <MyInput {...otherProps}/>
        { label && (
        <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
        )}
    </Group>

);
};

export default FormInput;
