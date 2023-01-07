// import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

// const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

// TODO: set-up releases structure
// const url = `https://raw.githubusercontent.com/vheemstra/apngasm-bin/v${pkg.version}/vendor/`;
const url = 'https://raw.githubusercontent.com/vheemstra/apngasm-bin/master/vendor/';

// TODO: auto get latest apngasm.exe from:
// https://sourceforge.net/projects/apngasm/files/${pkg.lib_version}/
// https://downloads.sourceforge.net/project/apngasm/${pkg.lib_version}/apngasm-${pkg.lib_version}-bin-linux.zip
// https://downloads.sourceforge.net/project/apngasm/${pkg.lib_version}/apngasm-${pkg.lib_version}-bin-macos.zip
// https://downloads.sourceforge.net/project/apngasm/${pkg.lib_version}/apngasm-${pkg.lib_version}-bin-win32.zip
// https://downloads.sourceforge.net/project/apngasm/${pkg.lib_version}/apngasm-${pkg.lib_version}-bin-win64.zip

const binWrapper = new BinWrapper()
	.src(`${url}macos/apngasm`, 'darwin')
	.src(`${url}linux/x86_64/apngasm`, 'linux', 'x86')
	.src(`${url}linux/x86_64/apngasm`, 'linux', 'x64')
	.src(`${url}win/x86/apngasm.exe`, 'win32', 'x86')
	.src(`${url}win/x64/apngasm64.exe`, 'win32', 'x64')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(
		process.platform === 'win32'
			? (process.arch === 'x64'
				? 'apngasm64.exe'
				: 'apngasm.exe')
			: 'apngasm'
	);

export default binWrapper;
