import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../../../testing/transloco-testing';

import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let trigger: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    fixture.detectChanges();
    trigger = fixture.nativeElement.querySelector('button');
  });

  it('exposes an accessible menu trigger', () => {
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-label')).toBe('Change language, current language: English (EN)');
    expect(trigger.textContent).toContain('en');
  });

  it('opens a menu with one radio item per language, each with its lang attribute', () => {
    trigger.click();
    fixture.detectChanges();

    const items = Array.from(document.querySelectorAll<HTMLElement>('[role="menuitemradio"]'));

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(items.map(i => i.textContent?.trim())).toEqual(['English', 'Italiano']);
    expect(items.map(i => i.getAttribute('lang'))).toEqual(['en', 'it']);
    expect(items.map(i => i.getAttribute('aria-checked'))).toEqual(['true', 'false']);
  });
});
