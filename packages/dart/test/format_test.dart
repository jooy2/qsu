import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Format', () {
    test('numberFormat', () {
      expect(numberFormat(1234), '1,234');
      expect(numberFormat(12345678), '12,345,678');
      expect(numberFormat('12345'), '12,345');
      expect(numberFormat(123456.123), '123,456.123');
      expect(numberFormat('12.345'), '12.345');
      expect(numberFormat('12345.1'), '12,345.1');
      expect(numberFormat(1.2), '1.2');
      expect(numberFormat(0), '0');
      expect(numberFormat(-123456), '-123,456');
    });

    test('fileSizeFormat', () {
      expect(fileSizeFormat(0), '0 Bytes');
      expect(fileSizeFormat(0, ceil: true), '0 Bytes');
      expect(fileSizeFormat(1), '1 Bytes');
      expect(fileSizeFormat(1000000), '976.56 KB');
      expect(fileSizeFormat(2000, decimals: 3), '1.953 KB');
      expect(fileSizeFormat(250000000), '238.42 MB');
      expect(fileSizeFormat(100000000, decimals: 3, ceil: true), '96 MB');
      expect(fileSizeFormat(123456789012, decimals: 0, ceil: true), '115 GB');
    });

    test('duration', () {
      expect(duration(0), '');
      expect(duration(604800000), '7 Days');
      // Milliseconds are hidden by default (withMilliSeconds defaults to false).
      expect(duration(1234567890), '14 Days 6 Hours 56 Minutes 7 Seconds');
      // Grammatically correct plurals: 0 -> plural, 1 -> singular.
      expect(duration(604800000, withZeroValue: true),
          '7 Days 0 Hours 0 Minutes 0 Seconds');
      expect(duration(90000000), '1 Day 1 Hour');
      // Interior zero units are dropped unless withZeroValue is set.
      expect(duration(86700000), '1 Day 5 Minutes');
      expect(duration(604800000, useSpace: false), '7Days');
      expect(duration(604800000, useShortString: true), '7 D');
    });

    test('duration - months and years', () {
      // A month is 30 days, a year is 365 days.
      expect(duration(2592000000), '1 Month');
      expect(duration(3456000000), '1 Month 10 Days');
      expect(duration(31536000000), '1 Year');
      expect(duration(34560000000), '1 Year 1 Month 5 Days');
      // Month short is `Mo` to avoid clashing with Minute (`M`).
      expect(duration(34560000000, useShortString: true), '1 Y 1 Mo 5 D');
    });

    test('duration - withMilliSeconds', () {
      expect(duration(1234567890, withMilliSeconds: true),
          '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds');
      expect(
          duration(1234567890,
              withMilliSeconds: true, useSpace: true, useShortString: true),
          '14 D 6 H 56 M 7 S 890 ms');
      expect(duration(604800001, withMilliSeconds: true, separator: '-'),
          '7 Days-1 Millisecond');
    });

    test('duration - maxUnitCount', () {
      expect(duration(34560000000, maxUnitCount: 2), '1 Year 1 Month');
      expect(duration(1234567890, maxUnitCount: 1), '14 Days');
      expect(duration(1234567890, withMilliSeconds: true, maxUnitCount: 3),
          '14 Days 6 Hours 56 Minutes');
    });

    test('duration - single unit', () {
      expect(duration(172800000, unit: 'Hour'), '48 Hours');
      expect(duration(1800000, unit: 'Hour'), '0.5 Hours');
      expect(duration(3600000, unit: 'Hour'), '1 Hour');
      expect(duration(86400000, unit: 'Minute'), '1440 Minutes');
      expect(duration(86400000, unit: 'Day'), '1 Day');
      // Plural forms and casing are accepted.
      expect(duration(172800000, unit: 'hours'), '48 Hours');
      expect(duration(172800000, unit: 'Hour', useShortString: true), '48 H');
    });

    test('safeParseInt', () {
      expect(safeParseInt(null), 0);
      expect(safeParseInt('', fallback: -1), -1);
      expect(safeParseInt('0001234'), 1234);
      expect(safeParseInt('1.234.567'), 1);
      expect(safeParseInt('1234', fallback: 10), 1234);
      expect(safeParseInt('1234', fallback: 0, radix: 16), 4660);
    });

    test('safeJSONParse', () {
      expect(safeJSONParse({}), {});
      expect(safeJSONParse('{}'), {});
      expect(safeJSONParse(''), {});
      expect(safeJSONParse(null), {});
      expect(safeJSONParse(null, fallback: {'a': 1}), {'a': 1});
      expect(safeJSONParse('{"a":1,"b":2}'), {'a': 1, 'b': 2});
      expect(safeJSONParse('{"a":{"aa":1},"b":null}'), {
        'a': {'aa': 1},
        'b': null
      });
    });
  });
}
