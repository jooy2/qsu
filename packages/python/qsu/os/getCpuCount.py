import os


def getCpuCount() -> int:
	# The cores this process may actually use, which a CPU affinity mask narrows.
	# Counting every core on the machine would ignore that.
	if hasattr(os, 'sched_getaffinity'):
		return len(os.sched_getaffinity(0)) or 1

	return os.cpu_count() or 1
