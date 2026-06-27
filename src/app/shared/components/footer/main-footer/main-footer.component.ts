import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface FooterLink {
  label: string;
  /** Interno (routerLink) se path inizia con '/', altrimenti esterno (href). */
  path: string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-footer.component.html',
})
export class MainFooterComponent {
  readonly currentYear = new Date().getFullYear();

  // ⬇️ Personalizza questi due con i tuoi dati reali.
  readonly repoUrl = 'https://github.com/davenar/lineup-builder';
  readonly authorUrl = 'https://github.com/davenar';

  readonly columns: FooterColumn[] = [
    {
      heading: 'Project',
      links: [
        { label: 'Lineup Builder', path: '/' },
        { label: 'Style Guide', path: '/styleguide' },
        { label: 'Source on GitHub', path: this.repoUrl, external: true },
      ],
    },
    {
      heading: 'Built with',
      links: [
        { label: 'Angular', path: 'https://angular.dev', external: true },
        { label: 'Tailwind CSS', path: 'https://tailwindcss.com', external: true },
        { label: 'Data: FIFACM', path: 'https://www.fifacm.com', external: true },
      ],
    },
    {
      heading: 'Developer',
      links: [
        { label: 'GitHub Profile', path: this.authorUrl, external: true },
      ],
    },
  ];
}