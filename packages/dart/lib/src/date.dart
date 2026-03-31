/// Calculates the difference between two given dates and returns the number of days.
int dayDiff(DateTime date1, [DateTime? date2]) {
  final DateTime date2c = date2 ?? DateTime.now();

  return (date2c.difference(date1).inHours / 24).ceil();
}

/// Returns today's date.
String today({String separator = '-', bool yearFirst = true}) {
  final DateTime date = DateTime.now();
  final int month = date.month;
  final int day = date.day;

  final String monthStr = '${month < 10 ? '0' : ''}$month';
  final String dayStr = '${day < 10 ? '0' : ''}$day';

  if (yearFirst) {
    return '${date.year}$separator$monthStr$separator$dayStr';
  } else {
    return '$monthStr$separator$dayStr$separator${date.year}';
  }
}

/// Checks if a given date actually exists. Check only in `YYYY-MM-DD` format.
bool isValidDate(String dateYYYYMMDD) {
  if (!RegExp(r'^[0-9]{4}-[0-9]{2}-[0-9]{2}$').hasMatch(dateYYYYMMDD)) {
    throw ArgumentError("The date format must be 'YYYY-MM-DD'");
  }

  final List<String> parts = dateYYYYMMDD.split('-');
  final int year = int.parse(parts[0]);
  final int month = int.parse(parts[1]);
  final int day = int.parse(parts[2]);

  // Support range: 1600-01-01 ~ 9999/12/31
  if (year < 16 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  final int maxDay = DateTime(year, month + 1, 0).day;
  return day <= maxDay;
}

/// Returns the date data of a Date object in the format `YYYY-MM-DD`.
String dateToYYYYMMDD(DateTime date, [String separator = '-']) {
  final int month = date.month;
  final int day = date.day;

  return '${date.year}$separator${month < 10 ? '0$month' : '$month'}$separator${day < 10 ? '0$day' : '$day'}';
}

/// Create an array list of all dates from `startDate` to `endDate` in the format `YYYY-MM-DD`.
List<String> createDateListFromRange(DateTime startDate, DateTime endDate) {
  if (!isValidDate(dateToYYYYMMDD(startDate)) ||
      !isValidDate(dateToYYYYMMDD(endDate))) {
    throw ArgumentError(
        'Either the start date or end date is an invalid date.');
  }

  final int dateDiff = endDate.difference(startDate).inDays;

  if (dateDiff < 0) {
    throw ArgumentError('The start date is more recent than the end date.');
  }

  final List<String> allDate = <String>[];
  DateTime current = DateTime(startDate.year, startDate.month, startDate.day);
  final DateTime end = DateTime(endDate.year, endDate.month, endDate.day);

  while (!current.isAfter(end)) {
    allDate.add(dateToYYYYMMDD(current));
    current = current.add(const Duration(days: 1));
  }

  return allDate;
}
