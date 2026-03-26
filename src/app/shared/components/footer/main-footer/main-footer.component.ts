import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface FooterColumn {
  heading: string;
  links: { label: string; path: string }[];
}

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-footer.component.html',
})
export class MainFooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly columns: FooterColumn[] = [
    {
      heading: 'Product',
      links: [
        { label: 'Features',  path: '/features' },
        { label: 'Pricing',   path: '/pricing' },
        { label: 'Changelog', path: '/changelog' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',   path: '/about' },
        { label: 'Blog',    path: '/blog' },
        { label: 'Careers', path: '/careers' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy',  path: '/privacy' },
        { label: 'Terms',    path: '/terms' },
        { label: 'Cookies',  path: '/cookies' },
      ],
    },
  ];
}