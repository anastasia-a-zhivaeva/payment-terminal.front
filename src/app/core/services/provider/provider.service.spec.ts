import { Provider } from '@core/interfaces';
import { ProviderService } from '@core/services';

describe('ProviderService', () => {
  let service: ProviderService;
  beforeEach(() => {
    service = new ProviderService();
  });

  it('get should return providers from observable', (done) => {
    service.get().subscribe((providers: Provider[]) => {
      expect(providers).toBeDefined();
      expect(providers.length).toBe(3);
      done();
    });
  });

  it('getById should return provider from a observable', (done) => {
    service.getById('1').subscribe((provider: Provider) => {
      expect(provider).toBeDefined();
      expect(provider.id).toBe('1');
      done();
    });
  });
});
