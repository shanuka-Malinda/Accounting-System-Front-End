import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

interface NavigationItem {
  name: string;
  icon: string;
  route: string;
  badge?: string;
  children?: NavigationItem[];
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  
  isOpen = false;
  isMobile = false;
  activeDropdown: string | null = null;
  currentRoute = '';

  navigationItems: NavigationItem[] = [
    {
      name: 'Dashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M3 7l9-4 9 4',
      route: '/dashboard'
    },
    {
      name: 'Analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      route: '/analytics',
      badge: 'New'
    },
    {
      name: 'Master Accounts',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      route: '/home/master-acc',
      children: [
        { name: 'Accounts', icon: '', route: 'home/master-acc/acc' },
        { name: 'Active Projects', icon: '', route: 'home/master-acc/active' },
        { name: 'Completed', icon: '', route: 'home/master-acc/completed' },
        { name: 'Archived', icon: '', route: 'home/master-acc/archived' }
      ]
    },
    {
      name: 'Journal',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z',
      route: '/home/journal',
      children: [
        { name: 'Journal Entry', icon: '', route: 'home/journal/journal-entry' },
        { name: 'Stock', icon: '', route: 'home/journal/inventory' },
        { name: 'Sales', icon: '', route: 'home/journal/sales' },
      ]
    },
    {
      name: 'Messages',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      route: '/messages',
      badge: '5'
    },
    {
      name: 'Reports',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      route: '/home/reports',
      children: [
        { name: 'Accounts', icon: '', route: '/home/reports/accounts' },
      ]
    },
    {
      name: 'Files',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      route: '/files',
      children: [
        { name: 'My Files', icon: '', route: '/files/my-files' },
        { name: 'Shared', icon: '', route: '/files/shared' },
        { name: 'Recent', icon: '', route: '/files/recent' },
        { name: 'Trash', icon: '', route: '/files/trash' }
      ]
    },
    {
      name: 'Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      route: '/settings'
    }
  ];

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.checkScreenSize();
  }
    this.currentRoute = this.router.url;
    
    // Listen to route changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  toggleDropdown(itemName: string): void {
    this.activeDropdown = this.activeDropdown === itemName ? null : itemName;
  }

  isActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  isParentActive(item: NavigationItem): boolean {
    if (this.isActive(item.route)) return true;
    if (item.children) {
      return item.children.some(child => this.isActive(child.route));
    }
    return false;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  closeSidebar(): void {
    if (this.isMobile) {
      this.isOpen = false;
    }
  }
}
