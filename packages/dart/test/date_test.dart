import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Date', () {
    test('isValidDate', () {
      expect(isValidDate('2021-01-01'), true);
      expect(isValidDate('2021-02-28'), true);
      expect(isValidDate('0024-01-01'), true);
      expect(isValidDate('9999-12-12'), true);
      expect(isValidDate('2024-02-29'), true);
      expect(isValidDate('0001-01-01'), false);
      expect(isValidDate('2021-02-29'), false);
      expect(isValidDate('2021-03-32'), false);
      expect(isValidDate('2021-13-01'), false);
      expect(isValidDate('0000-01-01'), false);
    });

    test('dateToYYYYMMDD', () {
      expect(dateToYYYYMMDD(DateTime.utc(2023, 5, 15, 1, 1, 0)), '2023-05-15');
      expect(dateToYYYYMMDD(DateTime(2023, 12, 31), '/'), '2023/12/31');
    });

    test('createDateListFromRange', () {
      expect(
        createDateListFromRange(
          DateTime.utc(2023, 1, 1, 1, 0, 0),
          DateTime.utc(2023, 1, 5, 1, 0, 0),
        ),
        ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
      );
      expect(
        createDateListFromRange(
          DateTime.utc(2023, 12, 30, 1, 0, 0),
          DateTime.utc(2023, 12, 30, 5, 0, 0),
        ),
        ['2023-12-30'],
      );
      expect(
        createDateListFromRange(
          DateTime.utc(2023, 1, 30, 1, 0, 0),
          DateTime.utc(2023, 3, 5, 9, 0, 0),
        ),
        [
          '2023-01-30',
          '2023-01-31',
          '2023-02-01',
          '2023-02-02',
          '2023-02-03',
          '2023-02-04',
          '2023-02-05',
          '2023-02-06',
          '2023-02-07',
          '2023-02-08',
          '2023-02-09',
          '2023-02-10',
          '2023-02-11',
          '2023-02-12',
          '2023-02-13',
          '2023-02-14',
          '2023-02-15',
          '2023-02-16',
          '2023-02-17',
          '2023-02-18',
          '2023-02-19',
          '2023-02-20',
          '2023-02-21',
          '2023-02-22',
          '2023-02-23',
          '2023-02-24',
          '2023-02-25',
          '2023-02-26',
          '2023-02-27',
          '2023-02-28',
          '2023-03-01',
          '2023-03-02',
          '2023-03-03',
          '2023-03-04',
          '2023-03-05',
        ],
      );
    });
  });
}
