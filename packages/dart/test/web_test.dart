import 'package:qsu/qsu.dart';
import 'package:test/test.dart' hide contains, isEmpty;

void main() {
  final String homepage = 'https://qsu.cdget.com';

  group('Web', () {
    test('removeLocalePrefix', () {
      expect(removeLocalePrefix('/', ['ko', 'en']), '/');
      expect(removeLocalePrefix('', ['ko', 'en']), '');
      expect(removeLocalePrefix('ko', ['ko', 'en']), '');
      expect(removeLocalePrefix('/ko', ['ko', 'en']), '');
      expect(removeLocalePrefix('/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix('/ko/user/login', 'ko'), '/user/login');
      expect(removeLocalePrefix('/koen/user/login', 'ko'), '/koen/user/login');
      expect(removeLocalePrefix('/ko/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix('/zh-CN/user/login', ['zh-CN', 'zh-TW']),
          '/user/login');
      expect(removeLocalePrefix('/zh-CNT/user/login', ['zh-CN', 'zh-TW']),
          '/zh-CNT/user/login');
      expect(removeLocalePrefix('/zhCNT/user/login', ['zh-CN', 'zh-TW']),
          '/zhCNT/user/login');
      expect(removeLocalePrefix('/zh-cn/user/login', ['zh-CN', 'zh-TW']),
          '/zh-cn/user/login');
      expect(
          removeLocalePrefix('/user/ko/login', ['ko', 'en']), '/user/ko/login');
      expect(removeLocalePrefix('/en/user/login', ['ko', 'en']), '/user/login');
      expect(
          removeLocalePrefix('/cn/user/login', ['ko', 'en']), '/cn/user/login');
      expect(removeLocalePrefix('ko/user/login', ['ko', 'en']), '/user/login');
      expect(removeLocalePrefix(homepage, ['ko', 'en']), homepage);
      expect(removeLocalePrefix('$homepage/ko', ['ko', 'en']), homepage);
      expect(removeLocalePrefix('$homepage/user/login', ['ko', 'en']),
          '$homepage/user/login');
      expect(removeLocalePrefix('$homepage/koen/user/login', ['ko', 'en']),
          '$homepage/koen/user/login');
      expect(removeLocalePrefix('$homepage/user/ko/login', ['ko', 'en']),
          '$homepage/user/ko/login');
      expect(removeLocalePrefix('$homepage/ko/user/login', ['ko', 'en']),
          '$homepage/user/login');
      expect(removeLocalePrefix('$homepage/ko/en/user/login', ['ko', 'en']),
          '$homepage/en/user/login');
    });
  });
}
