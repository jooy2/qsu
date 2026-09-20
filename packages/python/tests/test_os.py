import re
import sys
import threading

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


def test_getHostname():
	hostname = getHostname()

	assert len(hostname) > 0
	assert re.search(r'[a-zA-Z0-9]+', hostname)
	assert hostname != 'Unknown'


def test_getMachineId():
	mId = getMachineId()

	if sys.platform in ('win32', 'darwin') or sys.platform.startswith('freebsd'):
		regex = r'^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}'
	else:
		regex = r'^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}'

	assert re.match(regex, mId)


def test_getRamSize():
	ramSize = getRamSize()

	assert isinstance(ramSize, str)
	assert len(ramSize) > 0
	assert re.match(r'^\d+\s[A-Z]+$', ramSize)


def test_getSid():
	if sys.platform not in ('win32', 'darwin'):
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
