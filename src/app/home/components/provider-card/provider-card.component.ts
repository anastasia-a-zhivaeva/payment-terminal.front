import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Provider } from '@core/models';

@Component({
  selector: 'app-provider-card',
  templateUrl: './provider-card.component.html',
  styleUrls: ['./provider-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderCardComponent {
  @Input() provider: Provider;
  @Output() refill = new EventEmitter<string>();

  emitRefilled() {
    this.refill.emit(this.provider.id);
  }
}
