import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return empty string when value is falsy', () => {
      expect(pipe.transform('')).toBe('');
      expect(pipe.transform(null as any)).toBe('');
      expect(pipe.transform(undefined as any)).toBe('');
    });


    it('should not truncate text that is shorter than limit', () => {
      const shortText = 'Short text';

      expect(pipe.transform(shortText)).toBe(shortText);
      expect(pipe.transform(shortText, 5)).toBe('Short...');
    });

    it('should truncate text that exceeds the limit with default trail', () => {
      const longText = 'This is a very long text that should be truncated';

      expect(pipe.transform(longText)).toBe('This is a very long ...');
      expect(pipe.transform(longText).length).toBe(23);
    });
  });
});