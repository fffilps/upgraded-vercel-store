'use client';

import { useTheme } from "next-themes";
import logoDark from './S(white-bg).svg';
import logo from './S.svg';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  const { theme } = useTheme()
  
  return (
    <div>
      {theme === 'dark' ? (
        <img 
          src={logo.src}
          alt="Dark Logo"
          className="h-8 w-auto object-cover"
        />
      ) : (
        <img 
          src={logoDark.src}
          alt="Light Logo"
          className="h-8 w-auto object-cover"
        />
      )}
    </div>
  )
}
