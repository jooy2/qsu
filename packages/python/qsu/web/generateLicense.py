import datetime
import re
from typing import Optional, Union


def _gnuNotice(name: str) -> str:
	# The GNU licenses are too long to generate, so the notice each of them asks to be put at
	# the top of every source file is returned instead. The three notices differ only in the
	# name.
	return (
		'This program is free software: you can redistribute it and/or modify\n'
		f'it under the terms of the GNU {name} as published by\n'
		'the Free Software Foundation, either version 3 of the License, or\n'
		'(at your option) any later version.\n\n'
		'This program is distributed in the hope that it will be useful,\n'
		'but WITHOUT ANY WARRANTY; without even the implied warranty of\n'
		'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n'
		f'GNU {name} for more details.\n\n'
		f'You should have received a copy of the GNU {name}\n'
		'along with this program.  If not, see <https://www.gnu.org/licenses/>.'
	)


_BSD_CONDITIONS = (
	'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n'
	'1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n\n'
	'2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.'
)
_BSD_DISCLAIMER = 'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.'

# The copyright line's opening words and the text after it, for each type. The short
# permissive licenses are returned whole. Apache 2.0, MPL 2.0 and the GNU licenses are
# returned as the notice their own text asks to be attached to each file.
_LICENSES = {
	'mit': (
		'Copyright (c)',
		'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\n'
		'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\n'
		'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
	),
	'isc': (
		'Copyright (c)',
		'Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\n'
		'THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.',
	),
	'apache20': (
		'Copyright',
		'Licensed under the Apache License, Version 2.0 (the "License");\n'
		'you may not use this file except in compliance with the License.\n'
		'You may obtain a copy of the License at\n\n'
		'    http://www.apache.org/licenses/LICENSE-2.0\n\n'
		'Unless required by applicable law or agreed to in writing, software\n'
		'distributed under the License is distributed on an "AS IS" BASIS,\n'
		'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n'
		'See the License for the specific language governing permissions and\n'
		'limitations under the License.',
	),
	'bsd2': ('Copyright', f'{_BSD_CONDITIONS}\n\n{_BSD_DISCLAIMER}'),
	'bsd3': (
		'Copyright',
		f'{_BSD_CONDITIONS}\n\n'
		'3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.\n\n'
		f'{_BSD_DISCLAIMER}',
	),
	'mpl20': (
		'Copyright (c)',
		'This Source Code Form is subject to the terms of the Mozilla Public\n'
		'License, v. 2.0. If a copy of the MPL was not distributed with this\n'
		'file, You can obtain one at https://mozilla.org/MPL/2.0/.',
	),
	'gpl3': ('Copyright (C)', _gnuNotice('General Public License')),
	'lgpl3': ('Copyright (C)', _gnuNotice('Lesser General Public License')),
	'agpl3': ('Copyright (C)', _gnuNotice('Affero General Public License')),
}

# An SPDX identifier loses its punctuation the same way, so `BSD-3-Clause` and
# `GPL-3.0-or-later` arrive as `bsd3clause` and `gpl30orlater`.
_SPDX_ALIASES = {
	'bsd2clause': 'bsd2',
	'bsd3clause': 'bsd3',
	'gpl30orlater': 'gpl3',
	'lgpl30orlater': 'lgpl3',
	'agpl30orlater': 'agpl3',
}

_LICENSE_TYPE_PUNCTUATION = re.compile(r'[.\-_,\s]')
_HTML_TEXT_SPECIAL_CHARACTERS = re.compile(r'[&<>]')
_HTML_TEXT_ESCAPES = {'&': '&amp;', '<': '&lt;', '>': '&gt;'}


def generateLicense(
	type=None,
	author: Optional[str] = None,
	yearStart: Optional[Union[str, int]] = None,
	email: Optional[str] = None,
	yearEnd: Optional[Union[str, int]] = None,
	htmlBr: bool = False,
) -> str:
	# Accept an options dict as the first positional argument as well as keyword
	# arguments, like the rest of the package.
	if isinstance(type, dict):
		options = type
		type = options.get('type')
		author = options.get('author', author)
		yearStart = options.get('yearStart', yearStart)
		email = options.get('email', email)
		yearEnd = options.get('yearEnd', yearEnd)
		htmlBr = options.get('htmlBr', htmlBr)

	key = _LICENSE_TYPE_PUNCTUATION.sub('', str(type or '')).lower()
	license = _LICENSES.get(_SPDX_ALIASES.get(key, key))

	# Falling back to MIT turned a typo into a different license without a word.
	if license is None:
		raise ValueError(f'Unknown license type: {type}')

	if yearStart is None:
		yearStart = datetime.date.today().year

	if yearEnd and str(yearEnd) != str(yearStart):
		yearString = f'{yearStart}-{yearEnd}'
	else:
		yearString = f'{yearStart}'

	authorString = f'{author}{f" <{email}>" if email else ""}'
	text = f'{license[0]} {yearString} {authorString}\n\n{license[1]}'

	if not htmlBr:
		return text

	# The text is going into HTML, where `<user@example.com>` would be read as a tag.
	return _HTML_TEXT_SPECIAL_CHARACTERS.sub(lambda m: _HTML_TEXT_ESCAPES[m.group(0)], text).replace(
		'\n', '<br/>'
	)
