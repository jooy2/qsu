import type { LicenseOption, LicenseType } from '../_types/global.js';

interface LicenseTemplate {
	copyright: string;
	text: string;
}

// The GNU licenses are too long to generate, so the notice each of them asks to be put at the
// top of every source file is returned instead. The three notices differ only in the name.
const gnuNotice = (name: string): string =>
	`This program is free software: you can redistribute it and/or modify\nit under the terms of the GNU ${name} as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU ${name} for more details.\n\nYou should have received a copy of the GNU ${name}\nalong with this program.  If not, see <https://www.gnu.org/licenses/>.`;

const BSD_CONDITIONS =
	'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n\n2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.';
const BSD_DISCLAIMER =
	'THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.';

// The short permissive licenses are returned whole. Apache 2.0, MPL 2.0 and the GNU licenses
// are returned as the notice their own text asks to be attached to each file.
const LICENSES = new Map<string, LicenseTemplate>([
	[
		'mit',
		{
			copyright: 'Copyright (c)',
			text: 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
		}
	],
	[
		'isc',
		{
			copyright: 'Copyright (c)',
			text: 'Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.'
		}
	],
	[
		'apache20',
		{
			copyright: 'Copyright',
			text: 'Licensed under the Apache License, Version 2.0 (the "License");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an "AS IS" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.'
		}
	],
	['bsd2', { copyright: 'Copyright', text: `${BSD_CONDITIONS}\n\n${BSD_DISCLAIMER}` }],
	[
		'bsd3',
		{
			copyright: 'Copyright',
			text: `${BSD_CONDITIONS}\n\n3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.\n\n${BSD_DISCLAIMER}`
		}
	],
	[
		'mpl20',
		{
			copyright: 'Copyright (c)',
			text: 'This Source Code Form is subject to the terms of the Mozilla Public\nLicense, v. 2.0. If a copy of the MPL was not distributed with this\nfile, You can obtain one at https://mozilla.org/MPL/2.0/.'
		}
	],
	['gpl3', { copyright: 'Copyright (C)', text: gnuNotice('General Public License') }],
	['lgpl3', { copyright: 'Copyright (C)', text: gnuNotice('Lesser General Public License') }],
	['agpl3', { copyright: 'Copyright (C)', text: gnuNotice('Affero General Public License') }]
]);

// An SPDX identifier loses its punctuation the same way, so `BSD-3-Clause` and
// `GPL-3.0-or-later` arrive here as `bsd3clause` and `gpl30orlater`.
const SPDX_ALIASES = new Map<string, LicenseType>([
	['bsd2clause', 'bsd2'],
	['bsd3clause', 'bsd3'],
	['gpl30orlater', 'gpl3'],
	['lgpl30orlater', 'lgpl3'],
	['agpl30orlater', 'agpl3']
]);

const HTML_SPECIAL_CHARACTERS = /[&<>]/g;
const HTML_ESCAPES: { [key: string]: string } = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

export function generateLicense(options: LicenseOption): string {
	const key = String(options.type ?? '')
		.replace(/[.\-_,\s]/g, '')
		.toLowerCase();
	const license = LICENSES.get(SPDX_ALIASES.get(key) ?? key);

	// Falling back to MIT turned a typo into a different license without a word.
	if (!license) {
		throw new RangeError(`Unknown license type: ${options.type}`);
	}

	const yearStart = options.yearStart ?? new Date().getFullYear();
	const yearString =
		options.yearEnd && String(options.yearEnd) !== String(yearStart)
			? `${yearStart}-${options.yearEnd}`
			: `${yearStart}`;
	const authorString = `${options.author}${options.email ? ` <${options.email}>` : ''}`;
	const text = `${license.copyright} ${yearString} ${authorString}\n\n${license.text}`;

	if (!options.htmlBr) {
		return text;
	}

	// The text is going into HTML, where `<user@example.com>` would be read as a tag.
	return text
		.replace(HTML_SPECIAL_CHARACTERS, (char) => HTML_ESCAPES[char])
		.replace(/\n/g, '<br/>');
}
