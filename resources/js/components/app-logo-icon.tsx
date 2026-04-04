import type { ImgHTMLAttributes } from 'react';

const appLogoPath = '/storage/logo-keypro-service.png';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src={appLogoPath}
            alt="KeyPro Service Center"
            className={props.className}
        />
    );
}
