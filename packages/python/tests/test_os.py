import re
import subprocess
import sys
import threading

import pytest

from qsu.os import (
	getCpu,
	getHostname,
	getMachineId,
	getRamSize,
	getSid,
	getUptime,
	runCommand,
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
