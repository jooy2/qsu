import os
import re
import subprocess
import sys
import tempfile
import threading
from datetime import datetime, timedelta

import pytest

from qsu.os import (
	getArch,
	getBootTime,
	getCpu,
	getCpuCount,
	getDiskSize,
	getDiskUsage,
	getEndianness,
	getFreeDiskSize,
	getFreeRamSize,
	getHomeDir,
	getHostname,
	getKernelVersion,
	getMachineId,
	getPlatform,
	getRamSize,
	getRamUsage,
	getShell,
	getSid,
	getSystemUptime,
	getTempDir,
	getUptime,
	getUsedRamSize,
	getUsername,
	runCommand,
)


_PLATFORM_NAMES = ('windows', 'macos', 'linux', 'freebsd', 'unknown')

# Node's own vocabulary, which is what this package normalises its answer into.
_ARCHITECTURES = (
	'arm',
	'arm64',
	'ia32',
	'loong64',
	'mips',
	'mipsel',
	'ppc',
	'ppc64',
	'riscv64',
	's390',
	's390x',
	'x64',
)


def test_runCommand():
	assert runCommand('echo a') == 'a'
	assert runCommand('echo b') == 'b'


def test_runCommand_does_not_wait_on_standard_input():
	# `sort` reads standard input on every supported platform, so it never returns
	# while that pipe is open. Running it on a thread keeps a regression from hanging
	# the whole suite.
	output = []
	thread = threading.Thread(target=lambda: output.append(runCommand('sort')), daemon=True)

	thread.start()
	thread.join(10)

	assert not thread.is_alive()
	assert output == ['']


def test_getCpu():
	cpuName = getCpu()

	assert len(cpuName) > 0
	assert re.search(r'[a-zA-Z0-9]+', cpuName)
	assert cpuName != 'Unknown'
	# The model of the processor, not the architecture the process was built for.
	# Both packages answer with the same string, and an architecture name here means
	# the lookup fell through to a last resort.
	assert not re.fullmatch(
		r'(arm|arm64|aarch64|x86|x86_64|amd64|i[3-6]86)', cpuName, re.IGNORECASE
	)


def test_getHostname():
	hostname = getHostname()

	assert len(hostname) > 0
	assert re.search(r'[a-zA-Z0-9]+', hostname)
	assert hostname != 'Unknown'
	# A name may hold spaces of its own, but never around itself and never a line
	# ending left over from whatever was asked for it.
	assert hostname == hostname.strip()


def test_getMachineId():
	mId = getMachineId()

	if sys.platform in ('win32', 'darwin') or sys.platform.startswith('freebsd'):
		regex = r'^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}'
	else:
		regex = r'^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}'

	assert re.match(regex, mId)
	# The same machine answers with the same id, whichever call asks.
	assert getMachineId() == mId


def test_getRamSize():
	ramSize = getRamSize()

	assert isinstance(ramSize, str)
	assert len(ramSize) > 0
	assert re.match(r'^\d+\s[A-Z]+$', ramSize)


def test_getSid():
	if sys.platform not in ('win32', 'darwin'):
		with pytest.raises(RuntimeError, match='Not supported on this operating system'):
			getSid()

		return

	sidResult = getSid()

	assert re.match(
		r'^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}-\d{8,10}-[1-9]\d{1,9}',
		sidResult,
	)


def test_getUptime():
	assert isinstance(getUptime(), (int, float))
	assert isinstance(getUptime({'format': True}), str)
	assert '.' not in str(getUptime({'floor': True}))
	assert getUptime() >= 0


def test_getUptime_counts_from_the_process_start():
	# `qsu` is imported after the wait, so a count that starts at import time reads
	# as zero here. JavaScript has `process.uptime()` and needs no equivalent test;
	# this one guards the platform calls that stand in for it.
	code = 'import time\ntime.sleep(0.5)\nfrom qsu.os import getUptime\nprint(getUptime())'
	result = subprocess.run([sys.executable, '-c', code], capture_output=True, text=True)

	assert result.returncode == 0, result.stderr
	assert float(result.stdout) >= 0.5


def test_getFreeRamSize():
	size = getFreeRamSize()

	assert re.match(r'^\d+\s[A-Z]+$', size)
	# A running machine always has some memory free, so a zero here is a read that
	# failed rather than a machine that is full.
	assert size != '0 B'


def test_getUsedRamSize():
	assert re.match(r'^\d+\s[A-Z]+$', getUsedRamSize())


def test_getRamUsage():
	usage = getRamUsage()

	assert isinstance(usage, (int, float))
	assert 0 <= usage <= 100
	assert isinstance(getRamUsage(0), int)
	# The argument is how many decimal places are kept.
	assert len(str(getRamUsage(3)).partition('.')[2]) <= 3


def test_getDiskSize():
	size = getDiskSize()

	assert re.match(r'^\d+\s[A-Z]+$', size)
	assert size != '0 B'
	# The current working directory is the default, named or not.
	assert getDiskSize(os.getcwd()) == size


def test_getFreeDiskSize():
	assert re.match(r'^\d+\s[A-Z]+$', getFreeDiskSize())


def test_getDiskUsage():
	usage = getDiskUsage()

	assert isinstance(usage, (int, float))
	assert 0 <= usage <= 100
	assert isinstance(getDiskUsage(None, 0), int)


def test_disk_functions_report_a_path_that_is_not_there():
	missing = os.path.join(tempfile.gettempdir(), 'qsu-no-such-directory-8f21')

	for call in (getDiskSize, getFreeDiskSize, getDiskUsage):
		with pytest.raises(OSError):
			call(missing)


def test_getSystemUptime():
	seconds = getSystemUptime()

	assert isinstance(seconds, (int, float))
	assert seconds > 0
	# The machine has been running at least as long as this process has.
	assert seconds >= getUptime()
	assert isinstance(getSystemUptime({'format': True}), str)
	assert '.' not in str(getSystemUptime({'floor': True}))


def test_getBootTime():
	bootTime = getBootTime()

	assert isinstance(bootTime, datetime)
	assert bootTime < datetime.now()
	# The boot time and the uptime are two readings of the same thing, so they agree
	# to within the moment it takes to read them twice.
	fromUptime = datetime.now() - timedelta(seconds=getSystemUptime())

	assert abs((bootTime - fromUptime).total_seconds()) < 2


def test_getUsername():
	username = getUsername()

	assert len(username) > 0
	assert username != 'Unknown'
	assert username == username.strip()


def test_getHomeDir():
	home = getHomeDir()

	assert len(home) > 0
	assert os.path.isdir(home)


def test_getTempDir():
	temp = getTempDir()

	assert len(temp) > 0
	assert os.path.isdir(temp)


def test_getShell():
	shell = getShell()

	assert len(shell) > 0

	# A path to a program rather than a bare name, on either kind of system.
	if sys.platform == 'win32':
		assert re.search(r'\\|\.exe$', shell, re.IGNORECASE)
	else:
		assert shell.startswith('/')


def test_getPlatform():
	name = getPlatform()

	assert name in _PLATFORM_NAMES
	# Every system these tests run on is one the table covers, so `unknown` here
	# means a name fell out of it.
	assert name != 'unknown'
	assert (name == 'windows') == (sys.platform == 'win32')
	assert (name == 'macos') == (sys.platform == 'darwin')
	assert (name == 'linux') == sys.platform.startswith('linux')


def test_getArch():
	assert getArch() in _ARCHITECTURES


def test_getCpuCount():
	count = getCpuCount()

	assert isinstance(count, int)
	assert count >= 1
	# The same machine answers with the same number, whichever call asks.
	assert getCpuCount() == count


def test_getKernelVersion():
	version = getKernelVersion()

	assert len(version) > 0
	assert version != 'Unknown'
	assert re.search(r'\d', version)


def test_getEndianness():
	assert getEndianness() in ('BE', 'LE')
