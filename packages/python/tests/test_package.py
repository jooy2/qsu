import ast
import importlib
import pathlib
import subprocess
import sys

import qsu

CATEGORIES = (
	'array',
	'crypto',
	'date',
	'file',
	'format',
	'math',
	'misc',
	'net',
	'object',
	'os',
	'string',
	'verify',
	'web',
)


def test_every_exported_name_is_a_callable():
	assert qsu.__all__
	assert len(set(qsu.__all__)) == len(qsu.__all__)

	for name in qsu.__all__:
		assert callable(getattr(qsu, name)), name


def test_a_name_is_one_object_wherever_it_is_read_from():
	for category in CATEGORIES:
		module = importlib.import_module(f'qsu.{category}')

		for name in module.__all__:
			assert getattr(qsu, name) is getattr(module, name), name


def test_every_category_export_matches_the_top_level():
	exported = []

	for category in CATEGORIES:
		exported.extend(importlib.import_module(f'qsu.{category}').__all__)

	assert exported == qsu.__all__


def test_a_public_name_stays_the_function_after_a_sibling_imports_its_module():
	# One function per file means a function and its module share a name, and importing
	# the module binds that name to the module on the category package.
	import qsu.string.strToKebabCase  # noqa: F401  (does `from .words import words`)

	from qsu.string import words

	assert callable(words)
	assert words('helloWorld here') == ['hello', 'World', 'here']
	assert qsu.string.words is qsu.words


def test_an_unknown_name_raises_attribute_error():
	for holder in (qsu, qsu.array):
		try:
			getattr(holder, 'thisFunctionDoesNotExist')
		except AttributeError:
			continue

		raise AssertionError(f'{holder.__name__} answered for an unknown name')


def test_dir_lists_the_public_names():
	assert set(qsu.__all__) <= set(dir(qsu))
	assert set(CATEGORIES) <= set(dir(qsu))
	assert dir(qsu.array) == sorted(qsu.array.__all__)


def test_importing_the_package_does_not_load_the_functions():
	# The whole point of the on-demand import: `import qsu` on its own must not reach
	# `cryptography`, `subprocess` or `urllib`.
	source = (
		'import sys\n'
		'import qsu\n'
		"loaded = [m for m in sys.modules if m.startswith('qsu.') and m != 'qsu._lazy']\n"
		"heavy = [m for m in sys.modules if m.split('.')[0] in ('cryptography', 'subprocess', 'urllib')]\n"
		'print(len(loaded), len(heavy))\n'
	)
	result = subprocess.run([sys.executable, '-c', source], capture_output=True, text=True)

	assert result.returncode == 0, result.stderr

	functions, heavy = (int(value) for value in result.stdout.split())

	assert functions == 0
	assert heavy == 0


def _type_checking_imports(source: str) -> list:
	"""(Private) The names re-exported from an `if TYPE_CHECKING:` block."""
	names = []

	for node in ast.parse(source).body:
		if not isinstance(node, ast.If) or getattr(node.test, 'id', None) != 'TYPE_CHECKING':
			continue

		for statement in node.body:
			if isinstance(statement, ast.ImportFrom):
				names.extend(alias.asname or alias.name for alias in statement.names)

	return names


def test_the_package_ships_its_type_information():
	# Without this marker a type checker ignores the annotations entirely (PEP 561).
	assert (pathlib.Path(qsu.__file__).parent / 'py.typed').is_file()


def test_every_category_re_exports_all_of_its_names_for_type_checkers():
	# The functions are imported on demand at runtime, so a type checker can only
	# follow a name if the category spells the import out under `if TYPE_CHECKING`.
	# A name added to `__all__` and forgotten there resolves to the module instead.
	for category in CATEGORIES:
		module = importlib.import_module(f'qsu.{category}')
		source = pathlib.Path(module.__file__).read_text()

		assert _type_checking_imports(source) == list(module.__all__), category
