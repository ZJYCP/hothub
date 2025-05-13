'use client';
import { siteConfig } from '@/config/site';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from '@heroui/react';
import React, { Key } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { link as linkStyles } from '@heroui/theme';

export default function MenuCom() {
  return (
    <ul className="hidden lg:flex gap-4 justify-start ml-2">
      {siteConfig.navItems.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <Dropdown key={item.label}>
              <NavbarItem>
                <DropdownTrigger>
                  {item.href ? (
                    <NextLink
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        ' data-[active=true]:text-primary data-[active=true]:font-medium',
                      )}
                      color="foreground"
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  ) : (
                    <a
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'cursor-pointer data-[active=true]:text-primary data-[active=true]:font-medium',
                      )}
                      color="foreground"
                    >
                      {item.label}
                    </a>
                  )}
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                {item.children.map((child) => (
                  <DropdownItem key={child.href!} textValue={child.label}>
                    <NextLink
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'data-[active=true]:text-primary data-[active=true]:font-medium w-full',
                      )}
                      color="foreground"
                      href={child.href!}
                    >
                      {child.label}
                    </NextLink>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          );
        } else {
          return (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href!}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          );
        }
      })}
    </ul>
  );
}
