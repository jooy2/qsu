import 'package:qsu/qsu.dart';

/// For the various functions provided by the package,
/// see the documentation: https://qsu.cdget.com/reference
void main() {
  trim(' hello '); // Returns 'hello'

  numberFormat(123456); // Returns '123,456'

  capitalizeFirst('abc'); // Returns 'Abc'

  isEmail('abc@example.com'); // Returns true
}
