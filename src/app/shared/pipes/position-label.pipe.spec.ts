import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { PositionLabelPipe } from './position-label.pipe';

describe('PositionLabelPipe', () => {
  let pipe: PositionLabelPipe;
  let transloco: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      providers: [PositionLabelPipe],
    });
    pipe = TestBed.inject(PositionLabelPipe);
    transloco = TestBed.inject(TranslocoService);
  });

  it('translates known codes in both formats', () => {
    transloco.setActiveLang('it');
    expect(pipe.transform('LB')).toBe('TS');
    expect(pipe.transform('LB', 'long')).toBe('Terzino sinistro');

    transloco.setActiveLang('en');
    expect(pipe.transform('LB')).toBe('LB');
    expect(pipe.transform('LB', 'long')).toBe('Left Back');
  });

  it('falls back to the original API value for unknown codes', () => {
    transloco.setActiveLang('it');
    expect(pipe.transform('XYZ')).toBe('XYZ');
    expect(pipe.transform('XYZ', 'long', 'Custom')).toBe('Custom');
  });

  it('translates every known code inside a list', () => {
    transloco.setActiveLang('it');
    expect(pipe.transform('ST, LW')).toBe('ATT, AS');
  });
});
