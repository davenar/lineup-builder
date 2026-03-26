import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-header.component.html',
})
export class MainHeaderComponent {
  readonly navLinks: NavLink[] = [
    { label: 'Home',     path: '/' },
    { label: 'About',    path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact',  path: '/contact' },
  ];

  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }
}