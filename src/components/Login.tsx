import * as React from 'react';
import * as google from '../../assets/btn_google_signin_light_pressed_web@2x.png';

const onClick = () => location.href = 'https://jwt.rsquare.co.kr/app/texts';
export const Login = props => {
    return (
        <div className="-vertical-center center-block row">
            <a onClick={onClick}><img src={google}/></a>
        </div>
    )
};