import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { PanelService } from '../../../../../../core/services/panel.service';
import { LineupStateService } from '../../../../services/lineup-state.service';
import { FormationSlot } from '../../../../models/formation.models';
import { PlayerInfoData } from '../../../../models/player-info-response.model';
import { PlayerSearchPanelContentComponent } from '../../../player-search-panel-content/player-search-panel-content.component';

@Component({
  selector: 'app-player-card-pitch-crazy-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card-pitch-crazy-time.component.html',
  styleUrl: './player-card-pitch-crazy-time.component.css',
})
export class PlayerCardPitchCrazyTimeComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) slot!: FormationSlot;

  @ViewChild('nameViewport') nameViewport?: ElementRef<HTMLElement>;
  @ViewChild('nameText') nameText?: ElementRef<HTMLElement>;

  private readonly panelService = inject(PanelService);
  private readonly lineupState = inject(LineupStateService);

  private resizeObserver?: ResizeObserver;

  readonly player = computed<PlayerInfoData | null>(
    () => this.lineupState.pitchAssignments().get(this.slot.cellIndex) ?? null,
  );

  readonly isNameOverflowing = signal(false);

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => this.scheduleOverflowCheck());
    if (this.nameViewport) {
      this.resizeObserver.observe(this.nameViewport.nativeElement);
    }
    this.scheduleOverflowCheck();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private scheduleOverflowCheck(): void {
    requestAnimationFrame(() => this.checkNameOverflow());
  }

  private checkNameOverflow(): void {
    const viewport = this.nameViewport?.nativeElement;
    const text = this.nameText?.nativeElement;
    if (!viewport || !text) {
      return;
    }
    this.isNameOverflowing.set(text.scrollWidth > viewport.clientWidth + 1);
  }

  onOpenSearchPanel(): void {
    this.panelService.open(
      PlayerSearchPanelContentComponent,
      {
        desktopDirection: 'right',
        mobileDirection: 'bottom',
        bottomHeight: '85dvh',
        ariaLabel: `Seleziona giocatore - ${this.slot.fullLabel}`,
        closeModes: ['close-button', 'backdrop', 'escape'],
      },
      {
        slotLabel: this.slot.fullLabel,
        onPlayerSelected: (player: PlayerInfoData) => {
          this.lineupState.assignPitchPlayer(this.slot.cellIndex, player);
          this.scheduleOverflowCheck();
        },
      },
    );
  }

  onRemovePlayer(event: Event): void {
    event.stopPropagation();
    this.lineupState.removePitchPlayer(this.slot.cellIndex);
  }
}