import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

export interface FooterLink {
  /** Testo fisso (nomi propri, non tradotti) */
  label?: string;
  /** Chiave di traduzione: ha la precedenza su label */
  labelKey?: string;
  /** Interno (routerLink) se path inizia con '/', altrimenti esterno (href). */
  path: string;
  external?: boolean;
}

export interface FooterColumn {
  /** Chiave di traduzione dell'intestazione */
  heading: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [RouterModule, TranslocoPipe],
  templateUrl: './main-footer.component.html',
})
export class MainFooterComponent {
  readonly currentYear = new Date().getFullYear();

  // ⬇️ Personalizza questi due con i tuoi dati reali.
  readonly repoUrl = 'https://github.com/davenar/lineup-builder';
  readonly authorUrl = 'https://github.com/davenar';

  readonly columns: FooterColumn[] = [
    {
      heading: 'footer.columns.project',
      links: [
        { label: 'Lineup Builder', path: '/' },
        { labelKey: 'footer.links.styleGuide', path: '/styleguide' },
        { labelKey: 'footer.links.source', path: this.repoUrl, external: true },
      ],
    },
    {
      heading: 'footer.columns.builtWith',
      links: [
        { label: 'Angular', path: 'https://angular.dev', external: true },
        { label: 'Tailwind CSS', path: 'https://tailwindcss.com', external: true },
        { labelKey: 'footer.links.data', path: 'https://www.fifacm.com', external: true },
      ],
    },
    {
      heading: 'footer.columns.developer',
      links: [
        { labelKey: 'footer.links.githubProfile', path: this.authorUrl, external: true },
      ],
    },
  ];
}