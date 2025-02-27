import { LicenseOption } from '../_types/global';

export function generateLicense(options: LicenseOption): string {
	const br = options.htmlBr ? '<br/>' : '\n';
	const yearString = `${options.yearStart}${options.yearEnd ? `-${options.yearEnd}` : ''}`;
	const authorString = `${options.author}${options.email ? ` <${options.email}>` : ''}`;

	switch (options.type.replace(/\.-_,\s/g, '').toLowerCase()) {
		case 'apache20':
			return `Copyright ${yearString} ${authorString}${br}${br}Licensed under the Apache License, Version 2.0 (the "License");${br}you may not use this file except in compliance with the License.${br}You may obtain a copy of the License at${br}${br}    http://www.apache.org/licenses/LICENSE-2.0${br}${br}Unless required by applicable law or agreed to in writing, software${br}distributed under the License is distributed on an "AS IS" BASIS,${br}WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.${br}See the License for the specific language governing permissions and${br}limitations under the License.`;
		case 'mit':
		default:
			return `Copyright (c) ${yearString} ${authorString}${br}${br}Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:${br}${br}The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.${br}${br}THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
	}
}
