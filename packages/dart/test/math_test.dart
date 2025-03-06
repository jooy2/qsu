import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

void main() {
  group('Math', () {
    test('numRandom', () {
      for (int i = 0; i < 50; i += 1) {
        int offsetTest = numRandom(5, 10);
        assert(offsetTest >= 5 && offsetTest <= 10);
      }
    });
  });
}
