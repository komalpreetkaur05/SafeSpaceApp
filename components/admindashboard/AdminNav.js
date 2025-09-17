'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// REFERENCES: Gemini Code Assist Agent / Gemini-Pro-2 

/**
 * AdminNav component for rendering the navigation bar in the admin dashboard.
 * It dynamically highlights the active link based on the current URL path.
 */
export default function AdminNav() {
    // Get the current pathname from Next.js router to determine the active link.
    const pathname = usePathname();
    
    // Define the navigation links with their names and corresponding hrefs.
    const navLinks = [
        { name: 'Overview', href: '/admin/overview' },
        { name: 'Users', href: '/admin/users' },
        { name: 'Referral Intake', href: '/admin/referral-intake' },
        { name: 'Referral Tracking', href: '/admin/referral-tracking' },
        { name: 'System Monitoring', href: '/admin/system-monitoring' },
        { name: 'Audit & Compliance', href: '/admin/audit-compliance' },
        { name: 'Reports & Analytics', href: '/admin/reports-analytics' },
    ];

    return (
        <nav className="w-full">
            <div className="border-2 border-black rounded-full p-1 mx-auto w-full max-w-screen-xl">
                <div className="flex border-2 border-gray-800 rounded-full overflow-x-auto whitespace-nowrap w-full">
                    {/* Map through the navLinks array to render each navigation item. */}
                    {navLinks.map((link, index) => {
                        // Determine if the current link is active based on the pathname.
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                // Apply dynamic styling based on whether the link is active or not.
                                // Also adds a right border to separate links, except for the last one.
                                className={`flex-1 min-w-[120px] text-center px-6 py-3 font-medium text-sm transition
                                    ${isActive
                                        ? 'bg-[#5DA39E] text-white' // Active link styles
                                        : 'bg-white text-black hover:bg-gray-100' // Inactive link styles
                                    }
                                    ${index !== navLinks.length - 1 ? 'border-r border-gray-800' : ''}` // Border for separation
                                }
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};