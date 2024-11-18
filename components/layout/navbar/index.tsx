import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <div className="pb-4">
      {/* Announcement Bar */}
      <div className="bg-black dark:bg-white px-4 py-2 text-center text-xs text-white dark:text-black">
        <p>Complimentary shipping on orders above 500 EUR - Duties and taxes included.</p>
      </div>

      <nav className="sticky top-0 z-50 bg-white dark:bg-black">
        <div className="relative flex items-center justify-between p-4 lg:px-6">
          <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          
          <div className="flex w-full items-center">
            <div className="flex w-full md:w-1/3">
              <Link
                href="/"
                prefetch={true}
                className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              >
                <LogoSquare />
                <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                  {SITE_NAME}
                </div>
              </Link>
              {menu.length ? (
                <ul className="hidden gap-6 text-sm font-light md:flex md:items-center">
                  <li>
                    <Link href="#" className="text-red-600">
                      Black Friday
                    </Link>
                  </li>
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="hidden gap-6 text-sm md:flex md:items-center">
                  <li>
                    <Link href="#" className="text-red-600">
                      Black Friday
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search"
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search"
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      Collections
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="hidden justify-center md:flex md:w-1/3">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <div className="flex justify-end md:w-1/3">
              <CartModal />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
