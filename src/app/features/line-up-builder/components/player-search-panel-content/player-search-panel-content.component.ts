import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { PanelService } from '../../../../core/services/panel.service';
import { PlayerInfoData } from '../../models/player-info-response.model';
import { SearchPlayerResponse } from '../../models/search-player-response.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-search-panel-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-search-panel-content.component.html',
})
export class PlayerSearchPanelContentComponent implements OnInit, OnDestroy {
  /** Label of the slot we're searching a player for (e.g. 'Right back'), informational only */
  @Input() slotLabel: string | null = null;

  /** Callback invoked when the user selects a player from the list */
  @Input() onPlayerSelected!: (player: PlayerInfoData) => void;

  private readonly playerService = inject(PlayerService);
  private readonly panelService = inject(PanelService);

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  readonly results = signal<SearchPlayerResponse[]>([]);
  readonly isSearching = signal<boolean>(false);
  readonly isLoadingDetail = signal<boolean>(false);
  readonly searchError = signal<string | null>(null);
  readonly hasSearchedOnce = signal<boolean>(false);

  private readonly destroy$ = new Subject<void>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.trim().length >= 3 || term.trim().length === 0),
        switchMap(term => {
          const trimmed = term.trim();

          if (trimmed.length < 3) {
            this.results.set([]);
            this.searchError.set(null);
            this.isSearching.set(false);
            return [];
          }

          this.isSearching.set(true);
          this.searchError.set(null);
          this.hasSearchedOnce.set(true);

          return this.playerService.searchPlayers(trimmed);
        }),
      )
      .subscribe({
        next: response => {
          this.results.set(this.normalizeSearchResponse(response));
          this.isSearching.set(false);
        },
        error: () => {
          this.results.set([]);
          this.isSearching.set(false);
          this.searchError.set('Something went wrong while searching. Please try again.');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubscription?.unsubscribe();
  }

  onSelectPlayer(result: SearchPlayerResponse): void {
    if (this.isLoadingDetail()) {
      return;
    }

    this.isLoadingDetail.set(true);
    this.searchError.set(null);

    this.playerService.getPlayerInfo(result.pid).subscribe({
      next: response => {
        this.isLoadingDetail.set(false);
        this.onPlayerSelected(response.data);
        this.panelService.close('programmatic');
      },
      error: () => {
        this.isLoadingDetail.set(false);
        this.searchError.set('Could not load player data. Please try again.');
      },
    });
  }

  /**
   * The search endpoint returns a plain array when there are results.
   * When there are none, it currently returns `{ error: "No Record Found" }`,
   * but the exact message/shape of that "no results" payload may change over
   * time, so this normalizes any non-array response into an empty array
   * rather than relying on a specific error string.
   */
  private normalizeSearchResponse(response: unknown): SearchPlayerResponse[] {
    if (Array.isArray(response)) {
      return response;
    }

    if (response && typeof response === 'object') {
      // Known "no results" shape: { error: '...' } — treat as empty, regardless of message
      if ('error' in (response as Record<string, unknown>)) {
        return [];
      }

      const maybeArray =
        (response as Record<string, unknown>)['data'] ??
        (response as Record<string, unknown>)['results'] ??
        (response as Record<string, unknown>)['items'];

      if (Array.isArray(maybeArray)) {
        return maybeArray as SearchPlayerResponse[];
      }
    }

    // Any other unexpected shape (string message, null, etc.) — fall back to empty
    return [];
  }
}