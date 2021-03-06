import {AlphaOrWhitespaceValidationRule} from '../../src/validation/validation-rules';
import {Expectations} from '../expectations';

//No need to test empty values, they are filtered out by the "ValidationProperty" depending if they are 'isNotEmpty()'

describe('Tests on AlphaOrWhitespaceValidationRule', () => {
  it('should be working with only alpha', (done) => {
    var expectations = new Expectations(expect, done);
    var rule = new AlphaOrWhitespaceValidationRule();
    expectations.expectAsync(rule.validate('a')).toBe(true);
    expectations.expectAsync(rule.validate('A')).toBe(true);
    expectations.validate();
  });
  it('should be working with whitespaces', (done) => {
    var expectations = new Expectations(expect, done);
    var rule = new AlphaOrWhitespaceValidationRule();
    expectations.expectAsync(rule.validate('a a')).toBe(true); //note: trailing spaces are always trimmed
    expectations.expectAsync(rule.validate('A A')).toBe(true);
    expectations.validate();
  });

  it('should be working with a combination of alpha characters and whitespaces', (done) => {
    var expectations = new Expectations(expect, done);
    var rule = new AlphaOrWhitespaceValidationRule();
    expectations.expectAsync(rule.validate(' aBcDeFgHiJ k L m N o PqRsTuVwXyZ ')).toBe(true);
    expectations.validate();
  });

  it('should not be working with non alphanumerical characters', (done) => {
    var expectations = new Expectations(expect, done);
    var rule = new AlphaOrWhitespaceValidationRule();
    expectations.expectAsync(rule.validate('van.der.haegen.j@gmail.com')).toBe(false);
    expectations.expectAsync(rule.validate('123,123')).toBe(false);
    expectations.expectAsync(rule.validate('abc!')).toBe(false);
    expectations.expectAsync(rule.validate('!@#$%^&*()_+')).toBe(false);
    expectations.expectAsync(rule.validate('abc123')).toBe(false);
    expectations.validate();
  });
});
