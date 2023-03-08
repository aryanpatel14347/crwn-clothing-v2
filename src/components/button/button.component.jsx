//import './button.styles.scss';

import {BaseButton,InvertedButton,GoogleSignInButton} from './button.styles';

export const Button_Type_Classes = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted'
};

const getButton = (buttonType = Button_Type_Classes.base) =>
    ({
      [Button_Type_Classes.base]: BaseButton,
      [Button_Type_Classes.google]: GoogleSignInButton,
      [Button_Type_Classes.inverted]: InvertedButton
    }[buttonType]);

const Button = ({children, buttonType, ...otherProps}) =>{
  const CustomButton = getButton(buttonType);
  return(
      <CustomButton {...otherProps}>{children}</CustomButton>
  );
};

export default Button;
