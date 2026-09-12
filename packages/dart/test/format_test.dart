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

    // Pins the output produced before `standard` and `unitDisplay` existed. Every case
    // here has to keep reading exactly the same once an option is left out.
    test('fileSizeFormat (default output is unchanged)', () {
      expect(fileSizeFormat(0), '0 Bytes');
      expect(fileSizeFormat(-1), '0 Bytes');
      expect(fileSizeFormat(1), '1 Bytes');
      expect(fileSizeFormat(1023), '1023 Bytes');
      expect(fileSizeFormat(1024), '1 KB');
      expect(fileSizeFormat(1025), '1.00 KB');
      expect(fileSizeFormat(1536), '1.50 KB');
      expect(fileSizeFormat(1048576), '1 MB');
      expect(fileSizeFormat(1073741824), '1 GB');
      expect(fileSizeFormat(1536, decimals: 0), '2 KB');
      expect(fileSizeFormat(1025, decimals: 3, ceil: true), '2 KB');
      // Naming a default explicitly changes nothing either.
      expect(fileSizeFormat(1000000, standard: 'jedec'), '976.56 KB');
      expect(fileSizeFormat(1000000, unitDisplay: 'short'), '976.56 KB');
    });

    test('fileSizeFormat (standard)', () {
      // `jedec` is the default: a 1024 divisor labelled `KB`.
      expect(fileSizeFormat(1000000, standard: 'jedec'), '976.56 KB');
      // `iec` keeps the 1024 divisor and uses the prefix that means 1024.
      expect(fileSizeFormat(1000000, standard: 'iec'), '976.56 KiB');
      expect(fileSizeFormat(1048576, standard: 'iec'), '1 MiB');
      // `si` divides by 1000.
      expect(fileSizeFormat(1000000, standard: 'si'), '1 MB');
      expect(fileSizeFormat(1000, standard: 'si'), '1 kB');
      expect(fileSizeFormat(1024, standard: 'si'), '1.02 kB');
      // The exponent 0 label carries no prefix, so it is the same in all three.
      expect(fileSizeFormat(500, standard: 'si'), '500 Bytes');
      expect(fileSizeFormat(500, standard: 'iec'), '500 Bytes');
    });

    test('fileSizeFormat (unitDisplay)', () {
      expect(fileSizeFormat(1048576, unitDisplay: 'long'), '1 Megabyte');
      expect(fileSizeFormat(1234567, unitDisplay: 'long'), '1.18 Megabytes');
      // The singular is decided by the rounded number, not the raw one.
      expect(fileSizeFormat(1234567, decimals: 0, unitDisplay: 'long'),
          '1 Megabyte');
      expect(fileSizeFormat(1, unitDisplay: 'long'), '1 Byte');
      expect(fileSizeFormat(0, unitDisplay: 'long'), '0 Bytes');
      expect(fileSizeFormat(1048576, standard: 'iec', unitDisplay: 'long'),
          '1 Mebibyte');
    });

    test('fileSizeParts', () {
      final FileSizeParts zero = fileSizeParts(0);
      expect(zero.value, 0);
      expect(zero.unit, 'Bytes');
      expect(zero.exponent, 0);

      final FileSizeParts kb = fileSizeParts(1024);
      expect(kb.value, 1);
      expect(kb.unit, 'KB');
      expect(kb.exponent, 1);

      // The value is not rounded, so the caller's own formatter rounds it once.
      final FileSizeParts mb = fileSizeParts(1234567);
      expect(mb.value, 1234567 / 1048576);
      expect(mb.unit, 'MB');
      expect(mb.exponent, 2);

      final FileSizeParts si = fileSizeParts(1000000, standard: 'si');
      expect(si.value, 1);
      expect(si.unit, 'MB');
      expect(si.exponent, 2);

      final FileSizeParts iec = fileSizeParts(1048576, standard: 'iec');
      expect(iec.unit, 'MiB');

      final FileSizeParts long = fileSizeParts(1048576, unitDisplay: 'long');
      expect(long.unit, 'Megabyte');
    });

    // `fileSizeFormat` is `fileSizeParts` with the number rounded and the unit
    // appended, so the two must never disagree about the unit or the magnitude.
    test('fileSizeParts agrees with fileSizeFormat', () {
      for (final String standard in ['jedec', 'iec', 'si']) {
        for (final int bytes in [0, 1, 999, 1024, 1048576, 1234567]) {
          final FileSizeParts parts = fileSizeParts(bytes, standard: standard);

          expect(fileSizeFormat(bytes, standard: standard),
              endsWith(' ${parts.unit}'));
        }
      }
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

    test('durationParts', () {
      expect(durationParts(0).length, 0);

      final List<DurationPart> week = durationParts(604800000);
      expect(week.length, 1);
      expect(week[0].value, 7);
      expect(week[0].unit, 'Day');

      final List<DurationPart> mixed = durationParts(1234567890);
      expect(mixed.map((DurationPart p) => '${p.value}:${p.unit}').toList(),
          ['14:Day', '6:Hour', '56:Minute', '7:Second']);

      expect(
          durationParts(604800000, withZeroValue: true)
              .map((DurationPart p) => '${p.value}:${p.unit}')
              .toList(),
          ['7:Day', '0:Hour', '0:Minute', '0:Second']);

      expect(
          durationParts(1234567890, maxUnitCount: 2)
              .map((DurationPart p) => '${p.value}:${p.unit}')
              .toList(),
          ['14:Day', '6:Hour']);

      // Single-unit mode keeps the fraction.
      final List<DurationPart> half = durationParts(1500, unit: 'Second');
      expect(half[0].value, 1.5);
      expect(half[0].unit, 'Second');

      expect(
          durationParts(90061001, withMilliSeconds: true)
              .map((DurationPart p) => p.unit)
              .toList(),
          ['Day', 'Hour', 'Minute', 'Second', 'Millisecond']);
    });

    // `duration` is `durationParts` with each piece labelled and joined, so the two must
    // never disagree about which units a duration is made of.
    test('durationParts agrees with duration', () {
      for (final int milliseconds in [
        0,
        1000,
        604800000,
        1234567890,
        90061001
      ]) {
        final String joined = durationParts(milliseconds)
            .map((DurationPart p) =>
                '${p.value.toInt()} ${p.unit}${p.value == 1 ? '' : 's'}')
            .join(' ');

        expect(duration(milliseconds), joined);
      }
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
