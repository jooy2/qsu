import 'dart:io';

import 'package:qsu/qsu.dart';
import 'package:test/test.dart';

const List<String> _platformNames = <String>[
  'windows',
  'macos',
  'linux',
  'android',
  'ios',
  'unknown',
];

/// Node's own vocabulary, which is the one this package normalises into.
const List<String> _architectures = <String>[
  'arm',
  'arm64',
  'ia32',
  'riscv32',
  'riscv64',
  'x64',
];

final RegExp _size = RegExp(r'^\d+ [A-Z]+$');

void main() {
  group('OS', () {
    test('getPlatform', () {
      final String name = getPlatform();

      expect(_platformNames.contains(name), isTrue);
      // Every system these tests run on is one the table covers.
      expect(name, isNot('unknown'));
      expect(name == 'windows', Platform.isWindows);
      expect(name == 'macos', Platform.isMacOS);
      expect(name == 'linux', Platform.isLinux);
    });

    test('getArch', () {
      expect(_architectures.contains(getArch()), isTrue);
    });

    test('getKernelVersion', () {
      final String version = getKernelVersion();

      expect(version, isNotEmpty);
      expect(version, isNot('Unknown'));
      expect(version, matches(RegExp(r'\d')));

      // The kernel version, not the name the system is sold under. Windows is
      // where the two part company: `10.0.26100` against `11`.
      if (Platform.isWindows) {
        expect(version, matches(RegExp(r'^\d+\.\d+\.\d+')));
      }
    });

    test('getEndianness', () {
      expect(<String>['BE', 'LE'].contains(getEndianness()), isTrue);
    });

    test('getCpuCount', () {
      expect(getCpuCount(), greaterThanOrEqualTo(1));
    });

    test('getCpu', () {
      final String name = getCpu();

      expect(name, isNotEmpty);
      expect(name, isNot('Unknown'));
      // The model of the processor, not the architecture it was built for.
      expect(
          name,
          isNot(matches(RegExp(r'^(arm|arm64|aarch64|x86|x86_64|amd64)$',
              caseSensitive: false))));
    });

    test('getCpuSpeed', () {
      expect(getCpuSpeed(), greaterThanOrEqualTo(0));
    });

    test('getCpuUsage', () async {
      final num usage = await getCpuUsage(interval: 50);

      expect(usage, inInclusiveRange(0, 100));
      expect(await getCpuUsage(interval: 50, decimals: 0), isA<int>());
      // Nothing is sampled over no time at all, so there is nothing to report.
      expect(await getCpuUsage(interval: 0), 0);
    });

    test('getRamSize', () {
      expect(getRamSize(), matches(_size));
      expect(getRamSize(), isNot('0 B'));
    });

    test('getFreeRamSize', () {
      final String size = getFreeRamSize();

      expect(size, matches(_size));
      // A running machine always has some memory free.
      expect(size, isNot('0 B'));
    });

    test('getUsedRamSize', () {
      expect(getUsedRamSize(), matches(_size));
    });

    test('getRamUsage', () {
      expect(getRamUsage(), inInclusiveRange(0, 100));
      expect(getRamUsage(decimals: 0), isA<int>());
    });

    test('getDiskSize', () async {
      final String size = await getDiskSize();

      expect(size, matches(_size));
      expect(size, isNot('0 B'));
      // The current working directory is the default, named or not.
      expect(await getDiskSize(path: Directory.current.path), size);
    });

    test('getFreeDiskSize', () async {
      expect(await getFreeDiskSize(), matches(_size));
    });

    test('getDiskUsage', () async {
      final num usage = await getDiskUsage();

      // A disk with an operating system on it is never empty.
      expect(usage, greaterThan(0));
      expect(usage, lessThanOrEqualTo(100));
    });

    test('getUptime', () {
      expect(getUptime(), isA<num>());
      expect(getUptime() as num, greaterThan(0));
      expect(getUptime(format: true), isA<String>());
      expect((getUptime(floor: true) as num) % 1, 0);
    });

    test('getSystemUptime', () {
      final num seconds = getSystemUptime() as num;

      expect(seconds, greaterThan(0));
      // The machine has been running at least as long as this process has.
      expect(seconds, greaterThanOrEqualTo(getUptime() as num));
      expect(getSystemUptime(format: true), isA<String>());
    });

    test('getBootTime', () {
      final DateTime bootTime = getBootTime();

      expect(bootTime.isBefore(DateTime.now()), isTrue);
      // The boot time and the uptime are two readings of the same thing, so
      // they agree to within the moment it takes to read them twice.
      final DateTime fromUptime = DateTime.now().subtract(
          Duration(milliseconds: ((getSystemUptime() as num) * 1000).round()));

      expect(bootTime.difference(fromUptime).inSeconds.abs(), lessThan(2));
    });

    test('getProcessMemoryUsage', () {
      final String size = getProcessMemoryUsage();

      expect(size, matches(_size));
      expect(size, isNot('0 B'));
    });

    test('getHostname', () async {
      final String hostname = await getHostname();

      expect(hostname, isNotEmpty);
      expect(hostname, isNot('Unknown'));
      // A name may hold spaces of its own, but never around itself.
      expect(hostname, hostname.trim());
    });

    test('getOsName', () async {
      final String name = await getOsName();

      expect(name, isNotEmpty);

      if (Platform.isMacOS) {
        expect(name, startsWith('macOS'));
      } else if (Platform.isWindows) {
        expect(name, startsWith('Windows'));
      } else if (Platform.isLinux) {
        // The name the distribution gives itself, not the bare word `Linux`.
        expect(name, isNot('Linux'));
      }
    });

    test('getUsername', () {
      final String username = getUsername();

      expect(username, isNotEmpty);
      expect(username, isNot('Unknown'));
    });

    test('getHomeDir', () {
      expect(Directory(getHomeDir()).existsSync(), isTrue);
    });

    test('getTempDir', () {
      expect(Directory(getTempDir()).existsSync(), isTrue);
    });

    test('getShell', () {
      final String shell = getShell();

      expect(shell, isNotEmpty);
      // A path to a program rather than a bare name, on either kind of system.
      expect(shell,
          matches(Platform.isWindows ? RegExp(r'\\|\.exe$') : RegExp(r'^/')));
    });

    test('getLocalIp', () async {
      final String address = await getLocalIp();

      expect(address, matches(RegExp(r'^(\d{1,3}\.){3}\d{1,3}$')));
      expect(address, isNot('0.0.0.0'));
    });

    test('getMachineId', () async {
      final String id = await getMachineId();

      expect(
          id,
          matches(RegExp(r'^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}'
              r'-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}')));
      // The same machine answers with the same id, whichever call asks.
      expect(await getMachineId(), id);
    });

    test('getSid', () async {
      if (!Platform.isWindows && !Platform.isMacOS) {
        expect(getSid(), throwsUnsupportedError);

        return;
      }

      expect(await getSid(),
          matches(RegExp(r'^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}')));
    });

    test('runCommand', () async {
      expect(await runCommand('echo a'), 'a');
      expect(await runCommand('echo b'), 'b');
    });
  });
}
