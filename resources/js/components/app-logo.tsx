import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex min-w-0 items-center">
            <AppLogoIcon className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-all" />
        </div>
    );
}
