import { Provider } from '../models';
import { ProviderService } from './provider.service';

describe('ProviderService', () => {
  let service: ProviderService;
  beforeEach(() => {
    service = new ProviderService();
  });


  it('get should return providers from observable', () => {
    service.get().subscribe((providers: Provider[]) => {
      expect(providers).toBeDefined();
      expect(providers.length).toBe(3);
    });
  });

  it('getById should return provider from a observable', () => {
    service.getById('1').subscribe((provider: Provider) => {
      expect(provider).toBeDefined();
      expect(provider.id).toBe('1');
    });
  });
});
